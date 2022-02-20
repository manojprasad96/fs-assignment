package com.example.demo.controller;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.ProductsRepository;
import com.example.demo.repository.TypeRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.modal.Product;
import com.example.demo.services.SequenceGeneratorService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/fs/api")
public class FSController {
	@Autowired
	UsersRepository usersRepository;
	
	@Autowired
	ProductsRepository productsRepository;
	
	@Autowired
	TypeRepository typeRepository;
	
	@Autowired
	SequenceGeneratorService sequenceGeneratorService;
	
	public static ZoneId z = ZoneId.of( "Asia/Kolkata" );
	
	public static String getRandomString(int length) {
	    char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST".toCharArray();

	    StringBuilder sb = new StringBuilder();
	    Random random = new Random();
	    for (int i = 0; i < length; i++) {
	        char c = chars[random.nextInt(chars.length)];
	        sb.append(c);
	    }
	    String randomStr = sb.toString();

	    return randomStr;
	}
	
	public static String formatToRegexStr(String str) {
		if (str == null) {
			str = ".*";
	    } else {
	    	str = str + "$";
	    }
		return str;
	}
	
	public static Long getCurrentTime() {
		return ZonedDateTime.now( z ).toLocalDate().atStartOfDay( z ).toEpochSecond();
	}
	
	public static String convertToMongoOP(String op) {
		return op.equals("after")? "$gte": "$lte";
	}
	
	@GetMapping("/products")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Product>> getAllProduct() {
		try {
		    List<Product> products = new ArrayList<Product>();
		    productsRepository.findAll().forEach(products::add);
		    if (products.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(products, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/products/types")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<String>> getAllType() {
		try {
		    List<String> _types = new ArrayList<String>();
		    typeRepository.findAll().forEach(type -> _types.add(type.getName()));
		    if (_types.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(_types, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/products/valid")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Product>> getAllValidProduct() {
		try {
		    List<Product> products = new ArrayList<Product>();
		    productsRepository.findAllValid(getCurrentTime()).forEach(products::add);
		    if (products.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(products, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/products/valid/search")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Product>> getValidProductByTypeAndMFD(@RequestParam(value="type", required=false) String type, @RequestParam("mfd") Long mfd, @RequestParam("mfd_op") String mfd_op) {
		try {
		    List<Product> products = new ArrayList<Product>();
		    productsRepository.findValidByTypeAndMFD(getCurrentTime(), mfd, convertToMongoOP(mfd_op), formatToRegexStr(type)).forEach(products::add);
		    if (products.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(products, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/products/expired")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Product>> getAllExpiredProduct() {
		try {
		    List<Product> products = new ArrayList<Product>();
		    productsRepository.findAllExpired(getCurrentTime()).forEach(products::add);
		    if (products.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(products, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/products/expired/search")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Product>> getExpiredProductByTypeAndMFD(@RequestParam(value="type", required=false) String type, @RequestParam("mfd") Long mfd, @RequestParam("mfd_op") String mfd_op) {
		try {
		    List<Product> products = new ArrayList<Product>();
		    productsRepository.findExpiredByTypeAndMFD(getCurrentTime(), mfd, convertToMongoOP(mfd_op), formatToRegexStr(type)).forEach(products::add);
		    if (products.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(products, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/products/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
	  Optional<Product> _product = productsRepository.findById(id);
	  if (_product.isPresent()) {
	    return new ResponseEntity<>(_product.get(), HttpStatus.OK);
	  } else {
	    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
	}
	
	@PutMapping("/products/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Product> updateProductById(@PathVariable("id") Long id, @RequestBody Product product) {
		try {
			product.setProductId(id);
			Product _product = productsRepository.save(product);
			return new ResponseEntity<>(_product, HttpStatus.CREATED);
		} catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/products")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
	  try {
		  Product _product = productsRepository.save(new Product(sequenceGeneratorService.generateSequence(Product.SEQUENCE_NAME),
																	  product.getName(), product.getQuantity(), product.getType(),
																	  product.getAvailability(), product.getPrice(), product.getManufacturedDate(),
																	  product.getValidTill()));
	    return new ResponseEntity<>(_product, HttpStatus.CREATED);
	  } catch (Exception e) {
	    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
	}
	
	@DeleteMapping("/products/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Product> deleteProductById(@PathVariable("id") Long id) {
		try {
			Product _product = productsRepository.deleteById(id);
			return new ResponseEntity<>(_product, HttpStatus.CREATED);
		} catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}