package ronin_less;

import org.mozilla.javascript.*;
import org.mozilla.javascript.tools.shell.Global;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

public class LessCompiler {

  public String compile(String lessCode) {
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

    //invoke less parser
    Object result = cx.evaluateString(scope, "var parser = new(less.Parser);\n" +
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
  }

}
