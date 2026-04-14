param(
  [int]$Port = 5173
)

$ErrorActionPreference = "Stop"

$root = Join-Path $PSScriptRoot "..\dist"
$root = (Resolve-Path $root).Path

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()

Write-Host "Serving $root at http://127.0.0.1:$Port/"

function Get-ContentType([string]$path) {
  $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
  switch ($ext) {
    ".html" { "text/html; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".gif" { "image/gif" }
    ".webp" { "image/webp" }
    ".ico" { "image/x-icon" }
    ".map" { "application/json; charset=utf-8" }
    default { "application/octet-stream" }
  }
}

while ($true) {
  $ctx = $listener.GetContext()
  try {
    $reqPath = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($reqPath)) { $reqPath = "index.html" }
    $candidate = Join-Path $root $reqPath

    if (Test-Path -LiteralPath $candidate -PathType Leaf) {
      $file = $candidate
    } else {
      # SPA fallback for client-side routes.
      $file = Join-Path $root "index.html"
    }

    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ctx.Response.StatusCode = 200
    $ctx.Response.ContentType = Get-ContentType $file
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    $msg = [System.Text.Encoding]::UTF8.GetBytes("Internal Server Error")
    $ctx.Response.StatusCode = 500
    $ctx.Response.ContentType = "text/plain; charset=utf-8"
    $ctx.Response.ContentLength64 = $msg.Length
    $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
  } finally {
    $ctx.Response.OutputStream.Close()
  }
}
