package owlracle3d.estimator.core;

import java.util.ArrayList;
import java.util.List;

public class Estimative {

    public String name;
    public double cost = 0;
    public double length = 0; //mm
    public double volume = 0; //cm3
    public double weight = 0; //g
    public long time = 0;
    public List<Estimative> parts = new ArrayList<>();

    public void add(Estimative part) {
        this.cost += part.cost;
        this.length += part.length;
        this.volume += part.volume;
        this.weight += part.weight;
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
