<Query Kind="Program" />

/*
	This script will recurse though the Round42Sound folder and create a Sound.ts file.
	This file contains require statements that pull in the file data.
*/

void Main()
{
	const string mediaType = "ogg";
	var mediaTypeExtention = $".{mediaType}";
	var mediaFilter = $"*.{mediaType}";
	
	// Folder that contains the media files to be converted to require statements.
	var soundSourceFolder = @"D:\Reps\r42ts\Round42Sound\";
	
	// Base path for all require statements. This is relative to where the Sound.ts file will
	// be placed in the source code folder structure.
	var requireBasePath = @"../../Round42Sound/";
	
	// Folders that contain a 01.ABC file are converted to a TS array.
	var arrayIdentifier = $"01{mediaTypeExtention}";
	
	// I use 4 spaces to indent.
	const string fourSpaces = "    ";
	
	// Get all media files.
	var allMedia = Directory.GetFiles(soundSourceFolder, mediaFilter, SearchOption.AllDirectories);
	
	// Determine which folders contain 'arrays'. These are sounds that are number from 01 to NN.ogg. Usually
	// explosions or other sound files where a specific sound is needed depending on the amount of enemies
	// on screen or, for example, phasers and explosions where a random sound is picked and played.
	var asArray = Directory.GetFiles(soundSourceFolder, arrayIdentifier, SearchOption.AllDirectories)
		.Select(s => s.Replace(soundSourceFolder, ""))
		.Select(s => s.Replace($"\\{arrayIdentifier}", ""));
		
	
	var variableNamesAndFileNames = new Dictionary<string, List<string>>();
	
	// First we'll do a pass and create a dictionary which will contain the name of either an array or an object
	// which will contain the require statements to load the sound data.
	foreach (var file in allMedia)
	{
		var variableName = file.Replace(soundSourceFolder, "");
		variableName = variableName.Substring(0, variableName.IndexOf("\\"));

		var fileName = Path.GetFileName(file);
		List<string> files;

		// If the variable name exist, add it to the existing list
		if (variableNamesAndFileNames.ContainsKey(variableName))
		{
			files = variableNamesAndFileNames[variableName];
		}
		else
		{
			// New variable, new list.
			files = new List<string>();
			variableNamesAndFileNames.Add(variableName, files);
		}

		files.Add(fileName);
	}

	// Compose a header. A simple StringBuilder will do nicely to create our Sound.ts file.
	var sb = new StringBuilder();
	sb.AppendLine("/**");
	sb.AppendLine($" * @preserve Copyright 2019-{DateTime.Now.Year} Onno Invernizzi.");
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

	foreach (var kvp in variableNamesAndFileNames)
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
			var requirePath = $"{requireBasePath}{kvp.Key}/{value}";
			
			// Add the requirestatements and append with 'default'. This pull in the 'default' export
			// for each file. HowlerJS handles this nicely.
			if (arrayFormat)
			{
				sb.AppendLine($"{fourSpaces}{fourSpaces} require(\"{requirePath}\").default,");
			}
			else
			{
				var propertName = value.Replace(mediaTypeExtention, "");
				sb.AppendLine($"{fourSpaces}{fourSpaces}{propertName}: require(\"{requirePath}\").default,");
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