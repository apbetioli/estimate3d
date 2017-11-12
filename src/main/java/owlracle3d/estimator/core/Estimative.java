package owlracle3d.estimator.core;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Estimative {

    public String name;
    public BigDecimal cost = BigDecimal.ZERO; //$
    public BigDecimal length = BigDecimal.ZERO; //mm
    public BigDecimal volume = BigDecimal.ZERO; //cm3
    public BigDecimal weight = BigDecimal.ZERO; //g
    public BigDecimal time = BigDecimal.ZERO; //min
    public BigDecimal energyCost = BigDecimal.ZERO; //$
    public List<Estimative> parts;

    public BigDecimal getTotalCost() {
        return cost.add(energyCost);
    }

    public void add(Estimative part) {
        this.cost = this.cost.add(part.cost);
        this.length = this.length.add(part.length);
        this.volume = this.volume.add(part.volume);
        this.weight = this.weight.add(part.weight);
        this.time = this.time.add(part.time);
        this.energyCost = this.energyCost.add(part.energyCost);
        
        if(this.parts == null)
            this.parts = new ArrayList<>();
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
                ", energyCost='" + energyCost + '\'' +
                '}';
    }
}
