'use strict';
importScripts('./build/sw-toolbox.js');

self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(precache());
});

function precache() {
  self.toolbox.options.cache = {
    name: 'ionic-cache'
  };

  // pre-cache our key assets
  self.toolbox.precache(
    [
      './build/main.js',
      './build/vendor.js',
      './build/main.css',
      './build/polyfills.js',
      'index.html',
      'manifest.json'
    ]
  );

  // dynamically cache any other local assets
  self.toolbox.router.any('/*', self.toolbox.fastest);

  // for any other requests go to the network, cache,
  // and then only use that cached resource if your user goes offline
  self.toolbox.router.default = self.toolbox.networkFirst;
}

//Cria um proxy pra lidar com as requisições ao site da EMPRO
/* self.onfetch = function (event) {
  const servidor = 'http://localhost:8080/';
  const endpoints = {
    www: servidor + 'riopreto',
    cidadao: servidor + 'cidadaoriopreto'
  };
  const padrao = /.*(www|cidadao).riopreto.sp.gov.br/i;
  if (padrao.test(event.request.url)) {
    event.respondWith(async function () {
      const corpo = await event.request.blob();
      const init = {
        method: event.request.method,
        headers: event.request.headers,
        body: corpo
      };
      const antigaUrl = event.request.url;
      const novaUrl = antigaUrl.replace(padrao, antigaUrl.includes('www.riopreto') ? endpoints.www : endpoints.cidadao);
      return fetch(novaUrl, init);
    }());
  } else {
    event.respondWith(fetch(event.request));
  }
}; */