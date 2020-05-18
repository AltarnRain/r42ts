<Query Kind="Program">
  <Reference Relative="..\Experiments\packages\NAudio.1.10.0\lib\net35\NAudio.dll">D:\Reps\Experiments\packages\NAudio.1.10.0\lib\net35\NAudio.dll</Reference>
  <Namespace>NAudio.Wave</Namespace>
</Query>

void Main()
{
	const bool debug = true;
	const string fourSpaces = "    ";
	var sourceFolder = @"D:\Reps\r42ts\Round42Sound\";
	var allMP3 = Directory.GetFiles(sourceFolder, "*.mp3", SearchOption.AllDirectories);
	
	var asArray = Directory.GetFiles(sourceFolder, "01.mp3", SearchOption.AllDirectories)
		.Select(s => s.Replace(sourceFolder,""))
		.Select(s => s.Replace("\\01.mp3", ""));
		
	// asArray.Dump();

	var nameSpaceAndFiles = new Dictionary<string, List<MP3FileData>>();
	foreach (var file in allMP3)
	{
		var subNamespace = file.Replace(sourceFolder, "");
		subNamespace = subNamespace.Substring(0, subNamespace.IndexOf("\\"));

		var fileName = Path.GetFileName(file);
		List<MP3FileData> files;

		if (nameSpaceAndFiles.ContainsKey(subNamespace))
		{
			files = nameSpaceAndFiles[subNamespace];
		}
		else
		{
			files = new List<MP3FileData>();
			nameSpaceAndFiles.Add(subNamespace, files);
		}

		var fileData = File.ReadAllBytes(file);
		var reader = new Mp3FileReader(file);
		var duration = reader.TotalTime;

		var fileNameAndData = new MP3FileData
		{
			FileName = fileName.Replace(".mp3", "").ToLower(),
			Data = debug ? "A" : Convert.ToBase64String(fileData),
			Duration = duration.TotalMilliseconds,
		};

		files.Add(fileNameAndData);
	}

	var sb = new StringBuilder();
	sb.AppendLine("/**");
	sb.AppendLine(" * @preserve Copyright 2019-2020 Onno Invernizzi.");
	sb.AppendLine(" * This source code is subject to terms and conditions.");
	sb.AppendLine(" * See LICENSE.MD.");
	sb.AppendLine(" */");
	sb.AppendLine();
	sb.AppendLine("/**");
	sb.AppendLine(" * Module:          Sounds");
	sb.AppendLine(" * Responsibility:  Contain sound assets. This file is generated. Do not edit.");
	sb.AppendLine(" */");
	sb.AppendLine();
	sb.AppendLine($"// Generated on: {DateTime.Now.ToShortDateString().ToString() + " " + DateTime.Now.ToShortTimeString()}");
	sb.AppendLine();	
	sb.AppendLine("export namespace Sounds {");

	foreach (var kvp in nameSpaceAndFiles)
	{
		sb.Append($"{fourSpaces}export const {kvp.Key} = ");

		var arrayFormat = asArray.Contains(kvp.Key);

		if (arrayFormat)
		{
			sb.AppendLine("[");
		}
		else
		{
			sb.AppendLine("{");
		}

		foreach (var value in kvp.Value)
		{
			var data = "data:audio/mp3;base64," + value.Data;
			if (arrayFormat)
			{
				sb.AppendLine($"{fourSpaces}{fourSpaces}\"{data}\",");
			}
			else
			{
				sb.AppendLine($"{fourSpaces}{fourSpaces}{value.FileName}: \"{data}\",");
			}
		}

		if (arrayFormat)
		{
			sb.AppendLine($"{fourSpaces}];");
		}
		else
		{
			sb.AppendLine($"{fourSpaces}}};");
		}
	}

	sb.AppendLine("}");

	sb.ToString().Dump();

	File.WriteAllText(@"D:\Reps\r42ts\src\Sound\Sounds.ts", sb.ToString());

}

class MP3FileData
{
	public string FileName { get; set; }
	public string Data { get; set; }
	public double Duration {get;set;}
}