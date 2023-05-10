package com.springboot.CRUD.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "cloud")
public class WeatherApi {

	private String name;
	private double temp;
	private double humidity;
	private double lon;
	private double lat;
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date date=new Date();
	
	public WeatherApi() {
		super();
	}
	
	
	public WeatherApi(String name, double temp, double humidity, double lon, double lat, Date date) {
		super();
		this.name = name;
		this.temp = temp;
		this.humidity = humidity;
		this.lon = lon;
		this.lat = lat;
		this.date = date;
	}

	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getTemp() {
		return temp;
	}
	public void setTemp(double temp) {
		this.temp = temp;
	}
	public double getTemperature() {
		return temp;
	}
	public void setTemperature(double temperature) {
		this.temp = temperature;
	}
	public double getHumidity() {
		return humidity;
	}
	public void setHumidity(double humidity) {
		this.humidity = humidity;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
