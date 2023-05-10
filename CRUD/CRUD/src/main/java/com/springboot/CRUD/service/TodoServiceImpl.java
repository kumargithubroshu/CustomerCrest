package com.springboot.CRUD.service;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

import javax.print.Doc;

import org.apache.commons.io.FilenameUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.CRUD.exception.TodoCollectionException;
import com.springboot.CRUD.model.FileInfo;
import com.springboot.CRUD.model.TodoDTO;
import com.springboot.CRUD.model.User;
import com.springboot.CRUD.model.Weather;
import com.springboot.CRUD.model.WeatherApi;
import com.springboot.CRUD.repository.FileRepository;
import com.springboot.CRUD.repository.TodoRepository;
import com.springboot.CRUD.repository.UserReposiory;
import com.springboot.CRUD.repository.WeatherApiRepository;
import com.springboot.CRUD.repository.WeatherRepository;

import jakarta.validation.ConstraintViolationException;

@Service
public class TodoServiceImpl implements TodoService{

	@Autowired
	private TodoRepository todoRepo;
	
	@Autowired
	FileRepository fileRepository;
	
	@Override
	public void createTodo(TodoDTO todo) throws ConstraintViolationException, TodoCollectionException {
		Optional<TodoDTO> todoOptional = todoRepo.findByTodo(todo.getTodo());
		if(todoOptional.isPresent())
		{
			throw new TodoCollectionException(TodoCollectionException.TodoAlreadyExists());
		}
		else
		{
			if(todoRepo.findById(todo.getId()).isPresent())
			{
				
				throw new TodoCollectionException(TodoCollectionException.TodoAlreadyExists());
			}
			else
			{
			
			
			System.out.println("creating");
			todo.setCreatedAt(new Date(System.currentTimeMillis()));
			todoRepo.save(todo);
		}
		}
	}

	@Override
	public List<TodoDTO> getAllTodos() {
		
		List<TodoDTO> todos = todoRepo.findAll();
		if(todos.size()>0)
		{
			return todos;
		}
		else
		{
			return new ArrayList<TodoDTO>();
		}
		
	}

	@Override
	public TodoDTO getSingleTodo(String id) throws TodoCollectionException {

		Optional<TodoDTO> optionalTodo = todoRepo.findById(id);
		if(!optionalTodo.isPresent())
		{
			throw new TodoCollectionException(TodoCollectionException.NotFoundException(id));
		}
		else
		{
			return optionalTodo.get();
		}
	}

	@Override
	public void updateTodo(String id, TodoDTO todo) throws TodoCollectionException {

		Optional<TodoDTO> todoWithId = todoRepo.findById(id);
		Optional<TodoDTO> todoWithSameName = todoRepo.findByTodo(todo.getTodo());
		
		if(todoWithId.isPresent())
		{
			if(todoWithSameName.isPresent() && !todoWithSameName.get().getId().equals(id))
			{
				throw new TodoCollectionException(TodoCollectionException.TodoAlreadyExists());
			}
			
			TodoDTO todoToUpdate= todoWithId.get();
			
			todoToUpdate.setTodo(todo.getTodo());
			todoToUpdate.setDescription(todo.getDescription());
			todoToUpdate.setCompleted(todo.getCompleted());
			todoToUpdate.setUpdatedAt(new Date(System.currentTimeMillis()));
			todoRepo.save(todoToUpdate);
			
		}
		else
		{
			throw new TodoCollectionException(TodoCollectionException.NotFoundException(id));
		}
	}

	@Override
	public void deleteTodoById(String id) throws TodoCollectionException {

		Optional<TodoDTO> todoOptional = todoRepo.findById(id);
		if(!todoOptional.isPresent())
		{
			throw new TodoCollectionException(TodoCollectionException.NotFoundException(id));
		}
		else
		{
		  todoRepo.deleteById(id);
		}
	}
	
	
	@Autowired
    UserReposiory userReposiory;
	
	@Override
	public User createUser(User user) {
		if(userReposiory.findById(user.getEmail()).isPresent())
		{
			System.out.println("null");
			
			
		return null;
		
		}
		return userReposiory.save(user);
	}

	@Override
	public User login(String email, String password) {
		if(userReposiory.findById(email).isPresent())
		{
			User obj= userReposiory.findById(email).get();
			if(obj.getPassword().equals(password))
			{
				return obj;		
			} 
		}
		return null;
	}

	
	//for file
	
	private final Path root= Paths.get("C:\\Users\\RoshanKumar\\Desktop\\TodoFiles");

	@Override
	public FileInfo store(MultipartFile file) throws IOException 
	{
		
		String fileName = file.getOriginalFilename().replaceAll("\\.\\./|\\./", "");     // use to remove the sequense of
																					     // the character
		Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
		FileInfo FileDB = new FileInfo(fileName, file.getContentType(), file.getBytes());
		return fileRepository.save(FileDB);
		
	}


	@Override
	public FileInfo getFile(String id) {
		return fileRepository.findById(id).get();
	}

	@Override
	public Stream<FileInfo> getAllFiles() {
		return fileRepository.findAll().stream();
	}
	
	@Override
	public void deleteFile(String id) {
		FileInfo filename = fileRepository.findById(id).get();
		File file = new File(root + "\\" + filename.getFilename());
		
		System.out.println(file);
	

		if (file != null) {

		file.delete();
		System.out.println("file deleted successfully");

		} 
		
        FileInfo f = fileRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("File not found"));
        	fileRepository.delete(f);  
        	
    }
	
	
	// for Weather
	
	@Autowired
	private WeatherRepository weatherRepo;

	private static final String API_URL = "http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric";

	private final RestTemplate restTemplate = new RestTemplate();

	private String apiKey = "7ca348b5035a83350f68690b8d6f8690";
	
	@Override
	public void getweather(String city) {
        String url = String.format(API_URL, city, apiKey);
        String json = restTemplate.getForObject(url, String.class);
        
        try {
            JSONObject response = new JSONObject(json);
            JSONObject main = response.getJSONObject("main");
            System.out.println(main);
           
            JSONArray weather = response.getJSONArray("weather");
            JSONObject weatherInfo = weather.getJSONObject(0);
            JSONObject wind =response.getJSONObject("wind");
            String name= response.getString("name");
            System.out.println(name);
 
            
            Weather weatherData = new Weather();
            weatherData.setCity(city);
            weatherData.setTemperature(main.getDouble("temp"));
            weatherData.setHumidity(main.getDouble("humidity"));
            weatherData.setWind(wind.getDouble("deg"));
            weatherData.setDescription(weatherInfo.getString("description"));
            weatherData.setName(name);
//            System.out.println(weatherData.getName());
            weatherData.getDate();
            
            weatherRepo.save(weatherData);
//            System.out.println(json);
         
        } catch (JSONException e) {
            e.printStackTrace();
        }
      
    }
	
	
	public List<Weather> getDetails()
	 {
		 return weatherRepo.findAll();
	 }
	
	
	
	// for static weather details
	
	@Autowired
	private WeatherApiRepository weatherApiRepo;
	
	String url = "https://api.openweathermap.org/data/2.5/weather?q=Darbhanga&appid=7ca348b5035a83350f68690b8d6f8690&units=metric";
	
	
	
	@Override
	@Scheduled(fixedDelay = 100000)
	public WeatherApi getaWeatherDetails() {
		String data=restTemplate.getForObject(url, String.class);
		System.out.println(data);
		JSONObject root = new JSONObject(data);
		JSONObject main = root.getJSONObject("main");
		JSONObject coord =root.getJSONObject("coord");
		String name= root.getString("name");
		
		WeatherApi weatherApi = new WeatherApi(); 
		weatherApi.setTemperature(main.getDouble("temp"));
		weatherApi.setHumidity(main.getDouble("humidity"));
		weatherApi.setLon(coord.getDouble("lon"));
		weatherApi.setLat(coord.getDouble("lat"));
		weatherApi.setName(name);
		weatherApi.getDate();
		weatherApiRepo.save(weatherApi);
		return weatherApi;
	}
	
	
////////////////////  second /////////////////////////////////////////
	
	String url1 = "https://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=7ca348b5035a83350f68690b8d6f8690&units=metric";
	@Override
	@Scheduled(fixedDelay = 100000)
	public WeatherApi getWeatherDetail() {
		String data=restTemplate.getForObject(url1, String.class);
		System.out.println(data);
		JSONObject root = new JSONObject(data);
		JSONObject main = root.getJSONObject("main");
		JSONObject coord =root.getJSONObject("coord");
		String name= root.getString("name");
		
		WeatherApi weatherApi = new WeatherApi(); 
		weatherApi.setTemperature(main.getDouble("temp"));
		weatherApi.setHumidity(main.getDouble("humidity"));
		weatherApi.setLon(coord.getDouble("lon"));
		weatherApi.setLat(coord.getDouble("lat"));
		weatherApi.setName(name);
		weatherApi.getDate();
		weatherApiRepo.save(weatherApi);
		return weatherApi;
	}

	
	//////////////////// third //////////////////////////
	
	String url2 = "https://api.openweathermap.org/data/2.5/weather?q=Ramgarh&appid=7ca348b5035a83350f68690b8d6f8690&units=metric";
	
	@Override
	@Scheduled(fixedDelay = 100000)
	public WeatherApi getaWeatherDetail() {
		String data=restTemplate.getForObject(url2, String.class);
		System.out.println(data);
		JSONObject root = new JSONObject(data);
		JSONObject main = root.getJSONObject("main");
		JSONObject coord =root.getJSONObject("coord");
		String name= root.getString("name");
		
		WeatherApi weatherApi = new WeatherApi(); 
		weatherApi.setTemperature(main.getDouble("temp"));
		weatherApi.setHumidity(main.getDouble("humidity"));
		weatherApi.setLon(coord.getDouble("lon"));
		weatherApi.setLat(coord.getDouble("lat"));
		weatherApi.setName(name);
		weatherApi.getDate();
		weatherApiRepo.save(weatherApi);
		return weatherApi;
	}



	@Override
	public List<WeatherApi> getaWeather() {
		return weatherApiRepo.findAll();
	}
	
	
	
	
	
	
	
	
	
	
	
	
//    if (!Files.exists(root)) {
//    Files.createDirectories(root);
//  }
//  Path filePath = root.resolve(fileName);
//  try (InputStream inputStream = file.getInputStream()) {
//    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
//  }
	
	
//	 String uniqueFilename = generateUniqueFilename(fileName);
//	private String generateUniqueFilename(String fileName) {
//	    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
//	    String extension = FilenameUtils.getExtension(fileName);
//	    return timestamp + "_" + UUID.randomUUID().toString() + "." + extension;
//	  }

	
//	String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//		
//	try (InputStream inputStream = file.getInputStream();
//			FileOutputStream outputStream = new FileOutputStream("root")) {
//		byte[] buffer = new byte[4096];
//		int bytesRead;
//		while ((bytesRead = inputStream.read(buffer)) != -1) {
//			outputStream.write(buffer, 0, bytesRead);
//		}
//	} catch (IOException e) {
//		System.out.println(e.getMessage());
//	}
//	Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
}
