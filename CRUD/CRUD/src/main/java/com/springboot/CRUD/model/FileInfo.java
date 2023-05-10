package com.springboot.CRUD.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "files")
public class FileInfo {
	@Id
	private String id;
	private String filename;
	private String type;
	private byte[] data;
	
	
	
	public FileInfo( String filename, String type, byte[] data) {
		super();
		this.filename = filename;
		this.type = type;
		this.data = data;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}
	
//	public String getFilePath() {
//        return "uploads/" + id + "-" + filename;
//    }


	
}


