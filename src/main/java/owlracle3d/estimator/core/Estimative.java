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
    public BigDecimal energy_cost = BigDecimal.ZERO; //$
    public BigDecimal additional_cost = BigDecimal.ZERO; //$
    public BigDecimal roi = BigDecimal.ZERO; //$

    public BigDecimal filament_charge = BigDecimal.ZERO; //$
    public BigDecimal energy_charge = BigDecimal.ZERO; //$
    public BigDecimal additional_charge = BigDecimal.ZERO; //$
    public BigDecimal print_time_charge = BigDecimal.ZERO; //$

    public BigDecimal fail_average = BigDecimal.ZERO; //%
    public BigDecimal profit = new BigDecimal(100); //%
    public BigDecimal transaction_fee = BigDecimal.ZERO; //%

    public List<Estimative> parts;

    public String getFormattedTime() {
        BigDecimal[] times = time.divideAndRemainder(new BigDecimal(60));
        return String.format("%d:%02d", times[0].intValue(), times[1].intValue());
    }

    public BigDecimal getTotalCost() {
        BigDecimal total = sumTotalCost();

        return total;
    }

    public BigDecimal getTotalCharge() {
        BigDecimal total = sumTotalCharge();

        return total;
    }

    public BigDecimal getFailureMargin() {
        BigDecimal total = sumTotalCost();
        BigDecimal fail = total
                .multiply(fail_average)
                .divide(new BigDecimal(100), 2, RoundingMode.HALF_UP);
        return fail;
    }

    public BigDecimal getSellPrice() {
        BigDecimal totalCost = getTotalCost();
        BigDecimal myProfit = getProfit();
        return totalCost.add(roi).add(myProfit);

    }

    public BigDecimal getFinalPrice() {
        BigDecimal sellPrice = getSellPrice();
        BigDecimal fees = sellPrice.multiply(transaction_fee)
                .divide(new BigDecimal(100), 2, RoundingMode.HALF_UP);
        return sellPrice.add(fees);
    }

    public BigDecimal getProfit() {
        BigDecimal totalCost = getTotalCost();
        return totalCost
                .multiply(profit)
                .divide(new BigDecimal(100), 2, RoundingMode.HALF_UP);
    }

    public void add(Estimative part) {
        this.filament_cost = this.filament_cost.add(part.filament_cost);
        this.length = this.length.add(part.length);
        this.volume = this.volume.add(part.volume);
        this.weight = this.weight.add(part.weight);
        this.time = this.time.add(part.time);
        this.energy_cost = this.energy_cost.add(part.energy_cost);
        this.additional_cost = this.additional_cost.add(part.additional_cost);
        this.roi = this.roi.add(part.roi);
        this.filament_charge = this.filament_charge.add(part.filament_charge);
        this.energy_charge = this.energy_charge.add(part.energy_charge);
        this.additional_charge = this.additional_charge.add(part.additional_charge);
        this.print_time_charge = this.print_time_charge.add(part.print_time_charge);

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
                ", energy_cost=" + energy_cost +
                ", additional_cost=" + additional_cost +
                ", filament_charge=" + filament_charge +
                ", energy_charge=" + energy_charge +
                ", additional_charge=" + additional_charge +
                ", roi=" + roi +
                ", fail_average=" + fail_average +
                ", profit=" + profit +
                ", parts=" + parts +
                '}';
    }

    private BigDecimal sumTotalCost() {
        return filament_cost.add(energy_cost);
    }

    public BigDecimal calculateFilamentCost(String filamentCostPerKg) {
        return this.weight.multiply(new BigDecimal(filamentCostPerKg)).divide(new BigDecimal(1000), 2, RoundingMode.HALF_UP);

    }

    private BigDecimal sumTotalCharge() {
        return filament_charge.add(energy_charge).add(print_time_charge).add(additional_charge);
    }

    public BigDecimal calculateFilamentCharge(String filamentChargePerKg) {
        return this.weight.multiply(new BigDecimal(filamentChargePerKg)).divide(new BigDecimal(1000), 2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateEnergyCharge(String costOfEnergy, String energyCharge) {
        return new BigDecimal(energyCharge).multiply(energy_cost)
                .divide(new BigDecimal(costOfEnergy), 2, RoundingMode.HALF_UP);
    }
}
