package ronin_less;

import junit.framework.TestCase;

public class LessCompilerTest extends TestCase {
  
  public void testBootstrap() {
    LessCompiler c = new LessCompiler();
    assertEquals("#blah {\n" +
      "  foo: bar;\n" +
      "}\n", c.compile("", "#blah { foo: bar }", null));
  }
  
  public void testLessVars() {
    LessCompiler c = new LessCompiler();
    assertEquals("#blah {\n" +
      "  foo: bar;\n" +
      "}\n", c.compile("", "@foo : bar; #blah { foo: @foo }", null));
  }

}
