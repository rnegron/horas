/* eslint-disable no-undef */
/* Imports for webpack build */

// Images
require.context("./img/", true, /\.(jpe?g|png|gif|svg)$/i);

// Styles
import "./css/app.styl";

// JavaScript
import "./app";
