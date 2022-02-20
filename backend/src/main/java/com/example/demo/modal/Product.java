package com.example.demo.modal;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("products")
public class Product {

	@Transient
    public static final String SEQUENCE_NAME = "products_sequence";

	@Id
	private Long productId;

	private String name;
	private String type;
	private int quantity;
	private int availability;
	private int price;
	private long manufacturedDate;
	private long validTill;

	public Product(Long productId, String name, int quantity, String type, int availability, int price, long manufacturedDate,
			long validTill) {
		super();
		this.productId = productId;
		this.name = name;
		this.quantity = quantity;
		this.type = type;
		this.availability = availability;
		this.price = price;
		this.manufacturedDate = manufacturedDate;
		this.validTill = validTill;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getAvailability() {
		return availability;
	}

	public void setAvailability(int availability) {
		this.availability = availability;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public long getManufacturedDate() {
		return manufacturedDate;
	}

	public void setManufacturedDate(long manufacturedDate) {
		this.manufacturedDate = manufacturedDate;
	}

	public long getValidTill() {
		return validTill;
	}

	public void setValidTill(long validTill) {
		this.validTill = validTill;
	}

	
}