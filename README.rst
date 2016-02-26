========================================
Openslides Presentation View ('Clicker')
========================================

Overview
========
This plugin adds a new page to OpenSlides that can be used as a 'presenter'
view, adding control that users are likely used to from other presentation
software such as Powerpoint to OpenSlides. This page is a fullscreen page
showing a preview of the currently shown slide, and listens to mouse and
keyboard events (arrow keys), to change the currently shown slide.

The main use for this plugin is to provide a simple overview for presenters
to use OpenSlides, either with a mouse, keyboard or presentation remote
(which are sometimes called a 'clicker', hence the name!).

Requirements
============
 - OpenSlides 1.7.x

Install
=======
I. Installation on Windows (with OpenSlides portable version)
-------------------------------------------------------------

1. Get the latest Clicker plugin release from:

   https://github.com/lesteenman/openslides-clicker

2. Move the plugin directory (openslides_clicker, instead of the main
   folder/repository) to:

    '<path-to-openslides-portable>/openslides/plugins/'

3. Start openslides.exe.

II. Installation on GNU/Linux and MacOSX
----------------------------------------
1. Setup and activate a virtual environment::

    $ virtualenv .virtualenv

    $ source .virtualenv/bin/activate

2. Install OpenSlides and VoteCollector plugin from the Python Package Index (PyPI)::

    $ pip install openslides git+https://github.com/lesteenman/openslides-clicker

    OpenSlides and all required python packages will be installed.

3. Start OpenSlides::

    $ openslides

Using the plugin
================

After the plugin is installed, simply open the 'clicker' page (PDF Remote)
through the menu. Note that this only does something useful (i.e. allow controlling
the projector) if a presentable and controllable media is currently shown.

License and Author
==================
This plugin is Free/Libre Open Source Software and distributed under the
MIT License, see LICENSE file. The plugin was made by Erik Steenman
(https://github.com/lesteenman).

Changelog
=========
Version 1.0.0 (2016-02-26)
--------------------------
* First release of this plugin for OpenSlides 1.7.x.
