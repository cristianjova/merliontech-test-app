package merliontechs.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import merliontechs.web.rest.TestUtil;

public class SalesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sales.class);
        Sales sales1 = new Sales();
        sales1.setId(1L);
        Sales sales2 = new Sales();
        sales2.setId(sales1.getId());
        assertThat(sales1).isEqualTo(sales2);
        sales2.setId(2L);
        assertThat(sales1).isNotEqualTo(sales2);
        sales1.setId(null);
        assertThat(sales1).isNotEqualTo(sales2);
    }
}
