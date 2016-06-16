<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Express Webpack React Starter</title>
  <link rel="stylesheet" href="<%= assets.main.css %>">
</head>
<body>
  <div id="react-render-target"><%= data.html %></div>
  <script src="<%= assets.vendor.js %>"></script>
  <script async src="<%= assets.main.js %>" ></script>
</body>
</html>
