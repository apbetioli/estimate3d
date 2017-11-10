package owlracle3d.estimator.core;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Estimative {

    public String name;
    public BigDecimal cost = BigDecimal.ZERO.setScale(2);
    public BigDecimal length = BigDecimal.ZERO.setScale(2); //mm
    public BigDecimal volume = BigDecimal.ZERO.setScale(2); //cm3
    public BigDecimal weight = BigDecimal.ZERO.setScale(2); //g
    public long time = 0;
    public List<Estimative> parts = new ArrayList<>();

    public void add(Estimative part) {
        this.cost = this.cost.add(part.cost);
        this.length = this.length.add(part.length);
        this.volume = this.volume.add(part.volume);
        this.weight = this.weight.add(part.weight);
        this.time += part.time;
        this.parts.add(part);
    }

    @Override
    public String toString() {
        return "Estimative{" +
                "name='" + name + '\'' +
                ", cost='" + cost + '\'' +
                ", length='" + length + '\'' +
                ", volume='" + volume + '\'' +
                ", weight='" + weight + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
