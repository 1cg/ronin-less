Ronin-Less
=============

Ronin-Less is a simple plugin for Ronin that will dynamically compile your LessCSS files
into CSS, when requested via HTTP

Installation
------------

Installing Ronin-Less is trivial.  In your `RoninConfig` setup, just add this:

    Filters.add( new LessFilter(){ :Cache = m != DEVELOPMENT } )

This will set the filter up to cache the generated CSS unless the server is in development mode,
in which case it will recompile dynamically on every request.

Usage
-----

Once you've installed the filter, you can put LessCSS files in your `html/public' folder, and,
when you request them, they will be automatically compiled to Javascript.

So `http://localhost:8080/public/scripts/example.less` with this content:

    @color: #4D926F;

    h2 {
      color: @color;
    }

will return this CSS:

    h2 {
      color: #4D926F;
    }

If you wish to view the raw version of the LessCSS, you can append '?raw' to the URL.