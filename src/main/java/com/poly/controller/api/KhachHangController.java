package com.poly.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.AccountDAO;
import com.poly.model.KhachHang;

@CrossOrigin("*")
@RestController
public class KhachHangController {
	@Autowired
	private AccountDAO accountDAO;

	@GetMapping("/rest/khachhang")
	public ResponseEntity<List<KhachHang>> getAll(Model model) {
		return ResponseEntity.ok(accountDAO.findAll());
	}

	@GetMapping("/rest/khachhang/{id}")
	public ResponseEntity<KhachHang> getOne(@PathVariable("id") String id) {
		if (!accountDAO.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(accountDAO.findById(id).get());
	}

	// Insert
	@PostMapping("/rest/khachhang")
	public ResponseEntity<KhachHang> post(@RequestBody KhachHang khachHang) {
		if (accountDAO.existsById(khachHang.getTaiKhoan())) {
			return ResponseEntity.badRequest().build();
		}
		accountDAO.save(khachHang);
		return ResponseEntity.ok(khachHang);
	}

	// Update
	@PutMapping("/rest/khachhang/{id}")
	public ResponseEntity<KhachHang> put(@PathVariable("id") String id, @RequestBody KhachHang khachHang) {
		if (!accountDAO.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		accountDAO.save(khachHang);
		return ResponseEntity.ok(khachHang);
	}

	@DeleteMapping("/rest/khachhang/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!accountDAO.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		accountDAO.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
