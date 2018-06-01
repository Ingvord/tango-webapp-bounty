<%@ page import="javax.servlet.jsp.*,
                 java.io.*,
                 java.util.*,
                 java.util.zip.*"
%>
<%@ page import="java.util.concurrent.ConcurrentMap" %>
<%@ page import="java.util.concurrent.ConcurrentHashMap" %>
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8" %>

<%!
    public void jspInit(){
        ServletContext ctx = getServletConfig().getServletContext();
        ConcurrentMap<String,String> storage = (ConcurrentMap<String,String>)ctx.getAttribute("UserContextStorage");
        if(storage == null){
            ctx.setAttribute("UserContextStorage", new ConcurrentHashMap<>());
        }
    }
%>


<%
    ConcurrentMap<String,String> storage = (ConcurrentMap<String,String>)request.getServletContext().getAttribute("UserContextStorage");
    String method = request.getMethod();

    switch(method){
        case "GET":
            //enable gzip
            response.setHeader("Content-Encoding", "gzip");
            OutputStream outA = response.getOutputStream();
            PrintWriter outWriter = new PrintWriter(new GZIPOutputStream(outA), false);
            outWriter.print(Arrays.toString(storage.values().toArray()));
            outWriter.close();
            break;
        case "POST":
            String user = request.getParameter("user");
            String value = request.getParameter("value");

            StringBuilder json = new StringBuilder();
            json
            .append("{\"id\":").append(System.currentTimeMillis())
            .append(",\"user\":\"").append(user)
            .append("\",\"value\":\"").append(value).append("\"}");

            storage.put(user, json.toString());
            storage.remove(user, null);
            break;
    }
%>