 package com.springboot.CRUD;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CrudApplication {
	
	static Logger logger = LogManager.getLogger(CrudApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
		
		System.out.println("Hello.................");
		
		// level
		//All > Trace > Debug > Info > Warn > Error > Fatal > of 
//		logger.trace("This is a trace msg");
//		logger.debug("This is a debug msg");
		logger.info("This is an info msg");
		logger.warn("This is a warn msg");
		logger.error("Thsi is an error msg");
//		logger.fatal("This is an fatal msg");
	}

}
