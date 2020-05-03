#version 410

struct Attenuation {
    float a;
    float b;
};

struct PointLight {
    vec3 color;
    float intensity;
    vec4 position;
    Attenuation att;
};

struct AmbientLight {
    vec3 color;
    float intensity;
};

in float particleDensity ;
in vec3 velocity_;
in vec3 posWorld;
in vec3 posEye; // position of center in eye space

out vec4 color;

uniform float pointRadius;  // point size in world space
uniform PointLight pointLight;
uniform AmbientLight ambLight;

/****************  ADDED new args ***************/
//reflection
vec3 reflection;
vec3 incident;
vec4 reflectionColor;
uniform samplerCube u_cubemap;

//Indices of refraction
vec3 refraction;
float fresnel;
vec4 refractionColor;
const float Air = 1.0;
const float Glass = 1.51714;
const float Eta = Air / Glass;
// see http://en.wikipedia.org/wiki/Refractive_index Reflectivity
const float R0 = ((Air - Glass) * (Air - Glass)) / ((Air + Glass) * (Air + Glass));

vec4 fragColor;
/****************  END  ***************/


void main() {
    const float shininess = 40.0;

    // calculate normal from texture coordinates
    vec3 n;
    n.xy = gl_PointCoord * vec2(2.0, -2.0) + vec2(-1.0, 1.0);
    float mag = dot(n.xy, n.xy);
    if (mag > 1.0) discard;   // kill pixels outside circle
    n.z = sqrt(1.0-mag);

    // point on surface of sphere in eye space
    vec3 spherePosEye = posEye + n*pointRadius;

    // calculate lighting
    vec3 lightDir = normalize(vec3(0.0f, 2.0f, 2.0f) - posWorld);
    
    
    // directionalLighting

    float diffuse = max(0.0, dot(lightDir, n));
    vec3 v = normalize(-spherePosEye);
    vec3 h = normalize(lightDir + v);
    float specular = pow(max(0.0, dot(n, h)), shininess);

    float dens = particleDensity/15000;

    vec3 tempColor = diffuse * vec3(0.0, 0.5, 1.0);
    
    /****************  ADDED  ***************/
    incident = normalize(spherePosEye - posEye);
    //reflection
    reflection = reflect(incident, n);
    reflectionColor = texture(u_cubemap, normalize(reflection));
    
    //refraction
    refraction = refract(incident, n, Eta);
    // see http://en.wikipedia.org/wiki/Schlick%27s_approximation
    fresnel = R0 + (1.0 - R0) * pow((1.0 - dot(-incident, n)), 5.0);
    refractionColor = texture(u_cubemap, normalize(refraction));
    fragColor = mix(refractionColor, reflectionColor, fresnel);
    tempColor += vec3(fragColor);
    /****************  END ***************/

    
    color = vec4(dens * tempColor + 0.1f, 0.1);
}
