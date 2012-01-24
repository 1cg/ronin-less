package ronin_less;

import gw.util.GosuExceptionUtil;
import org.mozilla.javascript.*;
import org.mozilla.javascript.tools.shell.Global;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

public class LessCompiler {

  public String compile(String fileName, String lessCode, String root) {
    Context cx = Context.enter();
    Scriptable scope;
    try {
      Global global = new Global();
      global.init(cx);
      scope = cx.initStandardObjects(global);
      cx.setOptimizationLevel(-1);

      //establish env
      URL envJs = LessCompiler.class.getResource("env.rhino.1.2.js");
      InputStream in = envJs.openStream();
      cx.evaluateReader(scope, new InputStreamReader(in), envJs.toString(), 1, null);
      in.close();

      // import less
      URL lessDist = LessCompiler.class.getResource("less-1.2.1.js");
      in = lessDist.openStream();
      cx.evaluateReader(scope, new InputStreamReader(in), lessDist.toString(), 1, null);
      in.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    String rootStr = ".";
    if (root != null) {
      rootStr = root.toString();
    }

    //invoke less parser
    try {
      Object result = cx.evaluateString(scope, "var parser = new(less.Parser)({\n" +
        "    paths: ['" + rootStr + "'], // Specify search paths for @import directives\n" +
        "    filename: '" + fileName + "' // Specify a filename, for better error messages\n" +
        "});\n" +
        "var result = null;\n" +
        "parser.parse(\"" + ScriptRuntime.escapeString(lessCode) + "\", function (err, tree) {\n" +
        "    if (err) { \n" +
        "      result = err.message;  \n" +
        "    } else { \n" +
        "      result = tree.toCSS();\n" +
        "    }\n" +
        "});" +
        "result", "RoninLess.js", 1, null);
      return result.toString();
    } catch (Exception e) {
      throw GosuExceptionUtil.forceThrow(e);
    }
  }

}
