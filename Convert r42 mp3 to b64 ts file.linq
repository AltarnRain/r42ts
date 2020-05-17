<Query Kind="Program" />

void Main()
{

	const string fourSpaces = "    ";
	var sourceFolder = @"D:Reps\r42ts\Round42Sound\";
	var allMP3 = Directory.GetFiles(sourceFolder, "*.mp3", SearchOption.AllDirectories);

	var nameSpaceAndFiles = new Dictionary<string, List<FileNameAndData>>();
	foreach (var file in allMP3)
	{
		var subNamespace = file.Replace(sourceFolder, "");
		subNamespace = subNamespace.Substring(0, subNamespace.IndexOf("\\"));

		var fileName = Path.GetFileName(file);
		List<FileNameAndData> files;

		if (nameSpaceAndFiles.ContainsKey(subNamespace))
		{
			files = nameSpaceAndFiles[subNamespace];
		}
		else
		{
			files = new List<FileNameAndData>();
			nameSpaceAndFiles.Add(subNamespace, files);
		}

		var fileData = File.ReadAllBytes(file);

		var fileNameAndData = new FileNameAndData
		{
			FileName = fileName.Replace(".mp3", "").ToLower(),
			data = Convert.ToBase64String(fileData),
		};

		files.Add(fileNameAndData);
	}

	var asArray = new string[] { "Wizzing", "Whoping", "Tjirping", "Explosions" };

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
			var data = value.data;
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

class FileNameAndData
{
	public string FileName { get; set; }
	public string data { get; set; }
}

