package com.springboot.CRUD.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.springboot.CRUD.exception.TodoCollectionException;
import com.springboot.CRUD.model.FileInfo;
import com.springboot.CRUD.model.TodoDTO;
import com.springboot.CRUD.model.User;
import com.springboot.CRUD.model.Weather;
import com.springboot.CRUD.model.WeatherApi;

import jakarta.validation.ConstraintViolationException;

@Service
public interface TodoService {
	
	public void createTodo(TodoDTO todo) throws ConstraintViolationException, TodoCollectionException;

	public List<TodoDTO> getAllTodos();
	
	public TodoDTO getSingleTodo(String id) throws TodoCollectionException;
	
	public void updateTodo(String id, TodoDTO todo) throws TodoCollectionException;
	
	public void deleteTodoById(String id) throws TodoCollectionException ;
	
	public User createUser(User user);
	
	public User login(String email, String password);
	
	//for files
    public FileInfo store(MultipartFile file) throws IOException;
	
	public FileInfo getFile(String id);
	
	public Stream<FileInfo> getAllFiles();
	
	public void deleteFile(String id);
	
	// for weather
	public void getweather(String city);
	
	public List<Weather> getDetails();
	
	//for first static way of weather
	public WeatherApi getaWeatherDetails();
	
	//for second static way of weather
	public WeatherApi getWeatherDetail();
	
	//for third static way of weather
	public WeatherApi getaWeatherDetail();
	
	public List<WeatherApi> getaWeather();
	
	
	
	
	
	
	
	

}
