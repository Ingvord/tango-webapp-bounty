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
        case "POST":
            String user = request.getParameter("user");
            String value = request.getParameter("value");
            String webix_operation = request.getParameter("webix_operation");
            StringBuilder json = new StringBuilder();
            String id = request.getParameter("id");
            json
                .append("{\"id\":").append(id)
                .append(",\"user\":\"").append(user)
                .append("\",\"value\":\"").append(value).append("\"}");

            if(webix_operation.equalsIgnoreCase("delete"))
                storage.remove(id);
            else
                storage.put(id, json.toString());
        case "GET":
            //enable gzip
            response.setHeader("Content-Encoding", "gzip");
            OutputStream outA = response.getOutputStream();
            PrintWriter outWriter = new PrintWriter(new GZIPOutputStream(outA), false);
            outWriter.print(Arrays.toString(storage.values().toArray()));
            outWriter.close();
            break;
    }
%>