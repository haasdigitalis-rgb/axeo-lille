/**
 * cookies.js — AXEO Lille
 * Google Consent Mode v2 · Refus par défaut · Compatible Google Ads
 * Version : 1.0 — avril 2026
 */

(function() {
  'use strict';

  // ── Consent Mode v2 : deny par défaut ──────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  gtag('consent', 'default', {
    'ad_storage':              'denied',
    'ad_user_data':            'denied',
    'ad_personalization':      'denied',
    'analytics_storage':       'denied',
    'functionality_storage':   'denied',
    'personalization_storage': 'denied',
    'security_storage':        'granted',
    'wait_for_update':         500
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + d.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
  }

  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
  }

  // ── Accepter tous les cookies ─────────────────────────────────────────────
  window.acceptCookies = function() {
    gtag('consent', 'update', {
      'ad_storage':              'granted',
      'ad_user_data':            'granted',
      'ad_personalization':      'granted',
      'analytics_storage':       'granted',
      'functionality_storage':   'granted',
      'personalization_storage': 'granted'
    });
    setCookie('cookie_consent', 'accepted', 180);
    localStorage.setItem('cookie_consent', 'accepted');
    hideBanner();
  };

  // ── Refuser tous les cookies ──────────────────────────────────────────────
  window.refuseCookies = function() {
    gtag('consent', 'update', {
      'ad_storage':              'denied',
      'ad_user_data':            'denied',
      'ad_personalization':      'denied',
      'analytics_storage':       'denied',
      'functionality_storage':   'denied',
      'personalization_storage': 'denied'
    });
    setCookie('cookie_consent', 'refused', 180);
    localStorage.setItem('cookie_consent', 'refused');
    hideBanner();
  };

  // ── Restaurer le consentement au chargement ───────────────────────────────
  var savedConsent = getCookie('cookie_consent') || localStorage.getItem('cookie_consent');

  if (savedConsent === 'accepted') {
    gtag('consent', 'update', {
      'ad_storage':              'granted',
      'ad_user_data':            'granted',
      'ad_personalization':      'granted',
      'analytics_storage':       'granted',
      'functionality_storage':   'granted',
      'personalization_storage': 'granted'
    });
  }

  // Si aucun choix → la bannière est affichée par index.html au DOMContentLoaded

})();
