package owlracle3d.estimator.controller;

import org.apache.commons.compress.archivers.ArchiveException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import owlracle3d.estimator.core.Estimative;
import owlracle3d.estimator.rest.EstimatorService;

import javax.ws.rs.DefaultValue;
import java.io.IOException;
import java.util.Map;

@Controller
public class EstimatorViewController {

    @Autowired
    public EstimatorService service;

    @GetMapping(path = "/")
    public String index(Map<String, Object> model) {
		return "index";
	}

    @PostMapping(path = "/")
    public ModelAndView save(
                @RequestPart("file") MultipartFile[] files, 
                @RequestPart(value="filament_cost") String filamentCost,
                @RequestPart(value="slicer") @DefaultValue("slic3r") String slicerChoice,
                @RequestPart(value="preheat_bed_time") @DefaultValue("0") String preheatBedTime,
                @RequestPart(value="preheat_hotend_time") @DefaultValue("0") String preheatHotendTime,
                @RequestPart(value="filament_density") @DefaultValue("1.24") String filamentDensity,
                @RequestPart(value="power_rating") @DefaultValue("600") String powerRating,
                @RequestPart(value="cost_of_energy") @DefaultValue("0.69118") String costOfEnergy,
                @RequestPart(value="fill_density") @DefaultValue("15") String fillDensity,
                Map<String, Object> model)
            throws IOException, InterruptedException, ArchiveException {

        Estimative estimative = service.estimate(
            files, 
            filamentCost, 
            slicerChoice, 
            preheatBedTime, 
            preheatHotendTime,
            filamentDensity,
            powerRating,
            costOfEnergy,
            fillDensity
        );

        model.put("estimative", estimative);

        return new ModelAndView("result", model);
    }


}