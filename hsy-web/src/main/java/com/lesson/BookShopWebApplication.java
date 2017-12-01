/**
 *
 */
package com.lesson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * @author zhailiang
 */
@SpringBootApplication
public class BookShopWebApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(BookShopWebApplication.class);
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication.run(BookShopWebApplication.class, args);
    }

}
