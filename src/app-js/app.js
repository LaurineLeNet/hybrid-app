import * as angular from "angular";
import "@uirouter/angularjs";
import "@uirouter/angular-hybrid";

const app = angular.module("loloApp", ["ui.router", "ui.router.upgrade"]);

app.config([
  "$stateProvider",
  "$urlRouterProvider",
  "$locationProvider",
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/legacy");

    // Une route 100% AngularJS
    $stateProvider.state("legacy", {
      url: "/legacy",
      template: `
        <div style="background: #ffebee; padding: 20px;">
            <h1>Côté AngularJS</h1>
            <a uiSref="MG.sandbox">Aller vers Angular 15 (MG)</a>
        </div>
      `,
    });
  },
]);

export default app; // Pour l'importer dans le main.ts
