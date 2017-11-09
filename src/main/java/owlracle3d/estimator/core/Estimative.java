package owlracle3d.estimator.core;

public class Estimative {
    public String cost;
    public String length;
    public String volume;
    public String weight;
    public String time;

    @Override
    public String toString() {
        return "Estimative{" +
            "cost='" + cost + '\'' +
            ", length='" + length + '\'' +
            ", volume='" + volume + '\'' +
            ", weight='" + weight + '\'' +
            ", time='" + time + '\'' +
            '}';
    }
}
