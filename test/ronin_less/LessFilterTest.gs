package ronin_less

uses javax.servlet.http.*
uses org.junit.Test
uses javax.servlet.*
uses java.lang.StringBuilder
uses java.lang.StringBuffer
uses java.util.concurrent.ConcurrentHashMap
uses java.util.*
uses java.lang.*
uses javax.servlet.descriptor.JspConfigDescriptor
uses java.lang.ClassLoader
uses java.net.URL
uses java.io.*
uses junit.framework.TestCase

class LessFilterTest extends TestCase {

  function testBasicCompilation() {
    var filter = new LessFilter()
    var out = new MockResponse()
    filter.doFilter(new MockRequest() {:MockPathInfo = "/example.less", :MockSource = "@color:#fff;"}, out, null)
    assertEquals("", out.Output)
    assertEquals(1, filter.Compilations.intValue())

    out = new MockResponse()
    filter.doFilter(new MockRequest() {:MockPathInfo = "/example.less", :MockSource = "@color:#fff;"}, out, null)
    assertEquals("", out.Output)
    assertEquals(2, filter.Compilations.intValue())
  }

  function testBasicCompilationWithCaching() {
    var filter = new LessFilter() { :Cache = true }
    var out = new MockResponse()
    filter.doFilter(new MockRequest() {:MockPathInfo = "/example.less", :MockSource = "@color:#fff;"}, out, null)
    assertEquals("", out.Output)
    assertEquals(1, filter.Compilations.intValue())

    out = new MockResponse()
    filter.doFilter(new MockRequest() {:MockPathInfo = "/example.less", :MockSource = "@color:#fff;"}, out, null)
    assertEquals("", out.Output)
    assertEquals(1, filter.Compilations.intValue())
  }

  class MockRequest implements HttpServletRequest {

    var _mockPathInfo : String as MockPathInfo
    var _source : String as MockSource
    var _ctx : MockServletContext

    construct() {
      _ctx = new MockServletContext(this)
    }

    override property get AuthType(): java.lang.String {
      return null
    }

    override property get Cookies(): javax.servlet.http.Cookie[] {
      return null
    }

    override function getDateHeader(p0: java.lang.String): long {
      return 0
    }

    override function getHeader(p0: java.lang.String): java.lang.String {
      return null
    }

    override function getHeaders(p0: java.lang.String): java.util.Enumeration <java.lang.String> {
      return null
    }

    override property get HeaderNames(): java.util.Enumeration <java.lang.String> {
      return null
    }

    override function getIntHeader(p0: java.lang.String): int {
      return 0
    }

    override property get Method(): java.lang.String {
      return null
    }

    override property get PathInfo(): java.lang.String {
      return _mockPathInfo
    }

    override property get PathTranslated(): java.lang.String {
      return null
    }

    override property get ContextPath(): java.lang.String {
      return null
    }

    override property get QueryString(): java.lang.String {
      return null
    }

    override property get RemoteUser(): java.lang.String {
      return null
    }

    override function isUserInRole(p0: java.lang.String): boolean {
      return false
    }

    override property get UserPrincipal(): java.security.Principal {
      return null
    }

    override property get RequestedSessionId(): java.lang.String {
      return null
    }

    override property get RequestURI(): java.lang.String {
      return null
    }

    override property get RequestURL(): java.lang.StringBuffer {
      return new StringBuffer("http://localhost/foo")
    }

    override property get ServletPath(): java.lang.String {
      return null
    }

    override function getSession(p0: boolean): javax.servlet.http.HttpSession {
      return null
    }

    override property get Session(): javax.servlet.http.HttpSession {
      return null
    }

    override property get RequestedSessionIdValid(): boolean {
      return false
    }

    override property get RequestedSessionIdFromCookie(): boolean {
      return false
    }

    override property get RequestedSessionIdFromURL(): boolean {
      return false
    }

    override property get RequestedSessionIdFromUrl(): boolean {
      return false
    }

    override function authenticate(p0: javax.servlet.http.HttpServletResponse): boolean {
      return false
    }

    override function login(p0: java.lang.String, p1: java.lang.String) {
    }

    override function logout() {
    }

    override property get Parts(): java.util.Collection <javax.servlet.http.Part> {
      return null
    }

    override function getPart(p0: java.lang.String): javax.servlet.http.Part {
      return null
    }

    override function getAttribute(p0: java.lang.String): java.lang.Object {
      return null
    }

    override property get AttributeNames(): java.util.Enumeration <java.lang.String> {
      return null
    }

    override property get CharacterEncoding(): java.lang.String {
      return null
    }

    override property set CharacterEncoding(p0: java.lang.String) {
    }

    override property get ContentLength(): int {
      return 0
    }

    override property get ContentType(): java.lang.String {
      return null
    }

    override property get InputStream(): javax.servlet.ServletInputStream {
      return null
    }

    override function getParameter(p0: java.lang.String): java.lang.String {
      return null
    }

    override property get ParameterNames(): java.util.Enumeration <java.lang.String> {
      return null
    }

    override function getParameterValues(p0: java.lang.String): java.lang.String[] {
      return null
    }

    override property get ParameterMap(): java.util.Map <java.lang.String, java.lang.String[]> {
      return null
    }

    override property get Protocol(): java.lang.String {
      return null
    }

    override property get Scheme(): java.lang.String {
      return null
    }

    override property get ServerName(): java.lang.String {
      return null
    }

    override property get ServerPort(): int {
      return 0
    }

    override property get Reader(): java.io.BufferedReader {
      return null
    }

    override property get RemoteAddr(): java.lang.String {
      return null
    }

    override property get RemoteHost(): java.lang.String {
      return null
    }

    override function setAttribute(p0: java.lang.String, p1: java.lang.Object) {
    }

    override function removeAttribute(p0: java.lang.String) {
    }

    override property get Locale(): java.util.Locale {
      return null
    }

    override property get Locales(): java.util.Enumeration <java.util.Locale> {
      return null
    }

    override property get Secure(): boolean {
      return false
    }

    override function getRequestDispatcher(p0: java.lang.String): javax.servlet.RequestDispatcher {
      return null
    }

    override function getRealPath(p0: java.lang.String): java.lang.String {
      return null
    }

    override property get RemotePort(): int {
      return 0
    }

    override property get LocalName(): java.lang.String {
      return null
    }

    override property get LocalAddr(): java.lang.String {
      return null
    }

    override property get LocalPort(): int {
      return 0
    }

    override property get ServletContext(): javax.servlet.ServletContext {
      return _ctx
    }

    override function startAsync(): javax.servlet.AsyncContext {
      return null
    }

    override function startAsync(p0: javax.servlet.ServletRequest, p1: javax.servlet.ServletResponse): javax.servlet.AsyncContext {
      return null
    }

    override property get AsyncStarted(): boolean {
      return false
    }

    override property get AsyncSupported(): boolean {
      return false
    }

    override property get AsyncContext(): javax.servlet.AsyncContext {
      return null
    }

    override property get DispatcherType(): javax.servlet.DispatcherType {
      return null
    }
  }

  class MockServletContext implements ServletContext {

    var _req : MockRequest

    construct(req : MockRequest) {
      _req = req
    }

    override property get ContextPath() : String {
      return ""
    }

    override function getContext(s : String) : ServletContext {
      return null
    }

    override property get MajorVersion() : int {
      return 0
    }

    override property get MinorVersion() : int {
      return 0
    }

    override property get EffectiveMajorVersion() : int {
      return 0
    }

    override property get EffectiveMinorVersion() : int {
      return 0
    }

    override function getMimeType(s : String) : String {
      return s
    }

    override function getResource(s : String) : URL {
      return null
    }

    override function getResourceAsStream(s : String) : InputStream {
      return new ByteArrayInputStream(_req.MockSource.getBytes())
    }

    override function getRequestDispatcher(s : String) : RequestDispatcher {
      return null
    }

    override function getNamedDispatcher(s : String) : RequestDispatcher {
      return null
    }

    override function getServlet(s : String) : Servlet {
      return null
    }

    override property get Servlets() : Enumeration<Servlet> {
      return null
    }

    override property get ServletNames() : Enumeration<String> {
      return null
    }

    override function log(s : String) {}
    override function log(e : Exception, s : String) {}
    override function log(s : String, t : Throwable) {}

    override function getRealPath(s : String) : String {
      return s
    }

    override property get ServerInfo() : String {
      return ""
    }

    override function getInitParameter(s : String) : String {
      return null
    }

    override property get InitParameterNames() : Enumeration<String> {
      return null
    }

    var _attributes = new ConcurrentHashMap<String, Object>()

    override function getAttribute(s : String) : Object {
      return _attributes[s]
    }

    override property get AttributeNames() : Enumeration<String> {
      return null
    }

    override function setAttribute(s : String, o : Object) {
      _attributes[s] = o
    }

    override function removeAttribute(s : String) {
      _attributes.remove(s)
    }

    override property get ServletContextName() : String {
      return "Ronin test servlet context"
    }

    override property get ClassLoader() : ClassLoader {
      return null
    }

    override property get DefaultSessionTrackingModes() : Set<SessionTrackingMode> {
      return null
    }

    override property get EffectiveSessionTrackingModes() : Set<SessionTrackingMode> {
      return null
    }

    override property get FilterRegistrations() : Map<String, FilterRegistration> {
      return null
    }

    override property get JspConfigDescriptor() : JspConfigDescriptor {
      return null
    }

    override property get ServletRegistrations() : Map<String, ServletRegistration> {
      return null
    }

    override property get SessionCookieConfig() : SessionCookieConfig {
      return null
    }

    override function addFilter(s : String, f : Filter) : FilterRegistration.Dynamic {
      return null
    }

    override function addFilter(s : String, f : Class<Filter>) : FilterRegistration.Dynamic {
      return null
    }

    override function addFilter(s : String, f : String) : FilterRegistration.Dynamic {
      return null
    }

    override function addServlet(s : String, f : Servlet) : ServletRegistration.Dynamic {
      return null
    }

    override function addServlet(s : String, f : Class<Servlet>) : ServletRegistration.Dynamic {
      return null
    }

    override function addServlet(s : String, f : String) : ServletRegistration.Dynamic {
      return null
    }

    override function addListener(s : String) {

    }

    override function addListener(s : Class<EventListener>) {

    }

    override function addListener<T extends EventListener>(s : T) {

    }

    override function createFilter<T extends Filter>(s : Class<T>) : T {
      return null
    }

    override function createListener<T extends EventListener>(s : Class<T>) : T {
      return null
    }

    override function createServlet<T extends Servlet>(s : Class<T>) : T {
      return null
    }

    override function declareRoles(s : String[]) {}

    override function getFilterRegistration(s : String) : FilterRegistration {
      return null
    }

    override function getResourcePaths(s : String) : Set<String> {
      return null
    }

    override function getServletRegistration(s : String) : ServletRegistration {
      return null
    }

    override function setInitParameter(s1 : String, s2 : String) : boolean {
      return false
    }

    override function setSessionTrackingModes(s : Set<SessionTrackingMode>) {}
  }

  class MockResponse implements HttpServletResponse {

    var _mockOutput = new MockOutputStream()

    property get Output() : String {
      return _mockOutput.Buffer.toString()
    }

    override function addCookie(p0: javax.servlet.http.Cookie) {
    }

    override function containsHeader(p0: java.lang.String): boolean {
      return false
    }

    function encodeURL(p0: java.lang.String): java.lang.String {
      return null
    }

    function encodeRedirectURL(p0: java.lang.String): java.lang.String {
      return null
    }

    override function encodeUrl(p0: java.lang.String): java.lang.String {
      return null
    }

    override function encodeRedirectUrl(p0: java.lang.String): java.lang.String {
      return null
    }

    override function sendError(p0: int, p1: java.lang.String) {
    }

    override function sendError(p0: int) {
    }

    override function sendRedirect(p0: java.lang.String) {
    }

    override function setDateHeader(p0: java.lang.String, p1: long) {
    }

    override function addDateHeader(p0: java.lang.String, p1: long) {
    }

    override function setHeader(p0: java.lang.String, p1: java.lang.String) {
    }

    override function addHeader(p0: java.lang.String, p1: java.lang.String) {
    }

    override function setIntHeader(p0: java.lang.String, p1: int) {
    }

    override function addIntHeader(p0: java.lang.String, p1: int) {
    }

    override property set Status(p0: int) {
    }

    override function setStatus(p0: int, p1: java.lang.String) {
    }

    override property get Status(): int {
      return 0
    }

    override function getHeader(p0: java.lang.String): java.lang.String {
      return null
    }

    override function getHeaders(p0: java.lang.String): java.util.Collection <java.lang.String> {
      return null
    }

    override property get HeaderNames(): java.util.Collection <java.lang.String> {
      return null
    }

    override property get CharacterEncoding(): java.lang.String {
      return null
    }

    override property get ContentType(): java.lang.String {
      return null
    }

    override property get OutputStream(): javax.servlet.ServletOutputStream {
      return _mockOutput;
    }

    override property get Writer(): java.io.PrintWriter {
      return null
    }

    override property set CharacterEncoding(p0: java.lang.String) {
    }

    function setContentLength(p0: int) {
    }

    override property set ContentType(p0: java.lang.String) {
    }

    override property set BufferSize(p0: int) {
    }

    override property get BufferSize(): int {
      return 0
    }

    override function flushBuffer() {
    }

    override function resetBuffer() {
    }

    override property get Committed(): boolean {
      return false
    }

    override function reset() {
    }

    override property set Locale(p0: java.util.Locale) {
    }

    override property get Locale(): java.util.Locale {
      return null
    }
  }

  class MockOutputStream extends ServletOutputStream {
    var _buff : StringBuilder as Buffer = new()
    override function write(b: int) {
      _buff.append(b as char)
    }
  }

}