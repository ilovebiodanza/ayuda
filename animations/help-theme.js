/* Las animaciones viven fuera de la aplicación, pero pueden abrirse desde
   ella con ?theme=<tema>. Este puente carga el mismo tema de Bootswatch de la
   app y publica variables semánticas para que la ayuda no repita una paleta
   fija. Sin parámetro usa Cerulean, el tema histórico de la aplicación. */
(function () {
  'use strict';

  const themes = new Set([
    'cerulean', 'ciborg', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'litera',
    'lumen', 'lux', 'materia', 'minty', 'morph', 'pulse', 'quartz',
    'sandstone', 'simplex', 'sketchy', 'slate', 'solar', 'spacelab',
    'superhero', 'united', 'yeti',
  ]);
  const params = new URLSearchParams(window.location.search);
  const requested = String(params.get('theme') || '').toLowerCase();
  const aliases = { ciborg: 'cyborg' };
  const theme = themes.has(requested) ? aliases[requested] || requested : 'cerulean';
  const base = String(
    window.HELP_THEME_BASE ||
      'https://cdn.jsdelivr.net/npm/bootswatch@4.6.2/dist',
  ).replace(/\/$/, '');

  const parseColor = value => {
    const input = String(value || '').trim();
    const hex = input.match(/^#([0-9a-f]{3,8})$/i);
    if (hex) {
      const digits = hex[1];
      const normalized =
        digits.length === 3 || digits.length === 4
          ? digits.split('').map(character => character + character).join('')
          : digits;
      return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16),
        a: normalized.length >= 8 ? parseInt(normalized.slice(6, 8), 16) / 255 : 1,
      };
    }
    const match = input.match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i,
    );
    if (!match) return null;
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: match[4] === undefined ? 1 : Number(match[4]),
    };
  };
  const cssColor = color =>
    color
      ? `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a})`
      : '';
  const mix = (from, to, weight) => ({
    r: from.r + (to.r - from.r) * weight,
    g: from.g + (to.g - from.g) * weight,
    b: from.b + (to.b - from.b) * weight,
    a: 1,
  });
  const luminance = color => {
    const channel = value => {
      const normalized = value / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
  };

  const themeLink = document.createElement('link');
  themeLink.rel = 'stylesheet';
  themeLink.href = `${base}/${theme}/bootstrap.min.css`;
  themeLink.dataset.helpTheme = theme;
  document.head.insertBefore(themeLink, document.currentScript.nextSibling);

  // Mantiene el tema al pasar de la galería a una animación o volver a ella.
  if (themes.has(requested)) {
    const preserveTheme = () => {
      document.querySelectorAll('a[href$=".html"]').forEach(link => {
        if (!link.href || !link.href.startsWith(window.location.origin)) return;
        const url = new URL(link.href);
        url.searchParams.set('theme', theme);
        link.href = url.pathname + url.search + url.hash;
      });
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', preserveTheme);
    } else {
      preserveTheme();
    }
  }

  const applyTheme = () => {
    if (!document.body) return;
    const root = document.documentElement;
    const rootStyle = getComputedStyle(root);
    const bodyStyle = getComputedStyle(document.body);
    const probe = document.createElement('div');
    probe.className = 'card';
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:1px;height:1px;';
    document.body.appendChild(probe);
    const textProbe = document.createElement('span');
    textProbe.className = 'text-body';
    textProbe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;';
    document.body.appendChild(textProbe);
    const mutedProbe = document.createElement('span');
    mutedProbe.className = 'text-muted';
    mutedProbe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;';
    document.body.appendChild(mutedProbe);
    const cardStyle = getComputedStyle(probe);
    const bodyBg = parseColor(getComputedStyle(document.documentElement).backgroundColor);
    const cardBg = parseColor(cardStyle.backgroundColor);
    const surface = cardBg && cardBg.a > 0 ? cardBg : bodyBg && bodyBg.a > 0 ? bodyBg : { r: 255, g: 255, b: 255, a: 1 };
    const text =
      parseColor(getComputedStyle(textProbe).color) ||
      parseColor(cardStyle.color) ||
      parseColor(bodyStyle.color) ||
      { r: 33, g: 37, b: 41, a: 1 };
    const primary =
      parseColor(rootStyle.getPropertyValue('--primary').trim()) ||
      parseColor(getComputedStyle(document.querySelector('.btn-primary, .bg-primary, .text-primary') || document.body).backgroundColor) ||
      { r: 47, g: 164, b: 231, a: 1 };
    const danger = parseColor(rootStyle.getPropertyValue('--danger').trim()) || { r: 220, g: 53, b: 69, a: 1 };
    const warning = parseColor(rootStyle.getPropertyValue('--warning').trim()) || { r: 255, g: 193, b: 7, a: 1 };
    const success = parseColor(rootStyle.getPropertyValue('--success').trim()) || { r: 40, g: 167, b: 69, a: 1 };
    const info = parseColor(rootStyle.getPropertyValue('--info').trim()) || { r: 23, g: 162, b: 184, a: 1 };
    const white = parseColor(rootStyle.getPropertyValue('--white').trim()) || { r: 255, g: 255, b: 255, a: 1 };
    const dark = parseColor(rootStyle.getPropertyValue('--dark').trim()) || text;
    const isDark = luminance(surface) < 0.45;
    const border = parseColor(cardStyle.borderColor) && parseColor(cardStyle.borderColor).a > 0
      ? parseColor(cardStyle.borderColor)
      : mix(surface, text, 0.16);
    const muted = parseColor(getComputedStyle(mutedProbe).color) || mix(text, surface, 0.42);
    const onPrimary = luminance(primary) > 0.55 ? dark : white;

    root.style.setProperty('--demo-primary', cssColor(primary));
    root.style.setProperty('--demo-primary-strong', cssColor(mix(primary, isDark ? white : dark, isDark ? 0.18 : 0.2)));
    root.style.setProperty('--demo-primary-soft', `rgba(${Math.round(primary.r)}, ${Math.round(primary.g)}, ${Math.round(primary.b)}, 0.14)`);
    root.style.setProperty('--demo-on-primary', cssColor(onPrimary));
    root.style.setProperty('--demo-surface', cssColor(surface));
    root.style.setProperty('--demo-surface-soft', cssColor(mix(surface, text, 0.05)));
    root.style.setProperty(
      '--demo-page-bg',
      cssColor(bodyBg && bodyBg.a > 0 ? bodyBg : mix(surface, text, 0.05)),
    );
    root.style.setProperty('--demo-text', cssColor(text));
    root.style.setProperty('--demo-dark', cssColor(text));
    root.style.setProperty('--demo-light', cssColor(surface));
    root.style.setProperty('--demo-muted', cssColor(muted));
    root.style.setProperty('--demo-line', cssColor(border));
    root.style.setProperty('--demo-line-strong', cssColor(mix(border, text, 0.25)));
    root.style.setProperty('--demo-danger', cssColor(danger));
    root.style.setProperty('--demo-danger-soft', cssColor(mix(surface, danger, 0.12)));
    root.style.setProperty('--demo-warning', cssColor(warning));
    root.style.setProperty('--demo-warning-soft', cssColor(mix(surface, warning, 0.14)));
    root.style.setProperty('--demo-success', cssColor(success));
    root.style.setProperty('--demo-success-soft', cssColor(mix(surface, success, 0.16)));
    root.style.setProperty('--demo-info', cssColor(info));
    root.style.setProperty('--demo-info-soft', cssColor(mix(surface, info, 0.12)));
    root.style.setProperty('--demo-shadow', isDark ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--demo-shadow-strong', isDark ? 'rgba(0, 0, 0, 0.52)' : 'rgba(0, 0, 0, 0.18)');
    root.style.setProperty('--demo-focus-ring', `rgba(${Math.round(primary.r)}, ${Math.round(primary.g)}, ${Math.round(primary.b)}, 0.2)`);
    probe.remove();
    textProbe.remove();
    mutedProbe.remove();
  };

  themeLink.addEventListener('load', applyTheme);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  } else {
    applyTheme();
  }
  window.addEventListener('load', applyTheme);
})();
