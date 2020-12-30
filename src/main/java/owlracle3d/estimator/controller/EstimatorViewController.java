package owlracle3d.estimator.controller;

import org.apache.commons.compress.archivers.ArchiveException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import owlracle3d.estimator.core.Estimative;
import owlracle3d.estimator.rest.EstimatorService;

import java.io.IOException;
import java.util.Map;

@Controller
public class EstimatorViewController {

    @Autowired
    public EstimatorService service;

    @Autowired
    private Environment env;

    @GetMapping(path = "/")
    public String index(Map<String, Object> model) {

        for(java.util.Iterator it = ((AbstractEnvironment) env).getPropertySources().iterator(); it.hasNext(); ) {
            PropertySource propertySource = (PropertySource) it.next();
            if (propertySource instanceof MapPropertySource) {
                model.putAll(((MapPropertySource) propertySource).getSource());
            }
        }

        return "index";
    }

    @PostMapping(path = "/")
    public ModelAndView save(
            @RequestPart("file") MultipartFile[] files,

            @RequestPart("slicer") String slicerChoice,
            @RequestPart("filament_density") String filamentDensity,
            @RequestPart("fill_density") String fillDensity,
            @RequestPart("layer_height") String layer_height,
            @RequestPart("brim_width") String brim_width,

            @RequestPart("preheat_bed_time") String preheatBedTime,
            @RequestPart("preheat_hotend_time") String preheatHotendTime,

            @RequestPart("filament_cost") String filamentCost,
            @RequestPart("power_rating") String powerRating,
            @RequestPart("cost_of_energy") String costOfEnergy,

            @RequestPart("fail_average") String fail_average,
            @RequestPart("spray_use") String spray_use,
            @RequestPart("additional_cost") String additional_cost,

            @RequestPart("investment") String investment,
            @RequestPart("desired_return_time") String desired_return_time,
            @RequestPart("work_hours") String work_hours,

            @RequestPart("profit") String profit,
            @RequestPart("transaction_fee") String transaction_fee,

            @RequestPart("filament_charge") String filament_charge,
            @RequestPart("energy_charge") String energy_charge,
            @RequestPart("print_time_charge") String print_time_charge,
            @RequestPart("additional_charge") String additional_charge,

            Map<String, Object> model)
            throws IOException, InterruptedException, ArchiveException {

        Estimative estimative = service.estimate(
                files,

                slicerChoice,
                filamentDensity,
                fillDensity,
                layer_height,
                brim_width,

                preheatBedTime,
                preheatHotendTime,

                filamentCost,
                powerRating,
                costOfEnergy,

                fail_average,
                spray_use,
                additional_cost,

                investment,
                desired_return_time,
                work_hours,

                profit,
                transaction_fee,

                filament_charge,
                energy_charge,
                print_time_charge,
                additional_charge
        );

        model.put("estimative", estimative);

        return new ModelAndView("result", model);
    }


}