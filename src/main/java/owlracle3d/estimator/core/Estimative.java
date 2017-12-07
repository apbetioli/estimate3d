package owlracle3d.estimator.core;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class Estimative {

    public String name;
    public BigDecimal length = BigDecimal.ZERO; //mm
    public BigDecimal volume = BigDecimal.ZERO; //cm3
    public BigDecimal weight = BigDecimal.ZERO; //g
    public BigDecimal time = BigDecimal.ZERO; //min
    public BigDecimal filament_cost = BigDecimal.ZERO; //$
    public BigDecimal energyCost = BigDecimal.ZERO; //$
    public BigDecimal additional_cost = BigDecimal.ZERO; //$
    public BigDecimal roi = BigDecimal.ZERO; //$

    public BigDecimal fail_average = BigDecimal.ZERO; //%
    public BigDecimal profit = new BigDecimal(100); //%

    public List<Estimative> parts;

    public String getFormattedTime() {
        BigDecimal[] times = time.divideAndRemainder(new BigDecimal(60));
        return String.format("%d:%02d", times[0].intValue(), (int)(times[1].intValue()*0.6));
    }

    public BigDecimal getTotalCost() {
        BigDecimal total = filament_cost.add(energyCost).add(additional_cost);
        BigDecimal fail = total
                .multiply(fail_average)
                .divide(new BigDecimal(100),2, RoundingMode.HALF_UP);
        return total.add(fail);
    }

    public BigDecimal getSellPrice() {
        return getTotalCost()
                .add(roi)
                .multiply(profit)
                .divide(new BigDecimal(100),2, RoundingMode.HALF_UP);
    }

    public void add(Estimative part) {
        this.filament_cost = this.filament_cost.add(part.filament_cost);
        this.length = this.length.add(part.length);
        this.volume = this.volume.add(part.volume);
        this.weight = this.weight.add(part.weight);
        this.time = this.time.add(part.time);
        this.energyCost = this.energyCost.add(part.energyCost);
        this.additional_cost = this.additional_cost.add(part.additional_cost);
        this.roi = this.roi.add(part.roi);

        if (this.parts == null)
            this.parts = new ArrayList<>();
        this.parts.add(part);
    }

    @Override
    public String toString() {
        return "Estimative{" +
                "name='" + name + '\'' +
                ", length=" + length +
                ", volume=" + volume +
                ", weight=" + weight +
                ", time=" + time +
                ", filament_cost=" + filament_cost +
                ", energyCost=" + energyCost +
                ", additional_cost=" + additional_cost +
                ", roi=" + roi +
                ", fail_average=" + fail_average +
                ", profit=" + profit +
                ", parts=" + parts +
                '}';
    }
}
