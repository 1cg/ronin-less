package ronin_less

uses javax.servlet. *;
uses javax.servlet.http.HttpServletRequest;
uses java.io.IOException;
uses java.io.InputStream;
uses java.util.Scanner;

class LessFilter implements Filter {

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
        var c = new LessCompiler()
        var result = c.compile(lessSource)
        servletResponse.getOutputStream().write(result.Bytes)
      }
    } else {
      filterChain.doFilter(req, servletResponse)
    }
  }

  function getLessSource(req: HttpServletRequest): String {
    var resourceAsStream = req.ServletContext.getResourceAsStream(req.PathInfo)
    return new Scanner(resourceAsStream).useDelimiter("\\A").next()
  }

  override function destroy() {
    //nothing
  }
}