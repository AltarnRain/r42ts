<Query Kind="Program" />

void Main()
{
	// Set to true to add an 'A' instead of the full base 64 string. Makes the output easier to read.
	const bool debug = false;

	const string mediaType = "ogg";
	var mediaTypeExtention = $".{mediaType}";
	var mediaFilter = $"*.{mediaType}";
	
	// Folder that contains the media files to be converted to base 64 and a TS file.
	var soundSourceFolder = @"D:\Reps\r42ts\Round42Sound\";
	var requireBasePath = @"../../Round42Sound/";
	
	// Folders that contain a 01.ABC file are converted to a TS array.
	var arrayIdentifier = $"01{mediaTypeExtention}";
	
	// I use 4 spaces to indent.
	const string fourSpaces = "    ";
	
	var allMedia = Directory.GetFiles(soundSourceFolder, mediaFilter, SearchOption.AllDirectories);
	
	var asArray = Directory.GetFiles(soundSourceFolder, arrayIdentifier, SearchOption.AllDirectories)
		.Select(s => s.Replace(soundSourceFolder, ""))
		.Select(s => s.Replace($"\\{arrayIdentifier}", ""));
		
	var nameSpaceAndFiles = new Dictionary<string, List<FileData>>();
	foreach (var file in allMedia)
	{
		var subNamespace = file.Replace(soundSourceFolder, "");
		subNamespace = subNamespace.Substring(0, subNamespace.IndexOf("\\"));

		var fileName = Path.GetFileName(file);
		List<FileData> files;

		if (nameSpaceAndFiles.ContainsKey(subNamespace))
		{
			files = nameSpaceAndFiles[subNamespace];
		}
		else
		{
			files = new List<FileData>();
			nameSpaceAndFiles.Add(subNamespace, files);
		}

		var fileNameAndData = new FileData
		{
			FileName = fileName.Replace($"{mediaTypeExtention}", "").ToLower(),
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
			var requirePath = $"{requireBasePath}{kvp.Key}/{value.FileName}.ogg";
			if (arrayFormat)
			{

				
				sb.AppendLine($"{fourSpaces}{fourSpaces} require(\"{requirePath}\").default,");
			}
			else
			{
//				var requirePath = $"{requireBasePath}{value.FileName}.ogg";
				sb.AppendLine($"{fourSpaces}{fourSpaces}{value.FileName}: require(\"{requirePath}\").default,");
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
	
class FileData
{
	public string FileName { get; set; }
	public string RequireStatement { get; set; }
}