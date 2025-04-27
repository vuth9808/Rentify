package com.javaweb.utils;

public final class StringUtils {
	public static boolean check(String data) {
		if(data != null && !data.equals("")) {
			return true;
		}
		return false;
	}
}
