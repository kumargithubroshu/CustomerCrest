 package com.springboot.CRUD.helper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;

//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.InputStream;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadHelper {
	
	public final String UPLOAD_DIR = "C:\\Users\\RoshanKumar\\Desktop\\Java-Developer\\CRUD\\CRUD\\src\\main\\resources\\static\\image";
//	public final String UPLOAD_DIR =new ClassPathResource("static/image/").getFile().getAbsolutePath() ;
    
//	public FileUploadHelper() throws IOException
//	{
//		
//	}
	public boolean uploadFile(MultipartFile multipartFile)
	{
		boolean f=false;
		
		try
		{
//			//read
//			InputStream inputStream = multipartFile.getInputStream();
//			byte data[] = new byte[inputStream.available()];
//			inputStream.read(data);
//			
//			// write
//			FileOutputStream fos=new FileOutputStream(UPLOAD_DIR +File.separator+multipartFile.getOriginalFilename());  
//			                                                      // File.seperator==> "\\"
//			fos.write(data);
//			
//			fos.flush();
//			fos.close();
			
			
			Files.copy(multipartFile.getInputStream(), Paths.get(UPLOAD_DIR +File.separator+multipartFile.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
			f=true;
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return f;
	}
}
