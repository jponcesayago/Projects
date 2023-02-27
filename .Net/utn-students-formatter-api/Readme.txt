
Project information and guidelines

*Configure Docker for Linux Target

In Startup:
	
	*Set Configuration Interface

	public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
	
	*Set Json Config with NewtonSoft

	Install nuget package "Newtonsoft.Json" and "Microsoft.AspNetCore.Mvc.Newtonsoft"
	
	In Configure Services add:

		services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

	*Configure Cors

	//Cors
            services.AddCors(options => options.AddPolicy("AllowWebapp",
                builder => builder.AllowAnyOrigin()
                                  .AllowAnyHeader()
                                  .AllowAnyMethod()));
	
	app.UseCors("AllowWebapp");