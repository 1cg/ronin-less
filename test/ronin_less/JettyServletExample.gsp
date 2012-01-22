uses org.mortbay.jetty.servlet.Context
uses org.mortbay.jetty.bio.SocketConnector
uses org.mortbay.jetty.servlet.*
uses org.mortbay.jetty.Server
uses org.mortbay.jetty.Request
uses javax.servlet.http.*
uses ronin_less.LessFilter

var lessFilter = new LessFilter()

// Create server and root context
var server = new Server()
var connector = new SocketConnector()
connector.setPort(8080)
server.addConnector(connector)
var context = new Context(server, "/", Context.SESSIONS)

// Add the default servlet 
context.addServlet(new ServletHolder(new DefaultServlet()), "/*")
context.ResourceBase = "."

// Add less filter
context.addFilter(new FilterHolder(lessFilter), "/*", org.mortbay.jetty.Handler.DEFAULT)

// Start server
server.start()
server.join()