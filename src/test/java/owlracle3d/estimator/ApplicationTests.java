package owlracle3d.estimator;

import java.util.StringTokenizer;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

	@Test
	public void contextLoads() {
		String line = "G1 X104.736 Y106.870 F7800.000";
		StringTokenizer st = new StringTokenizer(line.replace("G1 ", "").replace(" ", ""), "\\D", true);
		while(st.hasMoreTokens()) {
			String token = st.nextToken();
			System.out.println(token);
		}
	}

}
