$pptx = (Resolve-Path 'BigSam_Steganography_Internal_Defense_Presentation.pptx').Path
$pdf = (Join-Path (Get-Location).Path 'BigSam_Steganography_Internal_Defense_Presentation.pdf')
$pp = $null
$pres = $null
try {
  $pp = New-Object -ComObject PowerPoint.Application
  $pres = $pp.Presentations.Open($pptx, $true, $false, $false)
  $pres.SaveAs($pdf, 32)
  $pres.Close()
  $pp.Quit()
  Write-Output $pdf
} catch {
  Write-Error $_
  if ($pres -ne $null) { $pres.Close() }
  if ($pp -ne $null) { $pp.Quit() }
  exit 1
}
