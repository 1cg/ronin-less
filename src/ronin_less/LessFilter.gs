package ronin_less

uses javax.servlet. *;
uses javax.servlet.http.HttpServletRequest;
uses java.io.IOException;
uses java.io.InputStream;
uses java.util.Scanner;
uses java.io.File
uses java.net.URL
uses java.util.concurrent.atomic.AtomicInteger
uses java.util.concurrent.ConcurrentHashMap

class LessFilter implements Filter {

  var _cache = new ConcurrentHashMap<String, String>()
  var _shouldCache : Boolean as Cache
  var _compileCount : AtomicInteger as Compilations = new AtomicInteger()

  override function init(cfg: FilterConfig) {
    // nothing
  }

  override function doFilter(servletRequest: ServletRequest, servletResponse: ServletResponse, filterChain: FilterChain) {
    var req = servletRequest as HttpServletRequest
    var contextPath = req.PathInfo
    if (contextPath?.endsWith(".less")) {
      var lessSource = getLessSource(req)
      if(req.getParameter("raw") != null) {
        servletResponse.getOutputStream().write(lessSource.Bytes)
      } else {
        var result : String
        if(_shouldCache) {
          result = _cache[contextPath]
          if(result == null){
            using(this as IMonitorLock) {
              result = _cache[contextPath]
              if(result == null) {
                result = compile(req, contextPath)
                _cache[contextPath] = result
              }
            }
          }
        } else {
          result = compile(req, contextPath)
        }
        servletResponse.getOutputStream().write(result.Bytes)
      }
    } else {
      filterChain.doFilter(req, servletResponse)
    }
  }

  function compile(req: HttpServletRequest, contextPath : String) : String {
    _compileCount.incrementAndGet()
    var lessSource = getLessSource(req)
    var c = new LessCompiler()
    var root = req.FullURL.substring(0, req.FullURL.lastIndexOf('/'))
    var result = c.compile(getFileName(contextPath), lessSource, root)
    return result
  }

  function getFileName(str : String) : String {
    return str.substring(str.lastIndexOf('/'))
  }

  function getLessSource(req: HttpServletRequest): String {
    var resourceAsStream = req.ServletContext.getResourceAsStream(req.ServletPath + "/" + req.PathInfo)
    return new Scanner(resourceAsStream).useDelimiter("\\A").next()
  }

  override function destroy() {
    //nothing
  }
}