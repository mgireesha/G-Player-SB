package com.gmt.gp.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.gmt.gp.util.GP_CONSTANTS;

@Configuration
@EnableWebMvc
@ComponentScan
public class GPWebMvcConfigurer implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        try {
            registry.addResourceHandler("/gp_images/**")
                    .addResourceLocations("file:" + GP_CONSTANTS.GP_IMAGES_PATH);
            Resource gp_react = new ClassPathResource("gp_react");
            registry.addResourceHandler("/**").addResourceLocations(gp_react.getURL() + "\\");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}