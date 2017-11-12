package owlracle3d.estimator.controller;

import org.apache.commons.compress.archivers.ArchiveException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import owlracle3d.estimator.slicers.Slicer;
import owlracle3d.estimator.slicers.Slic3r;
import owlracle3d.estimator.core.Estimative;
import owlracle3d.estimator.core.Files;
import owlracle3d.estimator.core.GCodeAnalyzer;
import owlracle3d.estimator.rest.EstimatorService;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.Produces;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

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
        @RequestPart(value="filament_cost") String filament_cost,
        @RequestPart(value="slicer") @DefaultValue("slic3r") String slicerChoice,
        @RequestPart(value="preheat_bed_time") @DefaultValue("0") String preheatBedTime,
        @RequestPart(value="preheat_hotend_time") @DefaultValue("0") String preheatHotendTime,
        Map<String, Object> model)
            throws IOException, InterruptedException, ArchiveException {

        Estimative estimative = service.estimate(
            files, 
            filament_cost, 
            slicerChoice, 
            preheatBedTime, 
            preheatHotendTime
        );

        model.put("estimative", estimative);

        return new ModelAndView("result", model);
    }


}