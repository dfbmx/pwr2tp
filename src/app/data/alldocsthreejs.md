[page:KeyframeTrack] →
[name]
A Track of quaternion keyframe values.
Constructor
[name]( [param:String name], [param:Array times], [param:Array values] )
[page:String name] (required) identifier for the KeyframeTrack.
[page:Array times] (required) array of keyframe times.
[page:Array values] values for the keyframes at the times specified, a
flat array of quaternion components.
[page:Constant interpolation] the type of interpolation to use. See
[page:Animation Animation Constants] for possible values. Default is
[page:Animation InterpolateLinear].
Properties
See [page:KeyframeTrack] for inherited properties.
[property:Constant DefaultInterpolation]
The default interpolation type to use, [page:Animation InterpolateLinear].
[property:String ValueTypeName]
String 'quaternion'.
Methods
See [page:KeyframeTrack] for inherited methods.
[method:QuaternionLinearInterpolant InterpolantFactoryMethodLinear]()
Returns a new [page:QuaternionLinearInterpolant QuaternionLinearInterpolant] based on the [page:KeyframeTrack.values values], [page:KeyframeTrack.times times] and
[page:KeyframeTrack.valueSize valueSize] of the keyframes.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Overview
Within the three.js animation system you can animate various properties of your models:
the bones of a [page:SkinnedMesh skinned and rigged model], morph targets, different material properties
(colors, opacity, booleans), visibility and transforms. The animated properties can be faded in,
faded out, crossfaded and warped. The weight and time scales of different simultaneous
animations on the same object as well as on different objects can be changed
independently. Various animations on the same and on different objects can be
synchronized.
To achieve all this in one homogeneous system, the three.js animation system
[link:https://github.com/mrdoob/three.js/issues/6881 has completely changed in 2015]
(beware of outdated information!), and it has now an architecture similar to
Unity/Unreal Engine 4. This page gives a short overview of the main components of the
system and how they work together.
Animation Clips
If you have successfully imported an animated 3D object (it doesn't matter if it has
bones or morph targets or both) — for example exporting it from Blender with the
[link:https://github.com/KhronosGroup/glTF-Blender-IO glTF Blender exporter] and
loading it into a three.js scene using [page:GLTFLoader] — one of the response fields
should be an array named "animations", containing the [page:AnimationClip AnimationClips]
for this model (see a list of possible loaders below).
Each `AnimationClip` usually holds the data for a certain activity of the object. If the
mesh is a character, for example, there may be one AnimationClip for a walkcycle, a second
for a jump, a third for sidestepping and so on.
Keyframe Tracks
Inside of such an `AnimationClip` the data for each animated property are stored in a
separate [page:KeyframeTrack]. Assuming a character object has a [page:Skeleton skeleton],
one keyframe track could store the data for the position changes of the lower arm bone
over time, a different track the data for the rotation changes of the same bone, a third
the track position, rotation or scaling of another bone, and so on. It should be clear,
that an AnimationClip can be composed of lots of such tracks.
Assuming the model has morph targets (for example one morph
target showing a friendly face and another showing an angry face), each track holds the
information as to how the [page:Mesh.morphTargetInfluences influence] of a certain morph
target changes during the performance of the clip.
Animation Mixer
The stored data forms only the basis for the animations - actual playback is controlled by
the [page:AnimationMixer]. You can imagine this not only as a player for animations, but
as a simulation of a hardware like a real mixer console, which can control several animations
simultaneously, blending and merging them.
Animation Actions
The `AnimationMixer` itself has only very few (general) properties and methods, because it
can be controlled by the [page:AnimationAction AnimationActions]. By configuring an
`AnimationAction` you can determine when a certain `AnimationClip` shall be played, paused
or stopped on one of the mixers, if and how often the clip has to be repeated, whether it
shall be performed with a fade or a time scaling, and some additional things, such crossfading
or synchronizing.
Animation Object Groups
If you want a group of objects to receive a shared animation state, you can use an
[page:AnimationObjectGroup].
Supported Formats and Loaders
Note that not all model formats include animation (OBJ notably does not), and that only some
three.js loaders support [page:AnimationClip AnimationClip] sequences. Several that
do
support this animation type:
[page:ObjectLoader THREE.ObjectLoader]
THREE.BVHLoader
THREE.ColladaLoader
THREE.FBXLoader
[page:GLTFLoader THREE.GLTFLoader]
THREE.MMDLoader
Note that 3ds max and Maya currently can't export multiple animations (meaning animations which are not
on the same timeline) directly to a single file.
Example
let mesh;
// Create an AnimationMixer, and get the list of AnimationClip instances
const mixer = new THREE.AnimationMixer( mesh );
const clips = mesh.animations;
// Update the mixer on each frame
function update () {
mixer.update( deltaSeconds );
}
// Play a specific animation
const clip = THREE.AnimationClip.findByName( clips, 'dance' );
const action = mixer.clipAction( clip );
action.play();
// Play all animations
clips.forEach( function ( clip ) {
mixer.clipAction( clip ).play();
} );

[name]
Uniforms are global GLSL variables. They are passed to shader programs.
Code Example
When declaring a uniform of a [page:ShaderMaterial], it is declared by
value or by object.
uniforms: {
time: { value: 1.0 },
resolution: new Uniform( new Vector2() )
};
Uniform types
Each uniform must have a `value` property. The type of the value must
correspond to the type of the uniform variable in the GLSL code as
specified for the primitive GLSL types in the table below. Uniform
structures and arrays are also supported. GLSL arrays of primitive type
must either be specified as an array of the corresponding THREE objects or
as a flat array containing the data of all the objects. In other words;
GLSL primitives in arrays must not be represented by arrays. This rule
does not apply transitively. An array of `vec2` arrays, each with a length
of five vectors, must be an array of arrays, of either five [page:Vector2]
objects or ten `number`s.
Uniform types
GLSL type
JavaScript type
int
[page:Number]
uint
[page:Number]
float
[page:Number]
bool
[page:Boolean]
bool
[page:Number]
vec2
[page:Vector2 THREE.Vector2]
vec2
[page:Float32Array Float32Array] (*)
vec2
[page:Array Array] (*)
vec3
[page:Vector3 THREE.Vector3]
vec3
[page:Color THREE.Color]
vec3
[page:Float32Array Float32Array] (*)
vec3
[page:Array Array] (*)
vec4
[page:Vector4 THREE.Vector4]
vec4
[page:Quaternion THREE.Quaternion]
vec4
[page:Float32Array Float32Array] (*)
vec4
[page:Array Array] (*)
mat2
[page:Float32Array Float32Array] (*)
mat2
[page:Array Array] (*)
mat3
[page:Matrix3 THREE.Matrix3]
mat3
[page:Float32Array Float32Array] (*)
mat3
[page:Array Array] (*)
mat4
[page:Matrix4 THREE.Matrix4]
mat4
[page:Float32Array Float32Array] (*)
mat4
[page:Array Array] (*)
ivec2, bvec2
[page:Float32Array Float32Array] (*)
ivec2, bvec2
[page:Array Array] (*)
ivec3, bvec3
[page:Int32Array Int32Array] (*)
ivec3, bvec3
[page:Array Array] (*)
ivec4, bvec4
[page:Int32Array Int32Array] (*)
ivec4, bvec4
[page:Array Array] (*)
sampler2D
[page:Texture THREE.Texture]
samplerCube
[page:CubeTexture THREE.CubeTexture]
(*) Same for an (innermost) array (dimension) of the same GLSL type,
containing the components of all vectors or matrices in the array.
Structured Uniforms
Sometimes you want to organize uniforms as `structs` in your shader code.
The following style must be used so `three.js` is able to process
structured uniform data.
uniforms = {
data: {
value: {
position: new Vector3(),
direction: new Vector3( 0, 0, 1 )
}
}
};
This definition can be mapped on the following GLSL code:
struct Data {
vec3 position;
vec3 direction;
};
uniform Data data;
Structured Uniforms with Arrays
It's also possible to manage `structs` in arrays. The syntax for this use
case looks like so:
const entry1 = {
position: new Vector3(),
direction: new Vector3( 0, 0, 1 )
};
const entry2 = {
position: new Vector3( 1, 1, 1 ),
direction: new Vector3( 0, 1, 0 )
};
uniforms = {
data: {
value: [ entry1, entry2 ]
}
};
This definition can be mapped on the following GLSL code:
struct Data {
vec3 position;
vec3 direction;
};
uniform Data data[ 2 ];
Constructor
[name]( [param:Object value] )
value -- An object containing the value to set up the uniform. It's type
must be one of the Uniform Types described above.
Properties
[property:Object value]
Current value of the uniform.
Methods
[method:Uniform clone]()
Returns a clone of this uniform.
If the uniform's value property is an [page:Object] with a clone() method,
this is used, otherwise the value is copied by assignment. Array values
are shared between cloned [page:Uniform]s.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Class representing a 2D [link:https://en.wikipedia.org/wiki/Vector_space vector].
A 2D vector is an ordered pair of numbers (labeled x and y),
which can be used to represent a number of things, such as:
A point in 2D space (i.e. a position on a plane).
A direction and length across a plane. In three.js the length will
always be the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean distance]
(straight-line distance) from `(0, 0)` to `(x, y)`
and the direction is also measured from `(0, 0)` towards `(x, y)`.
Any arbitrary ordered pair of numbers.
There are other things a 2D vector can be used to represent, such as
momentum vectors, complex numbers and so on, however these are the most
common uses in three.js.
Iterating through a [name] instance will yield its components `(x, y)` in
the corresponding order.
Code Example
const a = new THREE.Vector2( 0, 1 );
//no arguments; will be initialised to (0, 0)
const b = new THREE.Vector2( );
const d = a.distanceTo( b );
Constructor
[name]( [param:Float x], [param:Float y] )
[page:Float x] - the x value of this vector. Default is `0`.
[page:Float y] - the y value of this vector. Default is `0`.
Creates a new [name].
Properties
[property:Float height]
Alias for [page:.y y].
[property:Boolean isVector2]
Read-only flag to check if a given object is of type [name].
[property:Float width]
Alias for [page:.x x].
[property:Float x]
[property:Float y]
Methods
[method:this add]( [param:Vector2 v] )
Adds [page:Vector2 v] to this vector.
[method:this addScalar]( [param:Float s] )
Adds the scalar value [page:Float s] to this vector's [page:.x x] and
[page:.y y] values.
[method:this addScaledVector]( [param:Vector2 v], [param:Float s] )
Adds the multiple of [page:Vector2 v] and [page:Float s] to this vector.
[method:this addVectors]( [param:Vector2 a], [param:Vector2 b] )
Sets this vector to [page:Vector2 a] + [page:Vector2 b].
[method:Float angle]()
Computes the angle in radians of this vector with respect to the positive
x-axis.
[method:Float angleTo]( [param:Vector2 v] )
Returns the angle between this vector and vector [page:Vector2 v] in
radians.
[method:this applyMatrix3]( [param:Matrix3 m] )
Multiplies this vector (with an implicit 1 as the 3rd component) by m.
[method:this ceil]()
The [page:.x x] and [page:.y y] components of this vector are rounded up
to the nearest integer value.
[method:this clamp]( [param:Vector2 min], [param:Vector2 max] )
[page:Vector2 min] - the minimum x and y values.
[page:Vector2 max] - the maximum x and y values in the desired range
If this vector's x or y value is greater than the max vector's x or y
value, it is replaced by the corresponding value.
If this vector's x or y value is less than the min vector's x or y value,
it is replaced by the corresponding value.
[method:this clampLength]( [param:Float min], [param:Float max] )
[page:Float min] - the minimum value the length will be clamped to
[page:Float max] - the maximum value the length will be clamped to
If this vector's length is greater than the max value, it is replaced by
the max value.
If this vector's length is less than the min value, it is replaced by the
min value.
[method:this clampScalar]( [param:Float min], [param:Float max] )
[page:Float min] - the minimum value the components will be clamped to
[page:Float max] - the maximum value the components will be clamped to
If this vector's x or y values are greater than the max value, they are
replaced by the max value.
If this vector's x or y values are less than the min value, they are
replaced by the min value.
[method:Vector2 clone]()
Returns a new Vector2 with the same [page:.x x] and [page:.y y] values as
this one.
[method:this copy]( [param:Vector2 v] )
Copies the values of the passed Vector2's [page:.x x] and [page:.y y]
properties to this Vector2.
[method:Float distanceTo]( [param:Vector2 v] )
Computes the distance from this vector to [page:Vector2 v].
[method:Float manhattanDistanceTo]( [param:Vector2 v] )
Computes the [link:https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan distance]
from this vector to [page:Vector2 v].
[method:Float distanceToSquared]( [param:Vector2 v] )
Computes the squared distance from this vector to [page:Vector2 v]. If you
are just comparing the distance with another distance, you should compare
the distance squared instead as it is slightly more efficient to
calculate.
[method:this divide]( [param:Vector2 v] )
Divides this vector by [page:Vector2 v].
[method:this divideScalar]( [param:Float s] )
Divides this vector by scalar [page:Float s].
[method:Float dot]( [param:Vector2 v] )
Calculates the [link:https://en.wikipedia.org/wiki/Dot_product dot product]
of this vector and [page:Vector2 v].
[method:Float cross]( [param:Vector2 v] )
Calculates the [link:https://en.wikipedia.org/wiki/Cross_product cross product]
of this vector and [page:Vector2 v]. Note that a 'cross-product'
in 2D is not well-defined. This function computes a geometric
cross-product often used in 2D graphics
[method:Boolean equals]( [param:Vector2 v] )
Returns `true` if the components of this vector and [page:Vector2 v] are
strictly equal; `false` otherwise.
[method:this floor]()
The components of this vector are rounded down to the nearest integer
value.
[method:this fromArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - the source array.
[page:Integer offset] - (optional) offset into the array. Default is `0`.
Sets this vector's [page:.x x] value to be `array[ offset ]` and [page:.y y]
value to be `array[ offset + 1 ]`.
[method:this fromBufferAttribute]( [param:BufferAttribute attribute], [param:Integer index] )
[page:BufferAttribute attribute] - the source attribute.
[page:Integer index] - index in the attribute.
Sets this vector's [page:.x x] and [page:.y y] values from the
[page:BufferAttribute attribute].
[method:Float getComponent]( [param:Integer index] )
[page:Integer index] - `0` or `1`.
If index equals `0` returns the [page:.x x] value.
If index equals `1` returns the [page:.y y] value.
[method:Float length]()
Computes the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) from (0, 0) to (x, y).
[method:Float manhattanLength]()
Computes the [link:http://en.wikipedia.org/wiki/Taxicab_geometry Manhattan length] of this vector.
[method:Float lengthSq]()
Computes the square of the
[link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) from (0, 0) to (x, y). If you are comparing the
lengths of vectors, you should compare the length squared instead as it is
slightly more efficient to calculate.
[method:this lerp]( [param:Vector2 v], [param:Float alpha] )
[page:Vector2 v] - [page:Vector2] to interpolate towards.
[page:Float alpha] - interpolation factor, typically in the closed
interval `[0, 1]`.
Linearly interpolates between this vector and [page:Vector2 v], where
alpha is the percent distance along the line - alpha = 0 will be this
vector, and alpha = 1 will be [page:Vector2 v].
[method:this lerpVectors]( [param:Vector2 v1], [param:Vector2 v2], [param:Float alpha] )
[page:Vector2 v1] - the starting [page:Vector2].
[page:Vector2 v2] - [page:Vector2] to interpolate towards.
[page:Float alpha] - interpolation factor, typically in the closed
interval `[0, 1]`.
Sets this vector to be the vector linearly interpolated between
[page:Vector2 v1] and [page:Vector2 v2] where alpha is the percent
distance along the line connecting the two vectors - alpha = 0 will be
[page:Vector2 v1], and alpha = 1 will be [page:Vector2 v2].
[method:this negate]()
Inverts this vector - i.e. sets x = -x and y = -y.
[method:this normalize]()
Converts this vector to a [link:https://en.wikipedia.org/wiki/Unit_vector unit vector] -
that is, sets it equal to a vector with the same direction
as this one, but [page:.length length] 1.
[method:this max]( [param:Vector2 v] )
If this vector's x or y value is less than [page:Vector2 v]'s x or y
value, replace that value with the corresponding max value.
[method:this min]( [param:Vector2 v] )
If this vector's x or y value is greater than [page:Vector2 v]'s x or y
value, replace that value with the corresponding min value.
[method:this multiply]( [param:Vector2 v] )
Multiplies this vector by [page:Vector2 v].
[method:this multiplyScalar]( [param:Float s] )
Multiplies this vector by scalar [page:Float s].
[method:this rotateAround]( [param:Vector2 center], [param:Float angle] )
[page:Vector2 center] - the point around which to rotate.
[page:Float angle] - the angle to rotate, in radians.
Rotates this vector around [page:Vector2 center] by [page:Float angle]
radians.
[method:this round]()
The components of this vector are rounded to the nearest integer value.
[method:this roundToZero]()
The components of this vector are rounded towards zero (up if negative,
down if positive) to an integer value.
[method:this set]( [param:Float x], [param:Float y] )
Sets the [page:.x x] and [page:.y y] components of this vector.
[method:this setComponent]( [param:Integer index], [param:Float value] )
[page:Integer index] - `0` or `1`.
[page:Float value] - [page:Float]
If index equals `0` set [page:.x x] to [page:Float value].
If index equals `1` set [page:.y y] to [page:Float value]
[method:this setLength]( [param:Float l] )
Sets this vector to a vector with the same direction as this one, but
[page:.length length] [page:Float l].
[method:this setScalar]( [param:Float scalar] )
Sets the [page:.x x] and [page:.y y] values of this vector both equal to
[page:Float scalar].
[method:this setX]( [param:Float x] )
Replaces this vector's [page:.x x] value with [page:Float x].
[method:this setY]( [param:Float y] )
Replaces this vector's [page:.y y] value with [page:Float y].
[method:this sub]( [param:Vector2 v] )
Subtracts [page:Vector2 v] from this vector.
[method:this subScalar]( [param:Float s] )
Subtracts [page:Float s] from this vector's [page:.x x] and [page:.y y]
components.
[method:this subVectors]( [param:Vector2 a], [param:Vector2 b] )
Sets this vector to [page:Vector2 a] - [page:Vector2 b].
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - (optional) array to store this vector to. If this is
not provided, a new array will be created.
[page:Integer offset] - (optional) optional offset into the array.
Returns an array [x, y], or copies x and y into the provided [page:Array array].
[method:this random]()
Sets each component of this vector to a pseudo-random value between `0` and
`1`, excluding `1`.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:WebGLRenderTarget] →
[name]
Used by the [page:CubeCamera] as its [page:WebGLRenderTarget].
Examples
See [page:CubeCamera] for examples.
Constructor
[name]([param:Number size], [param:Object options])
[page:Float size] - the size, in pixels. Default is `1`.
options - (optional) object that holds texture parameters for an
auto-generated target texture and depthBuffer/stencilBuffer booleans. For
an explanation of the texture parameters see [page:Texture Texture]. The
following are valid options:
[page:Constant wrapS] - default is [page:Textures ClampToEdgeWrapping].
[page:Constant wrapT] - default is [page:Textures ClampToEdgeWrapping].
[page:Constant magFilter] - default is [page:Textures .LinearFilter].
[page:Constant minFilter] - default is [page:Textures LinearFilter].
[page:Boolean generateMipmaps] - default is `false`.
[page:Constant format] - default is [page:Textures RGBAFormat].
[page:Constant type] - default is [page:Textures UnsignedByteType].
[page:Number anisotropy] - default is `1`. See
[page:Texture.anisotropy]
[page:Constant colorSpace] - default is [page:Textures NoColorSpace].
[page:Boolean depthBuffer] - default is `true`.
[page:Boolean stencilBuffer] - default is `false`.
Creates a new [name]
Properties
See [page:WebGLRenderTarget] for inherited properties.
Methods
See [page:WebGLRenderTarget] for inherited methods.
[method:this fromEquirectangularTexture]( [param:WebGLRenderer renderer], [param:Texture texture] )
[page:WebGLRenderer renderer] — the renderer.
[page:Texture texture] — the equirectangular texture.
Use this method if you want to convert an equirectangular panorama to the
cubemap format.
[method:undefined clear]( [param:WebGLRenderer renderer], [param:Boolean color],
[param:Boolean depth], [param:Boolean stencil] )
Call this to clear the renderTarget's color, depth, and/or stencil
buffers. The color buffer is set to the renderer's current clear color.
Arguments default to `true`.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] → [page:PolyhedronGeometry] →
[name]
A class for generating an octahedron geometry.
Constructor
[name]([param:Float radius], [param:Integer detail])
radius — Radius of the octahedron. Default is `1`.
detail — Default is `0`. Setting this to a value greater than zero add
vertices making it no longer an octahedron.
Properties
See the base [page:PolyhedronGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:PolyhedronGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
The GridHelper is an object to define grids. Grids are two-dimensional
arrays of lines.
Code Example
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
Examples
[example:webgl_helpers WebGL / helpers]
Constructor
[name]( [param:number size], [param:Number divisions], [param:Color colorCenterLine], [param:Color colorGrid] )
size -- The size of the grid. Default is `10`.
divisions -- The number of divisions across the grid. Default is `10`.
colorCenterLine -- The color of the centerline. This can be a
[page:Color], a hexadecimal value and an CSS-Color name. Default is
0x444444
colorGrid -- The color of the lines of the grid. This can be a
[page:Color], a hexadecimal value and an CSS-Color name. Default is
0x888888
Creates a new [name] of size 'size' and divided into 'divisions' segments
per side. Colors are optional.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
This helps with visualizing what a camera contains in its frustum. It
visualizes the frustum of a camera using a [page:LineSegments].
[name] must be a child of the scene.
Code Example
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const helper = new THREE.CameraHelper( camera );
scene.add( helper );
Examples
[example:webgl_camera WebGL / camera]
[example:webgl_geometry_extrude_splines WebGL / extrude / splines]
Constructor
[name]( [param:Camera camera] )
[page:Camera camera] -- The camera to visualize.
This create a new [Name] for the specified camera.
Properties
See the base [page:LineSegments] class for common properties.
[property:Camera camera]
The camera being visualized.
[property:Object pointMap]
This contains the points used to visualize the camera.
[property:Object matrix]
Reference to the [page:Object3D.matrixWorld camera.matrixWorld].
[property:Object matrixAutoUpdate]
See [page:Object3D.matrixAutoUpdate]. Set to `false` here as the helper is
using the camera's [page:Object3D.matrixWorld matrixWorld].
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:this setColors]( [param:Color frustum], [param:Color cone], [param:Color up], [param:Color target], [param:Color cross] )
Defines the colors of the helper.
[method:undefined update]()
Updates the helper based on the projectionMatrix of the camera.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A solver for IK with
`CCD Algorithm`
.
[name] solves Inverse Kinematics Problem with CCD Algorithm.
[name] is designed to work with [page:SkinnedMesh] but also can be used with [page:MMDLoader] or [page:GLTFLoader] skeleton.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { CCDIKSolver } from 'three/addons/animation/CCDIKSolver.js';
Code Example
let ikSolver;
//
// Bones hierarchy:
//
//
root
//
├── bone0
//
│
└── bone1
//
│
└── bone2
//
│
└── bone3
//
└── target
//
// Positioned as follow on the cylinder:
//
//
o
<- target
(y =
20)
//
//
+----o----+ <- bone3
(y =
12)
//
|
|
//
|
o
| <- bone2
(y =
4)
//
|
|
//
|
o
| <- bone1
(y =
-4)
//
|
|
//
+----oo---+ <- root, bone0 (y = -12)
//
let bones = []
// "root"
let rootBone = new Bone();
rootBone.position.y = -12;
bones.push( rootBone );
// "bone0"
let prevBone = new Bone();
prevBone.position.y = 0;
rootBone.add( prevBone );
bones.push( prevBone );
// "bone1", "bone2", "bone3"
for ( let i = 1; i <= 3; i ++ ) {
const bone = new Bone();
bone.position.y = 8;
bones.push( bone );
prevBone.add( bone );
prevBone = bone;
}
// "target"
const targetBone = new Bone();
targetBone.position.y = 24 + 8
rootBone.add( targetBone );
bones.push( targetBone );
//
// skinned mesh
//
const mesh = new SkinnedMesh( geometry,	material );
const skeleton = new Skeleton( bones );
mesh.add( bones[ 0 ] ); // "root" bone
mesh.bind( skeleton );
//
// ikSolver
//
const iks = [
{
target: 5, // "target"
effector: 4, // "bone3"
links: [ { index: 3 }, { index: 2 }, { index: 1 } ] // "bone2", "bone1", "bone0"
}
];
ikSolver = new CCDIKSolver( mesh, iks );
function render() {
ikSolver?.update();
renderer.render( scene, camera );
}
Examples
[example:webgl_animation_skinning_ik]
[example:webgl_loader_mmd]
[example:webgl_loader_mmd_pose]
[example:webgl_loader_mmd_audio]
Constructor
[name]( [param:SkinnedMesh mesh], [param:Array iks] )
[page:SkinnedMesh mesh] — [page:SkinnedMesh] for which [name] solves IK problem.
[page:Array iks] — An array of [page:Object] specifying IK parameter. target, effector, and link-index are index integers in .skeleton.bones.
The bones relation should be "links[ n ], links[ n - 1 ], ..., links[ 0 ], effector" in order from parent to child.
[page:Integer target] — Target bone.
[page:Integer effector] — Effector bone.
[page:Array links] — An array of [page:Object] specifying link bones.
[page:Integer index] — Link bone.
[page:Vector3 limitation] — (optional) Rotation axis. Default is undefined.
[page:Vector3 rotationMin] — (optional) Rotation minimum limit. Default is undefined.
[page:Vector3 rotationMax] — (optional) Rotation maximum limit. Default is undefined.
[page:Boolean enabled] — (optional) Default is true.
[page:Integer iteration] — (optional) Iteration number of calculation. Smaller is faster but less precise. Default is 1.
[page:Number minAngle] — (optional) Minimum rotation angle in a step. Default is undefined.
[page:Number maxAngle] — (optional) Maximum rotation angle in a step. Default is undefined.
Creates a new [name].
Properties
[property:Array iks]
An array of IK parameter passed to the constructor.
[property:SkinnedMesh mesh]
[page:SkinnedMesh] passed to the constructor.
Methods
[method:CCDIKHelper createHelper]()
Return [page:CCDIKHelper]. You can visualize IK bones by adding the helper to scene.
[method:this update]()
Update IK bones quaternion by solving CCD algorithm.
[method:this updateOne]( [param:Object ikParam] )
Update an IK bone quaternion by solving CCD algorithm.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/animation/CCDIKSolver.js examples/jsm/animation/CCDIKSolver.js]

Core Constants
Revision Number
THREE.REVISION
The current three.js [link:https://github.com/mrdoob/three.js/releases revision number].
Color Spaces
THREE.NoColorSpace = ""
THREE.SRGBColorSpace = "srgb"
THREE.LinearSRGBColorSpace = "srgb-linear"
[page:NoColorSpace] defines no specific color space. It is commonly used
for textures including normal maps, roughness maps, metalness maps,
ambient occlusion maps, and other non-color data.
[page:SRGBColorSpace] (“srgb”) refers to the color space defined by the
Rec. 709 primaries, D65 white point, and nonlinear sRGB transfer
functions. sRGB is the default color space in CSS, and is often found in
color palettes and color pickers. Colors expressed in hexadecimal or CSS
notation are typically in the sRGB color space.
[page:LinearSRGBColorSpace] (“srgb-linear”) refers to the sRGB color space
(above) with linear transfer functions. Linear-sRGB is the working color
space in three.js, used throughout most of the rendering process. RGB
components found in three.js materials and shaders are in the Linear-sRGB
color space.
For further background and usage, see
Color management
.
Mouse Buttons
THREE.MOUSE.LEFT
THREE.MOUSE.MIDDLE
THREE.MOUSE.RIGHT
THREE.MOUSE.ROTATE
THREE.MOUSE.DOLLY
THREE.MOUSE.PAN
The constants LEFT and ROTATE have the same underlying value. The
constants MIDDLE and DOLLY have the same underlying value. The constants
RIGHT and PAN have the same underlying value.
Touch Actions
THREE.TOUCH.ROTATE THREE.TOUCH.PAN THREE.TOUCH.DOLLY_PAN
THREE.TOUCH.DOLLY_ROTATE
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/constants.js src/constants.js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
Visualizes an object's vertex tangents.
Requires that tangents have been specified in a [page:BufferAttribute custom attribute] or
have been calculated using [page:BufferGeometry.computeTangents computeTangents].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { VertexTangentsHelper } from 'three/addons/helpers/VertexTangentsHelper.js';
Code Example
const geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh( geometry, material );
const helper = new VertexTangentsHelper( mesh, 1, 0x00ffff );
scene.add( mesh );
scene.add( helper );
Examples
[example:webgl_helpers WebGL / helpers]
Constructor
[name]( [param:Object3D object], [param:Number size], [param:Hex color] )
[page:Object3D object] -- object for which to render vertex tangents.
[page:Number size] -- (optional) length of the arrows. Default is *1*.
[page:Hex color] -- (optional) hex color of the arrows. Default is *0x00ffff*.
Properties
See the base [page:LineSegments] class for common properties.
[property:Object matrixAutoUpdate]
See [page:Object3D.matrixAutoUpdate]. Set to `false` here as the helper is using the
object's [page:Object3D.matrixWorld matrixWorld].
[property:Object3D object]
The object for which the vertex tangents are being visualized.
[property:Number size]
Length of the arrows. Default is *1*.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined update]()
Updates the vertex tangents preview based on the object's world transform.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/VertexTangentsHelper.js examples/jsm/helpers/VertexTangentsHelper.js]

[page:Object3D] →
[name]
This displays a cone shaped helper object for a [page:SpotLight].
Code Example
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 10, 10, 10 );
scene.add( spotLight );
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );
Examples
[example:webgl_lights_spotlights WebGL/ lights / spotlights ]
Constructor
[name]( [param:SpotLight light], [param:Hex color] )
[page:SpotLight light] -- The [page:SpotLight] to be visualized.
[page:Hex color] -- (optional) if this is not the set the helper will take
the color of the light.
Properties
See the base [page:Object3D] class for common properties.
[property:LineSegments cone]
[page:LineSegments] used to visualize the light.
[property:SpotLight light]
Reference to the [page:SpotLight] being visualized.
[property:Object matrix]
Reference to the spotLight's [page:Object3D.matrixWorld matrixWorld].
[property:Object matrixAutoUpdate]
See [page:Object3D.matrixAutoUpdate]. Set to `false` here as the helper is
using the spotLight's [page:Object3D.matrixWorld matrixWorld].
[property:hex color]
The color parameter passed in the constructor. Default is `undefined`. If
this is changed, the helper's color will update the next time
[page:.update update] is called.
Methods
See the base [page:Object3D] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:undefined update]()
Updates the light helper.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
This is almost identical to an [page:Object3D Object3D]. Its purpose is to
make working with groups of objects syntactically clearer.
Code Example
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cubeA = new THREE.Mesh( geometry, material );
cubeA.position.set( 100, 100, 0 );
const cubeB = new THREE.Mesh( geometry, material );
cubeB.position.set( -100, -100, 0 );
//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();
group.add( cubeA );
group.add( cubeB );
scene.add( group );
Constructor
[name]( )
Properties
See the base [page:Object3D] class for common properties.
[property:Boolean isGroup]
Read-only flag to check if a given object is of type [name].
[property:String type]
A string 'Group'. This should not be changed.
Methods
See the base [page:Object3D] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] →
[name]
Create a smooth 2d
quadratic bezier curve
, defined by a startpoint, endpoint and a single control point.
Code Example
const curve = new THREE.QuadraticBezierCurve(
new THREE.Vector2( -10, 0 ),
new THREE.Vector2( 20, 15 ),
new THREE.Vector2( 10, 0 )
);
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
Constructor
[name]( [param:Vector2 v0], [param:Vector2 v1], [param:Vector2 v2] )
[page:Vector2 v0] – The startpoint.
[page:Vector2 v1] – The control point.
[page:Vector2 v2] – The endpoint.
Properties
See the base [page:Curve] class for common properties.
[property:Vector2 v0]
The startpoint.
[property:Vector2 v1]
The control point.
[property:Vector2 v2]
The endpoint.
Methods
See the base [page:Curve] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
Creates meshes with axial symmetry like vases. The lathe rotates around
the Y axis.
Code Example
const points = [];
for ( let i = 0; i < 10; i ++ ) {
points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const geometry = new THREE.LatheGeometry( points );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const lathe = new THREE.Mesh( geometry, material );
scene.add( lathe );
Constructor
[name]([param:Array points], [param:Integer segments], [param:Float
phiStart], [param:Float phiLength])
points — Array of Vector2s. The x-coordinate of each point must be greater
than zero. Default is an array with (0,-0.5), (0.5,0) and (0,0.5) which
creates a simple diamond shape.
segments — the number of circumference segments to generate. Default is
12.
phiStart — the starting angle in radians. Default is `0`.
phiLength — the radian (0 to 2PI) range of the lathed section 2PI is a
closed lathe, less than 2PI is a portion. Default is 2PI.
This creates a [name] based on the parameters.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Serves as a base class for the other shadow classes.
Constructor
[name]( [param:Camera camera] )
[page:Camera camera] - the light's view of the world.
Create a new [name]. This is not intended to be called directly - it is
used as a base class by other light shadows.
Properties
[property:Boolean autoUpdate]
Enables automatic updates of the light's shadow. Default is `true`. If you
do not require dynamic lighting / shadows, you may set this to `false`.
[property:Camera camera]
The light's view of the world. This is used to generate a depth map of the
scene; objects behind other objects from the light's perspective will be
in shadow.
[property:Float bias]
Shadow map bias, how much to add or subtract from the normalized depth
when deciding whether a surface is in shadow.
The default is `0`. Very tiny adjustments here (in the order of `0.0001`) may
help reduce artifacts in shadows
[property:Integer blurSamples]
The amount of samples to use when blurring a VSM shadow map.
[property:WebGLRenderTarget map]
The depth map generated using the internal camera; a location beyond a
pixel's depth is in shadow. Computed internally during rendering.
[property:WebGLRenderTarget mapPass]
The distribution map generated using the internal camera; an occlusion is
calculated based on the distribution of depths. Computed internally during
rendering.
[property:Vector2 mapSize]
A [Page:Vector2] defining the width and height of the shadow map.
Higher values give better quality shadows at the cost of computation time.
Values must be powers of 2, up to the
[page:WebGLRenderer.capabilities].maxTextureSize for a given device,
although the width and height don't have to be the same (so, for example,
(512, 1024) is valid). The default is `( 512, 512 )`.
[property:Matrix4 matrix]
Model to shadow camera space, to compute location and depth in shadow map.
Stored in a [page:Matrix4 Matrix4]. This is computed internally during
rendering.
[property:Boolean needsUpdate]
When set to `true`, shadow maps will be updated in the next `render` call.
Default is `false`. If you have set [page:.autoUpdate] to `false`, you
will need to set this property to `true` and then make a render call to
update the light's shadow.
[property:Float normalBias]
Defines how much the position used to query the shadow map is offset along
the object normal. The default is `0`. Increasing this value can be used to
reduce shadow acne especially in large scenes where light shines onto
geometry at a shallow angle. The cost is that shadows may appear
distorted.
[property:Float radius]
Setting this to values greater than 1 will blur the edges of the
shadow.
High values will cause unwanted banding effects in the shadows - a greater
[page:.mapSize mapSize] will allow for a higher value to be used here
before these effects become visible.
If [page:WebGLRenderer.shadowMap.type] is set to [page:Renderer PCFSoftShadowMap],
radius has no effect and it is recommended to increase
softness by decreasing [page:.mapSize mapSize] instead.
Note that this has no effect if the [page:WebGLRenderer.shadowMap.type] is
set to [page:Renderer BasicShadowMap].
Methods
[method:Vector2 getFrameExtents]()
Used internally by the renderer to extend the shadow map to contain all
viewports
[method:undefined updateMatrices]( [param:Light light] )
Update the matrices for the camera and shadow, used internally by the
renderer.
light -- the light for which the shadow is being rendered.
[method:Frustum getFrustum]()
Gets the shadow cameras frustum. Used internally by the renderer to cull
objects.
[method:number getViewportCount]()
Used internally by the renderer to get the number of viewports that need
to be rendered for this shadow.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:this copy]( [param:LightShadow source] )
Copies value of all the properties from the [page:LightShadow source] to
this Light.
[method:LightShadow clone]()
Creates a new LightShadow with the same properties as this one.
[method:Object toJSON]()
Serialize this LightShadow.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/lights/[name].js src/lights/[name].js]

[page:Material] → [page:LineBasicMaterial] →
[name]
A material for drawing wireframe-style geometries with dashed lines.
Note: You must call [page:Line.computeLineDistances]() when using [name].
Code Example
const material = new THREE.LineDashedMaterial( {
color: 0xffffff,
linewidth: 1,
scale: 1,
dashSize: 3,
gapSize: 1,
} );
Examples
[example:webgl_lines_dashed WebGL / lines / dashed]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:LineBasicMaterial])
can be passed in here.
Properties
See the base [page:LineBasicMaterial] class for common properties.
[property:number dashSize]
The size of the dash. This is both the gap with the stroke. Default is
`3`.
[property:number gapSize]
The size of the gap. Default is `1`.
[property:Boolean isLineDashedMaterial]
Read-only flag to check if a given object is of type [name].
[property:number scale]
The scale of the dashed part of a line. Default is `1`.
Methods
See the base [page:LineBasicMaterial] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
Abstract base class for cameras. This class should always be inherited
when you build a new camera.
Constructor
[name]()
Creates a new [name]. Note that this class is not intended to be called
directly; you probably want a [page:PerspectiveCamera] or
[page:OrthographicCamera] instead.
Properties
See the base [page:Object3D] class for common properties.
[property:Boolean isCamera]
Read-only flag to check if a given object is of type [name].
[property:Layers layers]
The [page:Layers layers] that the camera is a member of. This is an
inherited property from [page:Object3D].
Objects must share at least one layer with the camera to be seen when the
camera's viewpoint is rendered.
[property:Matrix4 matrixWorldInverse]
This is the inverse of matrixWorld. MatrixWorld contains the Matrix which
has the world transform of the Camera.
[property:Matrix4 projectionMatrix]
This is the matrix which contains the projection.
[property:Matrix4 projectionMatrixInverse]
The inverse of projectionMatrix.
Methods
See the base [page:Object3D] class for common methods.
[method:Camera clone]( )
Return a new camera with the same properties as this one.
[method:this copy]( [param:Camera source], [param:Boolean recursive] )
Copy the properties from the source camera into this one.
[method:Vector3 getWorldDirection]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns a [page:Vector3] representing the world space direction in which
the camera is looking. (Note: A camera looks down its local, negative
z-axis).
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
A class for generating sphere geometries.
Code Example
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
Constructor
[name]([param:Float radius], [param:Integer widthSegments], [param:Integer heightSegments], [param:Float phiStart], [param:Float phiLength],
[param:Float thetaStart], [param:Float thetaLength])
radius — sphere radius. Default is `1`.
widthSegments — number of horizontal segments. Minimum value is `3`, and the
default is `32`.
heightSegments — number of vertical segments. Minimum value is `2`, and the
default is `16`.
phiStart — specify horizontal starting angle. Default is `0`.
phiLength — specify horizontal sweep angle size. Default is Math.PI *
2.
thetaStart — specify vertical starting angle. Default is `0`.
thetaLength — specify vertical sweep angle size. Default is Math.PI.
The geometry is created by sweeping and calculating vertexes around the Y
axis (horizontal sweep) and the Z axis (vertical sweep). Thus, incomplete
spheres (akin to `'sphere slices'`) can be created through the use of
different values of phiStart, phiLength, thetaStart and thetaLength, in
order to define the points in which we start (or end) calculating those
vertices.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
An exporter to compress geometry with the Draco library.
[link:https://google.github.io/draco/ Draco] is an open source library for compressing and
decompressing 3D meshes and point clouds. Compressed geometry can be significantly smaller,
at the cost of additional decoding time on the client device.
Standalone Draco files have a `.drc` extension, and contain vertex positions,
normals, colors, and other attributes. Draco files *do not* contain materials,
textures, animation, or node hierarchies – to use these features, embed Draco geometry
inside of a glTF file. A normal glTF file can be converted to a Draco-compressed glTF file
using [link:https://github.com/AnalyticalGraphicsInc/gltf-pipeline glTF-Pipeline].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { DRACOExporter } from 'three/addons/exporters/DRACOExporter.js';
Code Example
// Instantiate a exporter
const exporter = new DRACOExporter();
// Parse the input and generate the DRACO encoded output
const binaryData = exporter.parse( mesh, options );
Examples
[example:misc_exporter_draco]
Constructor
[name]()
Creates a new [name].
Methods
[method:Int8Array parse]( [param:Mesh object] | [param:Points object], [param:Object options] )
[page:Mesh object] | [page:Points object] — Mesh or Points to encode.
[page:Options options] — Optional export options
decodeSpeed - int. Indicates how to tune the encoder regarding decode speed (0 gives better speed but worst quality). Default is 5
encodeSpeed - int. Indicates how to tune the encoder parameters (0 gives better speed but worst quality). Default is 5.
encoderMethod - int. Either sequential (very little compression) or Edgebreaker. Edgebreaker traverses the triangles of the mesh in a deterministic, spiral-like way which provides most of the benefits of this data format. Default is DRACOExporter.MESH_EDGEBREAKER_ENCODING.
quantization - Array of int. Indicates the presision of each type of data stored in the draco file in the order (POSITION, NORMAL, COLOR, TEX_COORD, GENERIC). Default is [ 16, 8, 8, 8, 8 ]
exportUvs - bool. Default is true.
exportNormals - bool. Default is true.
exportColor - bool. Default is false.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/exporters/DRACOExporter.js examples/jsm/exporters/DRACOExporter.js]

[page:Material] →
[name]
A material for a use with a [page:Sprite].
Code Example
const map = new THREE.TextureLoader().load( 'textures/sprite.png' );
const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
const sprite = new THREE.Sprite( material );
sprite.scale.set(200, 200, 1)
scene.add( sprite );
Examples
[example:webgl_raycaster_sprite WebGL / raycast / sprite]
[example:webgl_sprites WebGL / sprites]
[example:svg_sandbox SVG / sandbox]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally. SpriteMaterials are not
clipped by using [page:Material.clippingPlanes].
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff). The
[page:.map] is multiplied by the color.
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Boolean isSpriteMaterial]
Read-only flag to check if a given object is of type [name].
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null.
[property:Radians rotation]
The rotation of the sprite in radians. Default is `0`.
[property:Boolean sizeAttenuation]
Whether the size of the sprite is attenuated by the camera depth.
(Perspective camera only.) Default is `true`.
[property:Boolean transparent]
Defines whether this material is transparent. Default is `true`.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
[name] is a simplified version of [page:CSS3DRenderer]. The only transformation that is supported is translation.
The renderer is very useful if you want to combine HTML based labels with 3D objects. Here too, the respective DOM elements are wrapped into an instance of `CSS2DObject` and added to the scene graph.
`[name]` only supports 100% browser and display zoom.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
Examples
[example:css2d_label]
[example:webgl_loader_pdb molecules]
Constructor
[name]( [param:Object parameters] )
[page:DOMElement element] - A [link:https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement]
where the renderer appends its child-elements.
This corresponds to the [page:CSS2DRenderer.domElement domElement] property below.
If not passed in here, a new div element will be created.
Properties
[property:DOMElement domElement]
A [link:https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement] where the renderer appends its child-elements.
This is automatically created by the renderer in the constructor (if not provided already).
Methods
[method:Object getSize]()
Returns an object containing the width and height of the renderer.
[method:undefined render]( [param:Scene scene], [param:Camera camera] )
Renders a [page:Scene scene] using a [page:Camera camera].
[method:undefined setSize]([param:Number width], [param:Number height])
Resizes the renderer to (width, height).
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/CSS2DRenderer.js examples/jsm/renderers/CSS2DRenderer.js]

[page:Object3D] → [page:Light] →
[name]
RectAreaLight emits light uniformly across the face a rectangular plane.
This light type can be used to simulate light sources such as bright
windows or strip lighting.
Important Notes:
There is no shadow support.
Only [page:MeshStandardMaterial MeshStandardMaterial] and
[page:MeshPhysicalMaterial MeshPhysicalMaterial] are supported.
You have to include
[link:https://threejs.org/examples/jsm/lights/RectAreaLightUniformsLib.js RectAreaLightUniformsLib] into your scene and call `init()`.
Code Example
const width = 10;
const height = 10;
const intensity = 1;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,
width, height );
rectLight.position.set( 5, 5, 0 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight )
const rectLightHelper = new RectAreaLightHelper( rectLight );
rectLight.add( rectLightHelper );
Examples
[example:webgl_lights_rectarealight WebGL / rectarealight ]
Constructor
[name]( [param:Integer color], [param:Float intensity], [param:Float width], [param:Float height] )
[page:Integer color] - (optional) hexadecimal color of the light. Default
is 0xffffff (white).
[page:Float intensity] - (optional) the light's intensity, or brightness.
Default is `1`.
[page:Float width] - (optional) width of the light. Default is `10`.
[page:Float height] - (optional) height of the light. Default is `10`.
Creates a new [name].
Properties
See the base [page:Light Light] class for common properties.
[property:Float height]
The height of the light.
[property:Float intensity]
The light's intensity. It is the luminance (brightness) of the light measured in nits (cd/m^2).
Default is `1`.
Changing the intensity will also change the light's power.
[property:Boolean isRectAreaLight]
Read-only flag to check if a given object is of type [name].
[property:Float power]
The light's power.
Power is the luminous power of the light measured in lumens (lm).
Changing the power will also change the light's intensity.
[property:Float width]
The width of the light.
Methods
See the base [page:Light Light] class for common methods.
[method:this copy]( [param:RectAreaLight source] )
Copies value of all the properties from the [page:RectAreaLight source] to
this RectAreaLight.
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
There are often times when you might need to use text in your three.js application - here are
a couple of ways that you can do so.
1. DOM + CSS
Using HTML is generally the easiest and fastest manner to add text. This is the method
used for descriptive overlays in most three.js examples.
You can add content to a
<div id="info">Description</div>
and use CSS markup to position absolutely at a position above all others with a
z-index especially if you are running three.js full screen.
#info {
position: absolute;
top: 10px;
width: 100%;
text-align: center;
z-index: 100;
display:block;
}
2. Use [page:CSS2DRenderer] or [page:CSS3DRenderer]
Use these renderers to draw high-quality text contained in DOM elements to your three.js scene.
This is similar to 1. except that with these renderers elements can be integrated more tightly and dynamically into the scene.
3. Draw text to canvas and use as a [page:Texture]
Use this method if you wish to draw text easily on a plane in your three.js scene.
4. Create a model in your favourite 3D application and export to three.js
Use this method if you prefer working with your 3d applications and importing the models to three.js.
5. Procedural Text Geometry
If you prefer to work purely in THREE.js or to create procedural and dynamic 3D
text geometries, you can create a mesh whose geometry is an instance of THREE.TextGeometry:
new THREE.TextGeometry( text, parameters );
In order for this to work, however, your TextGeometry will need an instance of THREE.Font
to be set on its "font" parameter.
See the [page:TextGeometry] page for more info on how this can be done, descriptions of each
accepted parameter, and a list of the JSON fonts that come with the THREE.js distribution itself.
Examples
[example:webgl_geometry_text WebGL / geometry / text]
[example:webgl_shadowmap WebGL / shadowmap]
If Typeface is down, or you want to use a font that is not there, there's a tutorial
with a python script for blender that allows you to export text to Three.js's JSON format:
[link:http://www.jaanga.com/2012/03/blender-to-threejs-create-3d-text-with.html]
6. Bitmap Fonts
BMFonts (bitmap fonts) allow batching glyphs into a single BufferGeometry. BMFont rendering
supports word-wrapping, letter spacing, kerning, signed distance fields with standard
derivatives, multi-channel signed distance fields, multi-texture fonts, and more.
See [link:https://github.com/felixmariotto/three-mesh-ui three-mesh-ui] or [link:https://github.com/Jam3/three-bmfont-text three-bmfont-text].
Stock fonts are available in projects like
[link:https://github.com/etiennepinchon/aframe-fonts A-Frame Fonts], or you can create your own
from any .TTF font, optimizing to include only characters required for a project.
Some helpful tools:
[link:http://msdf-bmfont.donmccurdy.com/ msdf-bmfont-web]
(web-based)
[link:https://github.com/soimy/msdf-bmfont-xml msdf-bmfont-xml]
(commandline)
[link:https://github.com/libgdx/libgdx/wiki/Hiero hiero]
(desktop app)
7. Troika Text
The [link:https://www.npmjs.com/package/troika-three-text troika-three-text] package renders
quality antialiased text using a similar technique as BMFonts, but works directly with any .TTF
or .WOFF font file so you don't have to pregenerate a glyph texture offline. It also adds
capabilities including:
Effects like strokes, drop shadows, and curvature
The ability to apply any three.js Material, even a custom ShaderMaterial
Support for font ligatures, scripts with joined letters, and right-to-left/bidirectional layout
Optimization for large amounts of dynamic text, performing most work off the main thread in a web worker

[name]
[name] can be used to apply hierarchical 3D transformations to DOM elements
via the CSS3 [link:https://www.w3schools.com/cssref/css3_pr_transform.asp transform] property.
This renderer is particularly interesting if you want to apply 3D effects to a website without
canvas based rendering. It can also be used in order to combine DOM elements with WebGL
content.
There are, however, some important limitations:
It's not possible to use the material system of *three.js*.
It's also not possible to use geometries.
`[name]` only supports 100% browser and display zoom.
So `[name]` is just focused on ordinary DOM elements. These elements are wrapped into special objects (`CSS3DObject` or `CSS3DSprite`) and then added to the scene graph.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
Examples
[example:css3d_molecules molecules]
[example:css3d_orthographic orthographic camera]
[example:css3d_periodictable periodictable]
[example:css3d_sprites sprites]
Constructor
[name]( [param:Object parameters] )
[page:DOMElement element] - A [link:https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement]
where the renderer appends its child-elements.
This corresponds to the [page:CSS3DRenderer.domElement domElement] property below.
If not passed in here, a new div element will be created.
Properties
[property:DOMElement domElement]
A [link:https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement] where the renderer appends its child-elements.
This is automatically created by the renderer in the constructor (if not provided already).
Methods
[method:Object getSize]()
Returns an object containing the width and height of the renderer.
[method:undefined render]( [param:Scene scene], [param:PerspectiveCamera camera] )
Renders a [page:Scene scene] using a [page:PerspectiveCamera perspective camera].
[method:undefined setSize]([param:Number width], [param:Number height])
Resizes the renderer to (width, height).
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/CSS3DRenderer.js examples/jsm/renderers/CSS3DRenderer.js]

[name]
A animation helper for
`MMD`
resources.
[name] handles animation of MMD assets loaded by [page:MMDLoader] with MMD special features as IK, Grant, and Physics.
It uses [page:CCDIKSolver] and [page:MMDPhysics] inside.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js';
Code Example
// Instantiate a helper
const helper = new MMDAnimationHelper();
// Load MMD resources and add to helper
new MMDLoader().loadWithAnimation(
'models/mmd/miku.pmd',
'models/mmd/dance.vmd',
function ( mmd ) {
helper.add( mmd.mesh, {
animation: mmd.animation,
physics: true
} );
scene.add( mmd.mesh );
new THREE.AudioLoader().load(
'audios/mmd/song.mp3',
function ( buffer ) {
const listener = new THREE.AudioListener();
const audio = new THREE.Audio( listener ).setBuffer( buffer );
listener.position.z = 1;
scene.add( audio );
scene.add( listener );
}
);
}
);
function render() {
helper.update( clock.getDelta() );
renderer.render( scene, camera );
}
Examples
[example:webgl_loader_mmd]
[example:webgl_loader_mmd_pose]
[example:webgl_loader_mmd_audio]
Constructor
[name]( [param:Object params] )
[page:Object params] — (optional)
[page:Boolean sync] - Whether animation durations of added objects are synched. Default is true.
[page:Number afterglow] - Default is 0.0.
[page:Boolean resetPhysicsOnLoop] - Default is true.
[page:Boolean pmxAnimation] - If it is set to true, the helper follows the complex and costly PMX animation system.
Try this option only if your PMX model animation doesn't work well. Default is false.
Creates a new [name].
Properties
[property:Audio audio]
An [page:Audio] added to helper.
[property:Camera camera]
An [page:Camera] added to helper.
[property:Array meshes]
An array of [page:SkinnedMesh] added to helper.
[property:WeakMap objects]
A [page:WeakMap] which holds animation stuffs used in helper for objects added to helper. For example, you can access [page:AnimationMixer] for an added [page:SkinnedMesh] with "helper.objects.get( mesh ).mixer"
[property:Function onBeforePhysics]
An optional callback that is executed immediately before the physicis calculation for an [page:SkinnedMesh]. This function is called with the [page:SkinnedMesh].
Methods
[method:MMDAnimationHelper add]( [param:Object3D object], [param:Object params] )
[page:Object3D object] — [page:SkinnedMesh], [page:Camera], or [page:Audio]
[page:Object params] — (optional)
[page:AnimationClip animation] - an [page:AnimationClip] or an array of [page:AnimationClip] set to object. Only for [page:SkinnedMesh] and [page:Camera]. Default is undefined.
[page:Boolean physics] - Only for [page:SkinnedMesh]. A flag whether turn on physics. Default is true.
[page:Integer warmup] - Only for [page:SkinnedMesh] and physics is true. Physics parameter. Default is 60.
[page:Number unitStep] - Only for [page:SkinnedMesh] and physics is true. Physics parameter. Default is 1 / 65.
[page:Integer maxStepNum] - Only for [page:SkinnedMesh] and physics is true. Physics parameter. Default is 3.
[page:Vector3 gravity] - Only for [page:SkinnedMesh] and physics is true. Physics parameter. Default is ( 0, - 9.8 * 10, 0 ).
[page:Number delayTime] - Only for [page:Audio]. Default is 0.0.
Add an [page:SkinnedMesh], [page:Camera], or [page:Audio] to helper and setup animation. The anmation durations of added objects are synched.
If camera/audio has already been added, it'll be replaced with a new one.
[method:MMDAnimationHelper enable]( [param:String key], [param:Boolean enabled] )
[page:String key] — Allowed strings are 'animation', 'ik', 'grant', 'physics', and 'cameraAnimation'.
[page:Boolean enabled] — true is enable, false is disable
Enable/Disable an animation feature
[method:MMDAnimationHelper pose]( [param:SkinnedMesh mesh], [param:Object vpd], [param:Object params] )
[page:SkinnedMesh mesh] — [page:SkinnedMesh] which changes the posing. It doesn't need to be added to helper.
[page:Object vpd] — VPD content obtained by [page:MMDLoader].loadVPD
[page:Object params] — (optional)
[page:Boolean resetPose] - Default is true.
[page:Boolean ik] - Default is true.
[page:Boolean grant] - Default is true.
Changes the posing of [page:SkinnedMesh] as VPD content specifies.
[method:MMDAnimationHelper remove]( [param:Object3D object] )
[page:Object3D object] — [page:SkinnedMesh], [page:Camera], or [page:Audio]
Remove an [page:SkinnedMesh], [page:Camera], or [page:Audio] from helper.
[method:MMDAnimationHelper update]( [param:Number delta] )
[page:Number delta] — number in second
Advance mixer time and update the animations of objects added to helper
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/animation/MMDAnimationHelper.js examples/jsm/animation/MMDAnimationHelper.js]

[name]
"Interleaved" means that multiple attributes, possibly of different types,
(e.g., position, normal, uv, color) are packed into a single array buffer.
An introduction into interleaved arrays can be found here:
[link:https://blog.tojicode.com/2011/05/interleaved-array-basics.html Interleaved array basics]
Examples
[example:webgl_buffergeometry_points_interleaved webgl / buffergeometry / points / interleaved]
Constructor
[name]( [param:TypedArray array], [param:Integer stride] )
[page:TypedArray array] -- A typed array with a shared buffer. Stores the
geometry data.
[page:Integer stride] -- The number of typed-array elements per vertex.
Properties
[property:Array array]
A typed array with a shared buffer. Stores the geometry data.
[property:Integer stride]
The number of typed-array elements per vertex.
[property:Integer count]
Gives the total number of elements in the array.
[property:Object updateRanges]
Array of objects containing:
[page:Integer start]: Position at which to start
update.
[page:Integer count]: The number of components to update.
This can be used to only update some components of stored data. Use
the [page:InterleavedBuffer.addUpdateRange addUpdateRange] function
to add ranges to this array.
[property:String uuid]
[link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID] of
this instance. This gets automatically assigned, so this shouldn't be
edited.
[property:Integer version]
A version number, incremented every time the needsUpdate property is set
to true.
[property:Boolean needsUpdate]
Default is `false`. Setting this to true increments
[page:InterleavedBuffer.version version].
[property:Usage usage]
Defines the intended usage pattern of the data store for optimization
purposes. Corresponds to the `usage` parameter of
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData WebGLRenderingContext.bufferData]().
Methods
[method:this addUpdateRange]( [param:Integer start], [param:Integer count] )
Adds a range of data in the data array to be updated on the GPU. Adds an
object describing the range to the [page:InterleavedBuffer.updateRanges updateRanges]
array.
[method:this clearUpdateRanges]()
Clears the [page:InterleavedBuffer.updateRanges updateRanges] array.
[method:this copy]( [param:InterleavedBuffer source] )
Copies another [name] to this [name].
[method:this copyAt]( [param:Integer index1], [param:InterleavedBuffer attribute], [param:Integer index2] )
Copies data from `attribute[index2]` to [page:InterleavedBuffer.array array][index1].
[method:this set]( [param:TypedArray value], [param:Integer offset] )
value - The source (typed) array.
offset - The offset into the target array at which to begin writing values
from the source array. Default is `0`.
Stores multiple values in the buffer, reading input values from a
specified array.
[method:InterleavedBuffer clone]( [param:Object data] )
data - This object holds shared array buffers required for properly
cloning geometries with interleaved attributes.
Creates a clone of this [name].
[method:this setUsage] ( [param:Usage value] )
Set [page:InterleavedBuffer.usage usage] to value.
[method:Object toJSON]( [param:Object data] )
data - This object holds shared array buffers required for properly
serializing geometries with interleaved attributes.
Serializes this [name].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

How to use post-processing
Many three.js applications render their 3D objects directly to the screen. Sometimes, however, you want to apply one or more graphical
effects like Depth-Of-Field, Bloom, Film Grain or various types of Anti-aliasing. Post-processing is a widely used approach
to implement such effects. First, the scene is rendered to a render target which represents a buffer in the video card's memory.
In the next step one or more post-processing passes apply filters and effects to the image buffer before it is eventually rendered to
the screen.
three.js provides a complete post-processing solution via [page:EffectComposer] to implement such a workflow.
Workflow
The first step in the process is to import all necessary files from the examples directory. The guide assumes you are using the official
[link:https://www.npmjs.com/package/three npm package] of three.js. For our basic demo in this guide we need the following files.
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
After all files are successfully imported, we can create our composer by passing in an instance of [page:WebGLRenderer].
const composer = new EffectComposer( renderer );
When using a composer, it's necessary to change the application's animation loop. Instead of calling the render method of
[page:WebGLRenderer], we now use the respective counterpart of [page:EffectComposer].
function animate() {
requestAnimationFrame( animate );
composer.render();
}
Our composer is now ready so it's possible to configure the chain of post-processing passes. These passes are responsible for creating
the final visual output of the application. They are processed in order of their addition/insertion. In our example, the instance of `RenderPass`
is executed first, then the instance of `GlitchPass` and finally `OutputPass`. The last enabled pass in the chain is automatically rendered to the screen.
The setup of the passes looks like so:
const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );
const glitchPass = new GlitchPass();
composer.addPass( glitchPass );
const outputPass = new OutputPass();
composer.addPass( outputPass );
`RenderPass` is normally placed at the beginning of the chain in order to provide the rendered scene as an input for the next post-processing step. In our case,
`GlitchPass` is going to use these image data to apply a wild glitch effect. `OutputPass` is usually the last pass in the chain which performs sRGB color space conversion and optional tone mapping.
Check out this [link:https://threejs.org/examples/webgl_postprocessing_glitch live example] to see it in action.
Built-in Passes
You can use a wide range of pre-defined post-processing passes provided by the engine. They are located in the
[link:https://github.com/mrdoob/three.js/tree/dev/examples/jsm/postprocessing postprocessing] directory.
Custom Passes
Sometimes you want to write a custom post-processing shader and include it into the chain of post-processing passes. For this scenario,
you can utilize `ShaderPass`. After importing the file and your custom shader, you can use the following code to setup the pass.
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';
// later in your init routine
const luminosityPass = new ShaderPass( LuminosityShader );
composer.addPass( luminosityPass );
The repository provides a file called [link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/shaders/CopyShader.js CopyShader] which is a
good starting code for your own custom shader. `CopyShader` just copies the image contents of the [page:EffectComposer]'s read buffer
to its write buffer without applying any effects.

[page:BufferGeometry] →
[name]
[name] is a geometry class for a rectangular cuboid with a given 'width',
'height', and 'depth'. On creation, the cuboid is centred on the origin,
with each edge parallel to one of the axes.
Code Example
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
Constructor
[name]([param:Float width], [param:Float height], [param:Float depth],
[param:Integer widthSegments], [param:Integer heightSegments],
[param:Integer depthSegments])
width — Width; that is, the length of the edges parallel to the X axis.
Optional; defaults to `1`.
height — Height; that is, the length of the edges parallel to the Y axis.
Optional; defaults to `1`.
depth — Depth; that is, the length of the edges parallel to the Z axis.
Optional; defaults to `1`.
widthSegments — Number of segmented rectangular faces along the width of
the sides. Optional; defaults to `1`.
heightSegments — Number of segmented rectangular faces along the height of
the sides. Optional; defaults to `1`.
depthSegments — Number of segmented rectangular faces along the depth of
the sides. Optional; defaults to `1`.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
A class for generating plane geometries.
Code Example
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
Constructor
[name]([param:Float width], [param:Float height], [param:Integer widthSegments], [param:Integer heightSegments])
width — Width along the X axis. Default is `1`.
height — Height along the Y axis. Default is `1`.
widthSegments — Optional. Default is `1`.
heightSegments — Optional. Default is `1`.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:WebGLRenderTarget] →
[name]
Represents a three-dimensional render target.
Constructor
[name]( [param:Number width], [param:Number height], [param:Number depth], [param:Object options] )
[page:Number width] - the width of the render target, in pixels. Default is `1`.
[page:Number height] - the height of the render target, in pixels. Default is `1`.
[page:Number depth] - the depth of the render target. Default is `1`.
[page:Object options] - optional object that holds texture parameters for an
auto-generated target texture and depthBuffer/stencilBuffer booleans. See [page:WebGLRenderTarget] for details.
Creates a new [name].
Properties
See [page:WebGLRenderTarget] for inherited properties.
[property:number depth]
The depth of the render target.
[property:Data3DTexture texture]
The texture property is overwritten with an instance of
[page:Data3DTexture].
Methods
See [page:WebGLRenderTarget] for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Texture] →
[name]
Creates a cube texture made up of six images.
Code Example
const loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/cube/pisa/' );
const textureCube = loader.load( [
'px.png', 'nx.png',
'py.png', 'ny.png',
'pz.png', 'nz.png'
] );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
Constructor
[name]( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace )
CubeTexture is almost equivalent in functionality and usage to
[page:Texture]. The only differences are that the images are an array of 6
images as opposed to a single image, and the mapping options are
[page:Textures THREE.CubeReflectionMapping] (default) or [page:Textures THREE.CubeRefractionMapping]
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean flipY]
If set to `true`, the texture is flipped along the vertical axis when
uploaded to the GPU. Default is `false`.
[property:Boolean isCubeTexture]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Represents a lookup table for colormaps. It is used to determine the color values from a range of data values.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { Lut } from 'three/addons/math/Lut.js';
Code Example
const lut = new Lut( 'rainbow', 512 );
const color = lut.getColor( 0.5 );
Constructor
[name]( [param:String colormap], [param:Number count] )
colormap - Sets a colormap from predefined colormaps. Available colormaps are: `rainbow`, `cooltowarm`, `blackbody`, `grayscale`. Default is `rainbow`.
count - Sets the number of colors used to represent the data array. Default is `32`.
Properties
[property:Array lut]
The lookup table for the selected color map represented as an array of [page:Color]s.
[property:Array map]
The currently selected color map. Default is the `rainbow` color map.
[property:Number minV]
The minimum value to be represented with the lookup table. Default is *0*.
[property:Number maxV]
The maximum value to be represented with the lookup table. Default is *1*.
[property:Number n]
The number of colors of the current selected color map. Default is `32`.
Methods
[method:this copy]( [param:Lut lut] ) [param:Lut this]
color — Lut to copy.
Copies the given lut.
[method:this addColorMap]( [param:String name], [param:Array arrayOfColors] )
name — The name of the color map.
arrayOfColors — An array of color values. Each value is an array holding a threshold and the actual color value as a hexadecimal number.
Adds a color map to this [name] instance.
[method:HTMLCanvasElement createCanvas]()
Creates a canvas in order to visualize the lookup table as a texture.
[method:Color getColor]( [param:Number alpha] )
value -- the data value to be displayed as a color.
Returns an instance of [page:Color] for the given data value.
[method:this setColorMap]( [param:String colormap], [param:Number count] )
colormap — The name of the color map.
count — The number of colors. Default is `32`.
Configure the lookup table for the given color map and number of colors.
[method:this setMin]( [param:Number minV] )
minV — The minimum value to be represented with the lookup table
Sets this Lut with the minimum value to be represented.
[method:this setMax]( [param:Number maxV] )
maxV — The maximum value to be represented with the lookup table.
Sets this Lut with the maximum value to be represented.
[method:HTMLCanvasElement updateCanvas]( [param:HTMLCanvasElement canvas] )
Updates the canvas with the [name]'s data.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/Lut.js examples/jsm/math/Lut.js]

[page:Curve] →
[name]
Creates a 2d curve in the shape of an ellipse. Setting the [page:Number xRadius] equal to the [page:Number yRadius] will result in a circle.
Code Example
const curve = new THREE.EllipseCurve(
0,
0,
// ax, aY
10, 10,
// xRadius, yRadius
0,
2 * Math.PI,
// aStartAngle, aEndAngle
false,
// aClockwise
0
// aRotation
);
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const ellipse = new THREE.Line( geometry, material );
Constructor
[name]( [param:Float aX], [param:Float aY], [param:Float xRadius],
[param:Float yRadius], [param:Radians aStartAngle], [param:Radians aEndAngle], [param:Boolean aClockwise], [param:Radians aRotation] )
[page:Float aX] – The X center of the ellipse. Default is `0`.
[page:Float aY] – The Y center of the ellipse. Default is `0`.
[page:Float xRadius] – The radius of the ellipse in the x direction.
Default is `1`.
[page:Float yRadius] – The radius of the ellipse in the y direction.
Default is `1`.
[page:Radians aStartAngle] – The start angle of the curve in radians
starting from the positive X axis. Default is `0`.
[page:Radians aEndAngle] – The end angle of the curve in radians starting
from the positive X axis. Default is `2 x Math.PI`.
[page:Boolean aClockwise] – Whether the ellipse is drawn clockwise.
Default is `false`.
[page:Radians aRotation] – The rotation angle of the ellipse in radians,
counterclockwise from the positive X axis (optional). Default is `0`.
Properties
See the base [page:Curve] class for common properties.
[property:Float aX]
The X center of the ellipse.
[property:Float aY]
The Y center of the ellipse.
[property:Radians xRadius]
The radius of the ellipse in the x direction.
[property:Radians yRadius]
The radius of the ellipse in the y direction.
[property:Float aStartAngle]
The start angle of the curve in radians starting from the middle right
side.
[property:Float aEndAngle]
The end angle of the curve in radians starting from the middle right side.
[property:Boolean aClockwise]
Whether the ellipse is drawn clockwise.
[property:Float aRotation]
The rotation angle of the ellipse in radians, counterclockwise from the
positive X axis (optional). Default is `0`.
Methods
See the base [page:Curve] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
This contains methods for setting up an
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext].
Used internally by the [page:AudioListener AudioListener] and
[page:AudioLoader AudioLoader] classes.
This uses the
[link:https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API Web Audio API].
Methods
[method:AudioContext getContext]()
Return the value of the variable `context` in the outer scope, if defined,
otherwise set it to a new
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext].
[method:AudioContext setContext]( [param:AudioContext value] )
Set the variable `context` in the outer scope to `value`.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Light] →
[name]
This light globally illuminates all objects in the scene equally.
This light cannot be used to cast shadows as it does not have a direction.
Code Example
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
Constructor
[name]( [param:Integer color], [param:Float intensity] )
[page:Integer color] - (optional) Numeric value of the RGB component of
the color. Default is 0xffffff.
[page:Float intensity] - (optional) Numeric value of the light's
strength/intensity. Default is `1`.
Creates a new [name].
Properties
See the base [page:Light Light] class for common properties.
[property:Boolean isAmbientLight]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Light Light] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A class representing a 4x4
[link:https://en.wikipedia.org/wiki/Matrix_(mathematics) matrix].
The most common use of a 4x4 matrix in 3D computer graphics is as a
[link:https://en.wikipedia.org/wiki/Transformation_matrix Transformation Matrix].
For an introduction to transformation matrices as used in WebGL,
check out
[link:http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices this tutorial].
This allows a [page:Vector3] representing a point in 3D space to undergo
transformations such as translation, rotation, shear, scale, reflection,
orthogonal or perspective projection and so on, by being multiplied by the
matrix. This is known as `applying` the matrix to the vector.
Every [page:Object3D] has three associated Matrix4s:
[page:Object3D.matrix]: This stores the local transform of the object.
This is the object's transformation relative to its parent.
[page:Object3D.matrixWorld]: The global or world transform of the
object. If the object has no parent, then this is identical to the local
transform stored in [page:Object3D.matrix matrix].
[page:Object3D.modelViewMatrix]: This represents the object's
transformation relative to the camera's coordinate system. An object's
modelViewMatrix is the object's matrixWorld pre-multiplied by the
camera's matrixWorldInverse.
[page:Camera Cameras] have three additional Matrix4s:
[page:Camera.matrixWorldInverse]: The view matrix - the inverse of the
Camera's [page:Object3D.matrixWorld matrixWorld].
[page:Camera.projectionMatrix]: Represents the information how to
project the scene to clip space.
[page:Camera.projectionMatrixInverse]: The inverse of projectionMatrix.
Note: [page:Object3D.normalMatrix] is not a Matrix4, but a [page:Matrix3].
A Note on Row-Major and Column-Major Ordering
The constructor and [page:.set set]() method take arguments in
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order row-major]
order, while internally they are stored in the [page:.elements elements] array in column-major order.
This means that calling
const m = new THREE.Matrix4();
m.set( 11, 12, 13, 14,
21, 22, 23, 24,
31, 32, 33, 34,
41, 42, 43, 44 );
will result in the [page:.elements elements] array containing:
m.elements = [ 11, 21, 31, 41,
12, 22, 32, 42,
13, 23, 33, 43,
14, 24, 34, 44 ];
and internally all calculations are performed using column-major ordering.
However, as the actual ordering makes no difference mathematically and
most people are used to thinking about matrices in row-major order, the
three.js documentation shows matrices in row-major order. Just bear in
mind that if you are reading the source code, you'll have to take the
[link:https://en.wikipedia.org/wiki/Transpose transpose] of any matrices
outlined here to make sense of the calculations.
Extracting position, rotation and scale
There are several options available for extracting position, rotation and
scale from a Matrix4.
[page:Vector3.setFromMatrixPosition]: can be used to extract the
translation component.
[page:Vector3.setFromMatrixScale]: can be used to extract the scale
component.
[page:Quaternion.setFromRotationMatrix],
[page:Euler.setFromRotationMatrix] or [page:.extractRotation extractRotation]
can be used to extract the rotation component from a pure (unscaled) matrix.
[page:.decompose decompose] can be used to extract position, rotation
and scale all at once.
Constructor
[name]( [param:Number n11], [param:Number n12], [param:Number n13], [param:Number n14],
[param:Number n21], [param:Number n22], [param:Number n23], [param:Number n24],
[param:Number n31], [param:Number n32], [param:Number n33], [param:Number n34],
[param:Number n41], [param:Number n42], [param:Number n43], [param:Number n44] )
Creates a 4x4 matrix with the given arguments in row-major order. If no arguments are provided, the constructor initializes
the [name] to the 4x4 [link:https://en.wikipedia.org/wiki/Identity_matrix identity matrix].
Properties
[property:Array elements]
A
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order column-major] list of matrix values.
Methods
[method:Matrix4 clone]()
Creates a new Matrix4 with identical [page:.elements elements] to this
one.
[method:this compose]( [param:Vector3 position], [param:Quaternion quaternion], [param:Vector3 scale] )
Sets this matrix to the transformation composed of [page:Vector3 position],
[page:Quaternion quaternion] and [page:Vector3 scale].
[method:this copy]( [param:Matrix4 m] )
Copies the [page:.elements elements] of matrix [page:Matrix4 m] into this
matrix.
[method:this copyPosition]( [param:Matrix4 m] )
Copies the translation component of the supplied matrix [page:Matrix4 m]
into this matrix's translation component.
[method:this decompose]( [param:Vector3 position], [param:Quaternion quaternion], [param:Vector3 scale] )
Decomposes this matrix into its [page:Vector3 position], [page:Quaternion quaternion]
and [page:Vector3 scale] components.
Note: Not all matrices are decomposable in this way. For example, if an
object has a non-uniformly scaled parent, then the object's world matrix
may not be decomposable, and this method may not be appropriate.
[method:Float determinant]()
Computes and returns the [link:https://en.wikipedia.org/wiki/Determinant determinant] of this matrix.
Based on the method outlined
[link:http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html here].
[method:Boolean equals]( [param:Matrix4 m] )
Return true if this matrix and [page:Matrix4 m] are equal.
[method:this extractBasis]( [param:Vector3 xAxis], [param:Vector3 yAxis], [param:Vector3 zAxis] )
Extracts the [link:https://en.wikipedia.org/wiki/Basis_(linear_algebra) basis]
of this matrix into the three axis vectors provided. If this matrix
is:
[
a
b
c
d
e
f
g
h
i
j
k
l
m
n
o
p
]
then the [page:Vector3 xAxis], [page:Vector3 yAxis], [page:Vector3 zAxis]
will be set to:
xAxis
=
[
a
e
i
]
,
yAxis
=
[
b
f
j
]
, and
zAxis
=
[
c
g
k
]
[method:this extractRotation]( [param:Matrix4 m] )
Extracts the rotation component of the supplied matrix [page:Matrix4 m]
into this matrix's rotation component.
[method:this fromArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - the array to read the elements from.
[page:Integer offset] - ( optional ) offset into the array. Default is
0.
Sets the elements of this matrix based on an [page:Array array] in
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order column-major] format.
[method:this invert]()
Inverts this matrix, using the
[link:https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution analytic method].
You can not invert with a determinant of zero. If you
attempt this, the method produces a zero matrix instead.
[method:Float getMaxScaleOnAxis]()
Gets the maximum scale value of the 3 axes.
[method:this identity]()
Resets this matrix to the
[link:https://en.wikipedia.org/wiki/Identity_matrix identity matrix].
[method:this lookAt]( [param:Vector3 eye], [param:Vector3 target], [param:Vector3 up] )
Constructs a rotation matrix, looking from [page:Vector3 eye] towards
[page:Vector3 target] oriented by the [page:Vector3 up] vector.
[method:this makeRotationAxis]( [param:Vector3 axis], [param:Float theta] )
[page:Vector3 axis] — Rotation axis, should be normalized.
[page:Float theta] — Rotation angle in radians.
Sets this matrix as rotation transform around [page:Vector3 axis] by
[page:Float theta] radians.
This is a somewhat controversial but mathematically sound alternative to
rotating via [page:Quaternion Quaternions]. See the discussion
[link:https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199 here].
[method:this makeBasis]( [param:Vector3 xAxis], [param:Vector3 yAxis], [param:Vector3 zAxis] )
Set this to the [link:https://en.wikipedia.org/wiki/Basis_(linear_algebra) basis]
matrix consisting of the three provided basis vectors:
[
xAxis.x
yAxis.x
zAxis.x
0
xAxis.y
yAxis.y
zAxis.y
0
xAxis.z
yAxis.z
zAxis.z
0
0
0
0
1
]
[method:this makePerspective]( [param:Float left], [param:Float right], [param:Float top], [param:Float bottom], [param:Float near], [param:Float far] )
Creates a
[link:https://en.wikipedia.org/wiki/3D_projection#Perspective_projection perspective projection]
matrix. This is used internally by
[page:PerspectiveCamera.updateProjectionMatrix]()
[method:this makeOrthographic]( [param:Float left], [param:Float right], [param:Float top], [param:Float bottom], [param:Float near], [param:Float far] )
Creates an [link:https://en.wikipedia.org/wiki/Orthographic_projection orthographic projection]
matrix. This is used internally by
[page:OrthographicCamera.updateProjectionMatrix]().
[method:this makeRotationFromEuler]( [param:Euler euler] )
Sets the rotation component (the upper left 3x3 matrix) of this matrix to
the rotation specified by the given [page:Euler Euler Angle]. The rest of
the matrix is set to the identity. Depending on the [page:Euler.order order]
of the [page:Euler euler], there are six possible outcomes. See
[link:https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix this page] for a complete list.
[method:this makeRotationFromQuaternion]( [param:Quaternion q] )
Sets the rotation component of this matrix to the rotation specified by
[page:Quaternion q], as outlined
[link:https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion here]. The
rest of the matrix is set to the identity. So, given [page:Quaternion q] =
w + xi + yj + zk, the resulting matrix will be:
[
1
-
2
y
2
-
2
z
2
2
x
y
-
2
z
w
2
x
z
+
2
y
w
0
2
x
y
+
2
z
w
1
-
2
x
2
-
2
z
2
2
y
z
-
2
x
w
0
2
x
z
-
2
y
w
2
y
z
+
2
x
w
1
-
2
x
2
-
2
y
2
0
0
0
0
1
]
[method:this makeRotationX]( [param:Float theta] )
[page:Float theta] — Rotation angle in radians.
Sets this matrix as a rotational transformation around the X axis by
[page:Float theta] (θ) radians. The resulting matrix will be:
[
1
0
0
0
0
cos
θ
-
sin
θ
0
0
sin
θ
cos
θ
0
0
0
0
1
]
[method:this makeRotationY]( [param:Float theta] )
[page:Float theta] — Rotation angle in radians.
Sets this matrix as a rotational transformation around the Y axis by
[page:Float theta] (θ) radians. The resulting matrix will be:
[
cos
θ
0
sin
θ
0
0
1
0
0
-
sin
θ
0
cos
θ
0
0
0
0
1
]
[method:this makeRotationZ]( [param:Float theta] )
[page:Float theta] — Rotation angle in radians.
Sets this matrix as a rotational transformation around the Z axis by
[page:Float theta] (θ) radians. The resulting matrix will be:
[
cos
θ
-
sin
θ
0
0
sin
θ
cos
θ
0
0
0
0
1
0
0
0
0
1
]
[method:this makeScale]( [param:Float x], [param:Float y], [param:Float z] )
[page:Float x] - the amount to scale in the X axis.
[page:Float y] - the amount to scale in the Y axis.
[page:Float z] - the amount to scale in the Z axis.
Sets this matrix as scale transform:
[
x
0
0
0
0
y
0
0
0
0
z
0
0
0
0
1
]
[method:this makeShear]( [param:Float xy], [param:Float xz], [param:Float yx],
[param:Float yz], [param:Float zx], [param:Float zy] )
[page:Float xy] - the amount to shear X by Y.
[page:Float xz] - the amount to shear X by Z.
[page:Float yx] - the amount to shear Y by X.
[page:Float yz] - the amount to shear Y by Z.
[page:Float zx] - the amount to shear Z by X.
[page:Float zy] - the amount to shear Z by Y.
Sets this matrix as a shear transform:
[
1
y
x
z
x
0
x
y
1
z
y
0
x
z
y
z
1
0
0
0
0
1
]
[method:this makeTranslation]( [param:Vector3 v] )
[method:this makeTranslation]( [param:Float x], [param:Float y], [param:Float z] ) // optional API
Sets this matrix as a translation transform from vector [page:Vector3 v], or numbers [page:Float x], [page:Float y] and [page:Float z]:
[
1
0
0
x
0
1
0
y
0
0
1
z
0
0
0
1
]
[method:this multiply]( [param:Matrix4 m] )
Post-multiplies this matrix by [page:Matrix4 m].
[method:this multiplyMatrices]( [param:Matrix4 a], [param:Matrix4 b] )
Sets this matrix to [page:Matrix4 a] x [page:Matrix4 b].
[method:this multiplyScalar]( [param:Float s] )
Multiplies every component of the matrix by a scalar value [page:Float s].
[method:this premultiply]( [param:Matrix4 m] )
Pre-multiplies this matrix by [page:Matrix4 m].
[method:this scale]( [param:Vector3 v] )
Multiplies the columns of this matrix by vector [page:Vector3 v].
[method:this set]( [param:Float n11], [param:Float n12], [param:Float n13], [param:Float n14], [param:Float n21], [param:Float n22], [param:Float n23], [param:Float n24], [param:Float n31], [param:Float n32],
[param:Float n33], [param:Float n34], [param:Float n41], [param:Float n42], [param:Float n43], [param:Float n44] )
Set the [page:.elements elements] of this matrix to the supplied row-major
values [page:Float n11], [page:Float n12], ... [page:Float n44].
[method:this setFromMatrix3]( [param:Matrix3 m] )
Set the upper 3x3 elements of this matrix to the values of the Matrix3
[page:Matrix3 m].
[method:this setPosition]( [param:Vector3 v] )
[method:this setPosition]( [param:Float x], [param:Float y], [param:Float z] ) // optional API
Sets the position component for this matrix from vector [page:Vector3 v],
without affecting the rest of the matrix - i.e. if the matrix is
currently:
[
a
b
c
d
e
f
g
h
i
j
k
l
m
n
o
p
]
This becomes:
[
a
b
c
v.x
e
f
g
v.y
i
j
k
v.z
m
n
o
p
]
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - (optional) array to store the resulting vector in.
[page:Integer offset] - (optional) offset in the array at which to put the
result.
Writes the elements of this matrix to an array in
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order column-major] format.
[method:this transpose]()
[link:https://en.wikipedia.org/wiki/Transpose Transposes] this matrix.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Object for keeping track of time. This uses
[link:https://developer.mozilla.org/en-US/docs/Web/API/Performance/now performance.now] if it is available, otherwise it reverts to the less
accurate
[link:https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now Date.now].
Constructor
[name]( [param:Boolean autoStart] )
autoStart — (optional) whether to automatically start the clock when
[page:.getDelta]() is called for the first time. Default is `true`.
Properties
[property:Boolean autoStart]
If set, starts the clock automatically when [page:.getDelta]() is called
for the first time. Default is `true`.
[property:Float startTime]
Holds the time at which the clock's [page:Clock.start start] method was
last called. Default is `0`.
[property:Float oldTime]
Holds the time at which the clock's [page:Clock.start start],
[page:.getElapsedTime]() or [page:.getDelta]() methods were last called.
Default is `0`.
[property:Float elapsedTime]
Keeps track of the total time that the clock has been running. Default is
`0`.
[property:Boolean running]
Whether the clock is running or not. Default is `false`.
Methods
[method:undefined start]()
Starts clock. Also sets the [page:.startTime] and [page:.oldTime] to the
current time, sets [page:.elapsedTime] to `0` and [page:.running] to
`true`.
[method:undefined stop]()
Stops clock and sets [page:Clock.oldTime oldTime] to the current time.
[method:Float getElapsedTime]()
Get the seconds passed since the clock started and sets [page:.oldTime] to
the current time.
If [page:.autoStart] is `true` and the clock is not running, also starts
the clock.
[method:Float getDelta]()
Get the seconds passed since the time [page:.oldTime] was set and sets
[page:.oldTime] to the current time.
If [page:.autoStart] is `true` and the clock is not running, also starts
the clock.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Create a AudioAnalyser object, which uses an
[link:https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode AnalyserNode] to analyse audio data.
This uses the
[link:https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API Web Audio API].
Code Example
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create an Audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
sound.setBuffer( buffer );
sound.setLoop(true);
sound.setVolume(0.5);
sound.play();
});
// create an AudioAnalyser, passing in the sound and desired fftSize
const analyser = new THREE.AudioAnalyser( sound, 32 );
// get the average frequency of the sound
const data = analyser.getAverageFrequency();
Examples
[example:webaudio_sandbox webaudio / sandbox ]
[example:webaudio_visualizer webaudio / visualizer ]
Constructor
[name]( audio, [link:https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize fftSize] )
Create a new [page:AudioAnalyser AudioAnalyser].
Properties
[property:AnalyserNode analyser]
An [link:https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode AnalyserNode] used to analyze audio.
[property:Integer fftSize]
A non-zero power of two up to 2048, representing the size of the FFT (Fast
Fourier Transform) to be used to determine the frequency domain. See
[link:https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize this page] for details.
[property:Uint8Array data]
A Uint8Array with size determined by
[link:https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount analyser.frequencyBinCount] used to hold analysis data.
Methods
[method:Uint8Array getFrequencyData]()
Uses the Web Audio's
[link:https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData getByteFrequencyData] method. See that page.
[method:Number getAverageFrequency]()
Get the average of the frequencies returned by the
[page:AudioAnalyser.getFrequencyData getFrequencyData] method.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A [page:Layers] object assigns an [page:Object3D] to 1 or more of 32
layers numbered `0` to `31` - internally the layers are stored as a
[link:https://en.wikipedia.org/wiki/Mask_(computing) bit mask], and by
default all Object3Ds are a member of layer 0.
This can be used to control visibility - an object must share a layer with
a [page:Camera camera] to be visible when that camera's view is
rendered.
All classes that inherit from [page:Object3D] have an
[page:Object3D.layers] property which is an instance of this class.
Examples
[example:webgl_layers WebGL / layers]
Constructor
[name]()
Create a new Layers object, with membership initially set to layer 0.
Properties
[property:Integer mask]
A bit mask storing which of the 32 layers this layers object is currently
a member of.
Methods
[method:undefined disable]( [param:Integer layer] )
layer - an integer from 0 to 31.
Remove membership of this `layer`.
[method:undefined enable]( [param:Integer layer] )
layer - an integer from 0 to 31.
Add membership of this `layer`.
[method:undefined set]( [param:Integer layer] )
layer - an integer from 0 to 31.
Set membership to `layer`, and remove membership all other layers.
[method:Boolean test]( [param:Layers layers] )
layers - a Layers object
Returns true if this and the passed `layers` object have at least one
layer in common.
[method:Boolean isEnabled]( [param:Integer layer] )
layer - an integer from 0 to 31.
Returns true if the given layer is enabled.
[method:undefined toggle]( [param:Integer layer] )
layer - an integer from 0 to 31.
Toggle membership of `layer`.
[method:undefined enableAll]()
Add membership to all layers.
[method:undefined disableAll]()
Remove membership from all layers.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
A material implementing toon shading.
Examples
[example:webgl_materials_toon materials / toon]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Texture aoMap]
The red channel of this texture is used as the ambient occlusion map.
Default is null. The aoMap requires a second set of UVs.
[property:Float aoMapIntensity]
Intensity of the ambient occlusion effect. Default is `1`. Zero is no
occlusion effect.
[property:Texture bumpMap]
The texture to create a bump map. The black and white values map to the
perceived depth in relation to the lights. Bump doesn't actually affect
the geometry of the object, only the lighting. If a normal map is defined
this will be ignored.
[property:Float bumpScale]
How much the bump map affects the material. Typical ranges are 0-1.
Default is `1`.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Color emissive]
Emissive (light) color of the material, essentially a solid color
unaffected by other lighting. Default is black.
[property:Texture emissiveMap]
Set emissive (glow) map. Default is null. The emissive map color is
modulated by the emissive color and the emissive intensity. If you have an
emissive map, be sure to set the emissive color to something other than
black.
[property:Float emissiveIntensity]
Intensity of the emissive light. Modulates the emissive color. Default is
1.
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Texture gradientMap]
Gradient map for toon shading. It's required to set
[page:Texture.minFilter] and [page:Texture.magFilter] to [page:Textures THREE.NearestFilter]
when using this type of texture. Default is `null`.
[property:Texture lightMap]
The light map. Default is null. The lightMap requires a second set of UVs.
[property:Float lightMapIntensity]
Intensity of the baked light. Default is `1`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null. The texture map color is modulated by the diffuse [page:.color].
[property:Texture normalMap]
The texture to create a normal map. The RGB values affect the surface
normal for each pixel fragment and change the way the color is lit. Normal
maps do not change the actual shape of the surface, only the lighting. In
case the material has a normal map authored using the left handed
convention, the y component of normalScale should be negated to compensate
for the different handedness.
[property:Integer normalMapType]
The type of normal map.
Options are [page:constant THREE.TangentSpaceNormalMap] (default), and
[page:constant THREE.ObjectSpaceNormalMap].
[property:Vector2 normalScale]
How much the normal map affects the material. Typical ranges are 0-1.
Default is a [page:Vector2] set to (1,1).
[property:Boolean wireframe]
Render geometry as wireframe. Default is `false` (i.e. render as flat
polygons).
[property:String wireframeLinecap]
Define appearance of line ends. Possible values are "butt", "round" and
"square". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:String wireframeLinejoin]
Define appearance of line joints. Possible values are "round", "bevel" and
"miter". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Class representing a 3D [link:https://en.wikipedia.org/wiki/Vector_space vector].
A 3D vector is an ordered triplet of numbers (labeled x, y, and
z), which can be used to represent a number of things, such as:
A point in 3D space.
A direction and length in 3D space. In three.js the length will always
be the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean distance]
(straight-line distance) from `(0, 0, 0)` to `(x, y, z)` and
the direction is also measured from `(0, 0, 0)` towards `(x, y, z)`.
Any arbitrary ordered triplet of numbers.
There are other things a 3D vector can be used to represent, such as
momentum vectors and so on, however these are the most common uses in
three.js.
Iterating through a [name] instance will yield its components `(x, y, z)`
in the corresponding order.
Code Example
const a = new THREE.Vector3( 0, 1, 0 );
//no arguments; will be initialised to (0, 0, 0)
const b = new THREE.Vector3( );
const d = a.distanceTo( b );
Constructor
[name]( [param:Float x], [param:Float y], [param:Float z] )
[page:Float x] - the x value of this vector. Default is `0`.
[page:Float y] - the y value of this vector. Default is `0`.
[page:Float z] - the z value of this vector. Default is `0`.
Creates a new [name].
Properties
[property:Boolean isVector3]
Read-only flag to check if a given object is of type [name].
[property:Float x]
[property:Float y]
[property:Float z]
Methods
[method:this add]( [param:Vector3 v] )
Adds [page:Vector3 v] to this vector.
[method:this addScalar]( [param:Float s] )
Adds the scalar value s to this vector's [page:.x x], [page:.y y] and
[page:.z z] values.
[method:this addScaledVector]( [param:Vector3 v], [param:Float s] )
Adds the multiple of [page:Vector3 v] and [page:Float s] to this vector.
[method:this addVectors]( [param:Vector3 a], [param:Vector3 b] )
Sets this vector to [page:Vector3 a] + [page:Vector3 b].
[method:this applyAxisAngle]( [param:Vector3 axis], [param:Float angle] )
[page:Vector3 axis] - A normalized [page:Vector3].
[page:Float angle] - An angle in radians.
Applies a rotation specified by an axis and an angle to this vector.
[method:this applyEuler]( [param:Euler euler] )
Applies euler transform to this vector by converting the [page:Euler]
object to a [page:Quaternion] and applying.
[method:this applyMatrix3]( [param:Matrix3 m] )
Multiplies this vector by [page:Matrix3 m]
[method:this applyMatrix4]( [param:Matrix4 m] )
Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
divides by perspective.
[method:this applyNormalMatrix]( [param:Matrix3 m] )
Multiplies this vector by normal matrix [page:Matrix3 m] and normalizes
the result.
[method:this applyQuaternion]( [param:Quaternion quaternion] )
Applies a [page:Quaternion] transform to this vector.
[method:Float angleTo]( [param:Vector3 v] )
Returns the angle between this vector and vector [page:Vector3 v] in
radians.
[method:this ceil]()
The [page:.x x], [page:.y y] and [page:.z z] components of this vector are
rounded up to the nearest integer value.
[method:this clamp]( [param:Vector3 min], [param:Vector3 max] )
[page:Vector3 min] - the minimum [page:.x x], [page:.y y] and [page:.z z]
values.
[page:Vector3 max] - the maximum [page:.x x], [page:.y y] and [page:.z z]
values in the desired range
If this vector's x, y or z value is greater than the max vector's x, y or
z value, it is replaced by the corresponding value.
If this vector's x, y or z value is less than the min vector's x, y or z
value, it is replaced by the corresponding value.
[method:this clampLength]( [param:Float min], [param:Float max] )
[page:Float min] - the minimum value the length will be clamped to
[page:Float max] - the maximum value the length will be clamped to
If this vector's length is greater than the max value, the vector will be
scaled down so its length is the max value.
If this vector's length is less than the min value, the vector will be
scaled up so its length is the min value.
[method:this clampScalar]( [param:Float min], [param:Float max] )
[page:Float min] - the minimum value the components will be clamped to
[page:Float max] - the maximum value the components will be clamped to
If this vector's x, y or z values are greater than the max value, they are
replaced by the max value.
If this vector's x, y or z values are less than the min value, they are
replaced by the min value.
[method:Vector3 clone]()
Returns a new vector3 with the same [page:.x x], [page:.y y]
and [page:.z z] values as this one.
[method:this copy]( [param:Vector3 v] )
Copies the values of the passed vector3's [page:.x x], [page:.y y] and
[page:.z z] properties to this vector3.
[method:this cross]( [param:Vector3 v] )
Sets this vector to [link:https://en.wikipedia.org/wiki/Cross_product cross product]
of itself and [page:Vector3 v].
[method:this crossVectors]( [param:Vector3 a], [param:Vector3 b] )
Sets this vector to [link:https://en.wikipedia.org/wiki/Cross_product cross product]
of [page:Vector3 a] and [page:Vector3 b].
[method:Float distanceTo]( [param:Vector3 v] )
Computes the distance from this vector to [page:Vector3 v].
[method:Float manhattanDistanceTo]( [param:Vector3 v] )
Computes the [link:https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan distance]
from this vector to [page:Vector3 v].
[method:Float distanceToSquared]( [param:Vector3 v] )
Computes the squared distance from this vector to [page:Vector3 v]. If you
are just comparing the distance with another distance, you should compare
the distance squared instead as it is slightly more efficient to
calculate.
[method:this divide]( [param:Vector3 v] )
Divides this vector by [page:Vector3 v].
[method:this divideScalar]( [param:Float s] )
Divides this vector by scalar [page:Float s].
[method:Float dot]( [param:Vector3 v] )
Calculate the [link:https://en.wikipedia.org/wiki/Dot_product dot product]
of this vector and [page:Vector3 v].
[method:Boolean equals]( [param:Vector3 v] )
Returns `true` if the components of this vector and [page:Vector3 v] are
strictly equal; `false` otherwise.
[method:this floor]()
The components of this vector are rounded down to the nearest integer
value.
[method:this fromArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - the source array.
[page:Integer offset] - ( optional) offset into the array. Default is
0.
Sets this vector's [page:.x x] value to be `array[ offset + 0 ]`, [page:.y y]
value to be `array[ offset + 1 ]` and [page:.z z] value to be `array[ offset + 2 ]`.
[method:this fromBufferAttribute]( [param:BufferAttribute attribute], [param:Integer index] )
[page:BufferAttribute attribute] - the source attribute.
[page:Integer index] - index in the attribute.
Sets this vector's [page:.x x], [page:.y y] and [page:.z z] values from
the [page:BufferAttribute attribute].
[method:Float getComponent]( [param:Integer index] )
[page:Integer index] - `0`, `1` or `2`.
If index equals `0` returns the [page:.x x] value.
If index equals `1` returns the [page:.y y] value.
If index equals `2` returns the [page:.z z] value.
[method:Float length]()
Computes the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) from (0, 0, 0) to (x, y, z).
[method:Float manhattanLength]()
Computes the [link:http://en.wikipedia.org/wiki/Taxicab_geometry Manhattan length]
of this vector.
[method:Float lengthSq]()
Computes the square of the
[link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) from (0, 0, 0) to (x, y, z). If you are comparing
the lengths of vectors, you should compare the length squared instead as
it is slightly more efficient to calculate.
[method:this lerp]( [param:Vector3 v], [param:Float alpha] )
[page:Vector3 v] - [page:Vector3] to interpolate towards.
[page:Float alpha] - interpolation factor, typically in the closed
interval `[0, 1]`.
Linearly interpolate between this vector and [page:Vector3 v], where alpha
is the percent distance along the line - alpha = 0 will be this vector,
and alpha = 1 will be [page:Vector3 v].
[method:this lerpVectors]( [param:Vector3 v1], [param:Vector3 v2], [param:Float alpha] )
[page:Vector3 v1] - the starting [page:Vector3].
[page:Vector3 v2] - [page:Vector3] to interpolate towards.
[page:Float alpha] - interpolation factor, typically in the closed
interval `[0, 1]`.
Sets this vector to be the vector linearly interpolated between
[page:Vector3 v1] and [page:Vector3 v2] where alpha is the percent
distance along the line connecting the two vectors - alpha = 0 will be
[page:Vector3 v1], and alpha = 1 will be [page:Vector3 v2].
[method:this max]( [param:Vector3 v] )
If this vector's x, y or z value is less than [page:Vector3 v]'s x, y or z
value, replace that value with the corresponding max value.
[method:this min]( [param:Vector3 v] )
If this vector's x, y or z value is greater than [page:Vector3 v]'s x, y
or z value, replace that value with the corresponding min value.
[method:this multiply]( [param:Vector3 v] )
Multiplies this vector by [page:Vector3 v].
[method:this multiplyScalar]( [param:Float s] )
Multiplies this vector by scalar [page:Float s].
[method:this multiplyVectors]( [param:Vector3 a], [param:Vector3 b] )
Sets this vector equal to [page:Vector3 a] * [page:Vector3 b],
component-wise.
[method:this negate]()
Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
[method:this normalize]()
Convert this vector to a [link:https://en.wikipedia.org/wiki/Unit_vector unit vector]
- that is, sets it equal to a vector with the same direction
as this one, but [page:.length length] 1.
[method:this project]( [param:Camera camera] )
[page:Camera camera] — camera to use in the projection.
Projects this vector from world space into the camera's normalized device
coordinate (NDC) space.
[method:this projectOnPlane]( [param:Vector3 planeNormal] )
[page:Vector3 planeNormal] - A vector representing a plane normal.
[link:https://en.wikipedia.org/wiki/Vector_projection Projects] this
vector onto a plane by subtracting this vector projected onto the plane's
normal from this vector.
[method:this projectOnVector]( [param:Vector3 v] )
[link:https://en.wikipedia.org/wiki/Vector_projection Projects] this
vector onto [page:Vector3 v].
[method:this reflect]( [param:Vector3 normal] )
[page:Vector3 normal] - the normal to the reflecting plane
Reflect this vector off of plane orthogonal to [page:Vector3 normal].
Normal is assumed to have unit length.
[method:this round]()
The components of this vector are rounded to the nearest integer value.
[method:this roundToZero]()
The components of this vector are rounded towards zero (up if negative,
down if positive) to an integer value.
[method:this set]( [param:Float x], [param:Float y], [param:Float z] )
Sets the [page:.x x], [page:.y y] and [page:.z z] components of this
vector.
[method:this setComponent]( [param:Integer index], [param:Float value] )
[page:Integer index] - `0`, `1` or `2`.
[page:Float value] - [page:Float]
If index equals `0` set [page:.x x] to [page:Float value].
If index equals `1` set [page:.y y] to [page:Float value].
If index equals `2` set [page:.z z] to [page:Float value]
[method:this setFromColor]( [param:Color color] )
Sets this vector's [page:.x x], [page:.y y] and [page:.z z] components
from the r, g, and b components of the specified [page:Color color].
[method:this setFromCylindrical]( [param:Cylindrical c] )
Sets this vector from the cylindrical coordinates [page:Cylindrical c].
[method:this setFromCylindricalCoords]( [param:Float radius], [param:Float theta], [param:Float y] )
Sets this vector from the cylindrical coordinates [page:Cylindrical radius],
[page:Cylindrical theta] and [page:Cylindrical y].
[method:this setFromEuler]( [param:Euler euler] )
Sets this vector's [page:.x x], [page:.y y] and [page:.z z] components
from the x, y, and z components of the specified [page:Euler Euler Angle].
[method:this setFromMatrixColumn]( [param:Matrix4 matrix], [param:Integer index] )
Sets this vector's [page:.x x], [page:.y y] and [page:.z z] components
from [page:Integer index] column of [page:Matrix4 matrix].
[method:this setFromMatrix3Column]( [param:Matrix3 matrix], [param:Integer index] )
Sets this vector's [page:.x x], [page:.y y] and [page:.z z] components
from [page:Integer index] column of [page:Matrix3 matrix].
[method:this setFromMatrixPosition]( [param:Matrix4 m] )
Sets this vector to the position elements of the
[link:https://en.wikipedia.org/wiki/Transformation_matrix transformation matrix] [page:Matrix4 m].
[method:this setFromMatrixScale]( [param:Matrix4 m] )
Sets this vector to the scale elements of the
[link:https://en.wikipedia.org/wiki/Transformation_matrix transformation matrix] [page:Matrix4 m].
[method:this setFromSpherical]( [param:Spherical s] )
Sets this vector from the spherical coordinates [page:Spherical s].
[method:this setFromSphericalCoords]( [param:Float radius], [param:Float phi], [param:Float theta] )
Sets this vector from the spherical coordinates [page:Spherical radius],
[page:Spherical phi] and [page:Spherical theta].
[method:this setLength]( [param:Float l] )
Set this vector to a vector with the same direction as this one, but
[page:.length length] [page:Float l].
[method:this setScalar]( [param:Float scalar] )
Set the [page:.x x], [page:.y y] and [page:.z z] values of this vector
both equal to [page:Float scalar].
[method:this setX]( [param:Float x] )
Replace this vector's [page:.x x] value with [page:Float x].
[method:this setY]( [param:Float y] )
Replace this vector's [page:.y y] value with [page:Float y].
[method:this setZ]( [param:Float z] )
Replace this vector's [page:.z z] value with [page:Float z].
[method:this sub]( [param:Vector3 v] )
Subtracts [page:Vector3 v] from this vector.
[method:this subScalar]( [param:Float s] )
Subtracts [page:Float s] from this vector's [page:.x x], [page:.y y] and
[page:.z z] components.
[method:this subVectors]( [param:Vector3 a], [param:Vector3 b] )
Sets this vector to [page:Vector3 a] - [page:Vector3 b].
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - (optional) array to store this vector to. If this is
not provided a new array will be created.
[page:Integer offset] - (optional) optional offset into the array.
Returns an array [x, y, z], or copies x, y and z into the provided
[page:Array array].
[method:this transformDirection]( [param:Matrix4 m] )
Transforms the direction of this vector by a matrix (the upper left 3 x 3
subset of a [page:Matrix4 m]) and then [page:.normalize normalizes] the
result.
[method:this unproject]( [param:Camera camera] )
[page:Camera camera] — camera to use in the projection.
Projects this vector from the camera's normalized device coordinate (NDC)
space into world space.
[method:this random]()
Sets each component of this vector to a pseudo-random value between `0` and
`1`, excluding `1`.
[method:this randomDirection]()
Sets this vector to a uniformly random point on a unit sphere.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
Creates an one-sided polygonal geometry from one or more path shapes.
Code Example
const x = 0, y = 0;
const heartShape = new THREE.Shape();
heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );
Constructor
[name]([param:Array shapes], [param:Integer curveSegments])
shapes — [page:Array] of shapes or a single [page:Shape shape]. Default is
a single triangle shape.
curveSegments - [page:Integer] - Number of segments per shape. Default is
12.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:KeyframeTrack] →
[name]
A Track of string keyframe values.
Constructor
[name]( [param:String name], [param:Array times], [param:Array values] )
[page:String name] - (required) identifier for the KeyframeTrack.
[page:Array times] - (required) array of keyframe times.
[page:Array values] - values for the keyframes at the times specified.
[page:Constant interpolation] - the type of interpolation to use. See
[page:Animation Animation Constants] for possible values. Default is
[page:Animation InterpolateDiscrete].
Properties
See [page:KeyframeTrack] for inherited properties.
[property:Constant DefaultInterpolation]
The default interpolation type to use, [page:Animation InterpolateDiscrete].
[property:Array ValueBufferType]
A normal Array (no Float32Array in this case, unlike `ValueBufferType` of
[page:KeyframeTrack]).
[property:String ValueTypeName]
String 'string'.
Methods
See [page:KeyframeTrack] for inherited methods.
[method:undefined InterpolantFactoryMethodLinear]()
The value of this method here is 'undefined', as it does not make sense
for discrete properties.
[method:undefined InterpolantFactoryMethodSmooth]()
The value of this method here is 'undefined', as it does not make sense
for discrete properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Light] →
[name]
A light source positioned directly above the scene, with color fading from
the sky color to the ground color.
This light cannot be used to cast shadows.
Code Example
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );
Examples
[example:webgl_animation_skinning_blending animation / skinning / blending ]
[example:webgl_lights_hemisphere lights / hemisphere ]
[example:misc_controls_pointerlock controls / pointerlock ]
[example:webgl_loader_collada_kinematics loader / collada / kinematics ]
[example:webgl_loader_stl loader / stl ]
Constructor
[name]( [param:Integer skyColor], [param:Integer groundColor],
[param:Float intensity] )
[page:Integer skyColor] - (optional) hexadecimal color of the sky. Default
is 0xffffff.
[page:Integer groundColor] - (optional) hexadecimal color of the ground.
Default is 0xffffff.
[page:Float intensity] - (optional) numeric value of the light's
strength/intensity. Default is `1`.
Creates a new [name].
Properties
See the base [page:Light Light] class for common properties.
[property:Float color]
The light's sky color, as passed in the constructor. Default is a new
[page:Color] set to white (0xffffff).
[property:Float groundColor]
The light's ground color, as passed in the constructor. Default is a new
[page:Color] set to white (0xffffff).
[property:Boolean isHemisphereLight]
Read-only flag to check if a given object is of type [name].
[property:Vector3 position]
This is set equal to [page:Object3D.DEFAULT_UP] (0, 1, 0), so that the
light shines from the top down.
Methods
See the base [page:Light Light] class for common methods.
[method:this copy]( [param:HemisphereLight source] )
Copies the value of [page:.color color], [page:.intensity intensity] and
[page:.groundColor groundColor] from the [page:Light source] light into
this one.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
Class for loading a font in JSON format. Returns a font, which is an
array of [page:Shape Shapes] representing the font.
This uses the [page:FileLoader] internally for loading files.
You can convert fonts online using [link:https://gero3.github.io/facetype.js/ facetype.js]
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
Code Example
const loader = new FontLoader();
const font = loader.load(
// resource URL
'fonts/helvetiker_bold.typeface.json',
// onLoad callback
function ( font ) {
// do something with the font
console.log( font );
},
// onProgress callback
function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
// onError callback
function ( err ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_geometry_text_shapes geometry / text / shapes ]
[example:webgl_geometry_text geometry / text ]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] — Will be called when load completes. The argument will be the loaded font.
[page:Function onProgress] — Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — Will be called when load errors.
Begin loading from url and pass the loaded font to onLoad.
[method:Font parse]( [param:Object json] )
[page:Object json] — The `JSON` structure to parse.
Parse a `JSON` structure and return a font.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/FontLoader.js examples/jsm/loaders/FontLoader.js]

[page:Curve] →
[name]
An abstract base class extending [page:Curve]. A CurvePath is simply an
array of connected curves, but retains the api of a curve.
Constructor
[name]()
The constructor take no parameters.
Properties
See the base [page:Curve] class for common properties.
[property:Array curves]
The array of [page:Curve Curves].
[property:Boolean autoClose]
Whether or not to automatically close the path.
Methods
See the base [page:Curve] class for common methods.
[method:undefined add]( [param:Curve curve] )
Add a curve to the [page:.curves] array.
[method:this closePath]()
Adds a [page:LineCurve lineCurve] to close the path.
[method:Array getCurveLengths]()
Get list of cumulative curve lengths of the curves in the [page:.curves]
array.
[method:Array getPoints]( [param:Integer divisions] )
divisions -- number of pieces to divide the curve into. Default is
`12`.
Returns an array of points representing a sequence of curves. The
`division` parameter defines the number of pieces each curve is divided
into. However, for optimization and quality purposes, the actual sampling
resolution for each curve depends on its type. For example, for a
[page:LineCurve], the returned number of points is always just 2.
[method:Array getSpacedPoints]( [param:Integer divisions] )
divisions -- number of pieces to divide the curve into. Default is
`40`.
Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for geometry compressed with the Draco library.
[link:https://google.github.io/draco/ Draco] is an open source library for compressing and
decompressing 3D meshes and point clouds. Compressed geometry can be significantly smaller,
at the cost of additional decoding time on the client device.
Standalone Draco files have a `.drc` extension, and contain vertex positions,
normals, colors, and other attributes. Draco files *do not* contain materials,
textures, animation, or node hierarchies – to use these features, embed Draco geometry
inside of a glTF file. A normal glTF file can be converted to a Draco-compressed glTF file
using [link:https://github.com/AnalyticalGraphicsInc/gltf-pipeline glTF-Pipeline]. When
using Draco with glTF, an instance of DRACOLoader will be used internally by [page:GLTFLoader].
It is recommended to create one DRACOLoader instance and reuse it to avoid loading and creating multiple
decoder instances.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
Code Example
// Instantiate a loader
const loader = new DRACOLoader();
// Specify path to a folder containing WASM/JS decoding libraries.
loader.setDecoderPath( '/examples/jsm/libs/draco/' );
// Optional: Pre-fetch Draco WASM/JS module.
loader.preload();
// Load a Draco geometry
loader.load(
// resource URL
'model.drc',
// called when the resource is loaded
function ( geometry ) {
const material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
},
// called as loading progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_draco]
Browser compatibility
DRACOLoader will automatically use either the JS or the WASM decoding library, based on browser capabilities.
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.drc` file.
[page:Function onLoad] — A function to be called after the loading is successfully completed.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading from url and call the `onLoad` function with the decompressed geometry.
[method:this setDecoderPath]( [param:String value] )
[page:String value] — Path to folder containing the JS and WASM decoder libraries.
[method:this setDecoderConfig]( [param:Object config] )
[page:String config.type] - (Optional) `"js"` or `"wasm"`.
Provides configuration for the decoder libraries. Configuration cannot be changed
after decoding begins.
[method:this setWorkerLimit]( [param:Number workerLimit] )
[page:Number workerLimit] - Maximum number of workers to be allocated. Default is 4.
Sets the maximum number of [link:https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers Web Workers]
to be used during decoding. A lower limit may be preferable if workers are also for other tasks
in the application.
[method:this preload]()
Requests the decoder libraries, if not already loaded.
[method:this dispose]()
Disposes of the decoder resources and deallocates memory. The decoder
[link:https://github.com/google/draco/issues/349 cannot be reloaded afterward].
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/DRACOLoader.js examples/jsm/loaders/DRACOLoader.js]

[name]
An exporter for the [link:https://en.wikipedia.org/wiki/Wavefront_.obj_file OBJ] file format.
[name] is not able to export material data into MTL files so only geometry data are supported.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
Code Example
// Instantiate an exporter
const exporter = new OBJExporter();
// Parse the input and generate the OBJ output
const data = exporter.parse( scene );
downloadFile( data );
Constructor
[name]()
Creates a new [name].
Methods
[method:String parse]( [param:Object3D object] )
[page:Object object] — Object3D to be exported.
Generates a string holding the OBJ data.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/exporters/OBJExporter.js examples/jsm/exporters/OBJExporter.js]

[name]
Utility class for sampling weighted random points on the surface of a mesh.
Weighted sampling is useful for effects like heavier foliage growth in certain areas of terrain, or concentrated particle emissions from specific parts of a mesh. Vertex weights may be written programmatically, or painted by hand as vertex colors in 3D tools like Blender.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
Code Example
// Create a sampler for a Mesh surface.
const sampler = new MeshSurfaceSampler( surfaceMesh )
.setWeightAttribute( 'color' )
.build();
const mesh = new THREE.InstancedMesh( sampleGeometry, sampleMaterial, 100 );
const position = new THREE.Vector3();
const matrix = new THREE.Matrix4();
// Sample randomly from the surface, creating an instance of the sample
// geometry at each sample point.
for ( let i = 0; i < 100; i ++ ) {
sampler.sample( position );
matrix.makeTranslation( position.x, position.y, position.z );
mesh.setMatrixAt( i, matrix );
}
scene.add( mesh );
Examples
[example:webgl_instancing_scatter]
Constructor
[name]( [param:Mesh mesh] )
[page:Mesh mesh] — Surface mesh from which to sample.
Creates a new [name]. If the input geometry is indexed, a non-indexed copy is made. After construction, the sampler is not able to return samples until [page:MeshSurfaceSampler.build build] is called.
Methods
[method:this setWeightAttribute]( [param:String name] )
Specifies a vertex attribute to be used as a weight when sampling from the surface. Faces with higher weights are more likely to be sampled, and those with weights of zero will not be sampled at all. For vector attributes, only
.x
is used in sampling.
If no weight attribute is selected, sampling is randomly distributed by area.
[method:this build]()
Processes the input geometry and prepares to return samples. Any configuration of the geometry or sampler must occur before this method is called. Time complexity is
O(n)
for a surface with
n
faces.
[method:this sample]( [param:Vector3 targetPosition], [param:Vector3 targetNormal], [param:Color targetColor], [param:Vector2 targetUV] )
Selects a random point on the surface of the input geometry, returning the position and optionally the normal vector, color and UV Coordinate at that point. Time complexity is
O(log n)
for a surface with
n
faces.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/MeshSurfaceSampler.js examples/jsm/math/MeshSurfaceSampler.js]

[name]
Represents an oriented bounding box (OBB) in 3D space.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { OBB } from 'three/addons/math/OBB.js';
Examples
[example:webgl_math_obb]
Constructor
[name]( [param:Vector3 center], [param:Vector3 halfSize], [param:Matrix3 rotation] )
[page:Vector3 center] — The center of the [name]. (optional)
[page:Vector3 halfSize] — Positive halfwidth extents of the [name] along each axis. (optional)
[page:Matrix3 rotation] — The rotation of the [name]. (optional)
Creates a new [name].
Properties
[property:Vector3 center]
The center of the [name]. Default is *( 0, 0, 0 )*.
[property:Vector3 halfSize]
Positive halfwidth extents of the [name] along each axis. Default is *( 0, 0, 0 )*.
[property:Matrix3 rotation]
The rotation of the [name]. Default is the identity matrix.
Methods
[method:this applyMatrix4]( [param:Matrix4 matrix] )
[page:Matrix4 matrix] — A 4x4 transformation matrix.
Applies the given transformation matrix to this [name]. This method can be used to transform the
bounding volume with the world matrix of a 3D object in order to keep both entities in sync.
[method:Vector3 clampPoint]( [param:Vector3 point], [param:Vector3 clampedPoint] )
[page:Vector3 point] — The point that should be clamped within the bounds of this [name].
[page:Matrix3 clampedPoint] — The result will be copied into this vector.
Clamps the given point within the bounds of this [name].
[method:OBB clone]()
Creates a cloned [name] for this instance.
[method:Boolean containsPoint]( [param:Vector3 point] )
[page:Vector3 point] — The point to test.
Whether the given point lies within this [name] or not.
[method:this copy]( [param:OBB obb] )
[page:OBB obb] — The [name] to copy.
Copies the properties of the given [name] to this [name].
[method:Boolean equals]( [param:OBB obb] )
[page:OBB obb] — The [name] to test.
Whether the given [name] is equal to this [name] or not.
[method:this fromBox3]( [param:Box3 box3] )
[page:Box3 box3] — An AABB.
Defines an [name] based on the given AABB.
[method:Vector3 getSize]( [param:Vector3 size] )
[page:Vector3 size] — The result will be copied into this vector.
Returns the size of this [name] into the given vector.
[method:Boolean intersectsBox3]( [param:Box3 box3] )
[page:Box3 box3] — The AABB to test.
Whether the given AABB intersects this [name] or not.
[method:Boolean intersectsSphere]( [param:Sphere sphere] )
[page:Sphere sphere] — The bounding sphere to test.
Whether the given bounding sphere intersects this [name] or not.
[method:Boolean intersectsOBB]( [param:OBB obb], [param:Number epsilon] )
[page:OBB obb] — The OBB to test.
[page:Number epsilon] — An optional numeric value to counteract arithmetic errors. Default is `Number.EPSILON`.
Whether the given [name] intersects this [name] or not.
[method:Boolean intersectsPlane]( [param:Plane plane] )
[page:Plane plane] — The plane to test.
Whether the given plane intersects this [name] or not.
[method:Boolean intersectsRay]( [param:Ray ray] )
[page:Ray ray] — The ray to test.
Whether the given ray intersects this [name] or not.
[method:Vector3 intersectRay]( [param:Ray ray], [param:Vector3 intersectionPoint] )
[page:Ray ray] — The ray to test.
[page:Vector3 intersectionPoint] — The result will be copied into this vector.
Performs a Ray/OBB intersection test and stores the intersection point to the given 3D vector.
If no intersection is detected, `null` is returned.
[method:this set]( [param:Vector3 center], [param:Vector3 halfSize], [param:Matrix3 rotation] )
[page:Vector3 center] — The center of the [name].
[page:Vector3 halfSize] — Positive halfwidth extents of the [name] along each axis.
[page:Matrix3 rotation] — The rotation of the [name].
Defines the [name] for the given values.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/OBB.js examples/jsm/math/OBB.js]

[page:Loader] →
[name]
Loader for KTX 2.0 GPU Texture containers.
[link:http://github.khronos.org/KTX-Specification/ KTX 2.0] is a container format for various GPU texture formats. The loader
supports Basis Universal GPU textures, which can be quickly transcoded to
a wide variety of GPU texture compression formats. While KTX 2.0 also allows
other hardware-specific formats, this loader does not yet parse them.
This loader parses the KTX 2.0 container and transcodes to a supported GPU compressed
texture format. The required WASM transcoder and JS wrapper are available from the
[link:https://github.com/mrdoob/three.js/tree/dev/examples/jsm/libs/basis examples/jsm/libs/basis]
directory.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
Code Example
var ktx2Loader = new THREE.KTX2Loader();
ktx2Loader.setTranscoderPath( 'examples/jsm/libs/basis/' );
ktx2Loader.detectSupport( renderer );
ktx2Loader.load( 'diffuse.ktx2', function ( texture ) {
var material = new THREE.MeshStandardMaterial( { map: texture } );
}, function () {
console.log( 'onProgress' );
}, function ( e ) {
console.error( e );
} );
Examples
[example:webgl_loader_texture_ktx2]
Browser compatibility
This loader relies on Web Assembly which is not supported in older browsers.
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:CompressedTexture load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.ktx2` file.
[page:Function onLoad] — A function to be called after the loading is successfully completed.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Load from url and call the `onLoad` function with the transcoded [page:CompressedTexture].
[method:this detectSupport]( [param:WebGLRenderer renderer] )
[page:WebGLRenderer renderer] — A renderer instance.
Detects hardware support for available compressed texture formats, to determine
the output format for the transcoder. Must be called before loading a texture.
[method:this setTranscoderPath]( [param:String path] )
[page:String path] — Path to folder containing the WASM transcoder and JS wrapper.
The WASM transcoder and JS wrapper are available from the
[link:https://github.com/mrdoob/three.js/tree/dev/examples/jsm/libs/basis examples/jsm/libs/basis]
directory.
[method:this setWorkerLimit]( [param:Number limit] )
[page:Number limit] — Maximum number of workers. Default is '4'.
Sets the maximum number of web workers to be allocated by this instance.
[method:this dispose]()
Disposes the loader object, de-allocating any Web Workers created.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/KTX2Loader.js examples/jsm/loaders/KTX2Loader.js]

[page:Material] →
[name]
A material for drawing wireframe-style geometries.
Code Example
const material = new THREE.LineBasicMaterial( {
color: 0xffffff,
linewidth: 1,
linecap: 'round', //ignored by WebGLRenderer
linejoin:
'round' //ignored by WebGLRenderer
} );
Examples
[example:webgl_buffergeometry_drawrange WebGL / buffergeometry / drawrange]
[example:webgl_buffergeometry_lines WebGL / buffergeometry / lines]
[example:webgl_buffergeometry_lines_indexed WebGL / buffergeometry / lines / indexed]
[example:webgl_decals WebGL / decals]
[example:webgl_geometry_nurbs WebGL / geometry / nurbs]
[example:webgl_geometry_shapes WebGL / geometry / shapes]
[example:webgl_geometry_spline_editor WebGL / geometry / spline / editor]
[example:webgl_interactive_buffergeometry WebGL / interactive / buffergeometry]
[example:webgl_interactive_voxelpainter WebGL / interactive / voxelpainter]
[example:webgl_lines_colors WebGL / lines / colors]
[example:webgl_lines_dashed WebGL / lines / dashed]
[example:physics_ammo_rope physics / ammo / rope]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Float linewidth]
Controls line thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
[property:String linecap]
Define appearance of line ends. Possible values are 'butt', 'round' and
'square'. Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:String linejoin]
Define appearance of line joints. Possible values are 'round', 'bevel' and
'miter'. Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:Texture map]
Sets the color of the lines using data from a [page:Texture].
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
The AnimationMixer is a player for animations on a particular object in
the scene. When multiple objects in the scene are animated independently,
one AnimationMixer may be used for each object.
For an overview of the different elements of the three.js animation system
see the "Animation System" article in the "Next Steps" section of the
manual.
Constructor
[name]( [param:Object3D rootObject] )
[page:Object3D rootObject] - the object whose animations shall be played
by this mixer.
Properties
[property:Number time]
The global mixer time (in seconds; starting with `0` on the mixer's
creation).
[property:Number timeScale]
A scaling factor for the global [page:.time mixer time].
Note: Setting the mixer's timeScale to `0` and later back to `1` is a
possibility to pause/unpause all actions that are controlled by this
mixer.
Methods
[method:AnimationAction clipAction]([param:AnimationClip clip], [param:Object3D optionalRoot])
Returns an [page:AnimationAction] for the passed clip, optionally using a
root object different from the mixer's default root. The first parameter
can be either an [page:AnimationClip] object or the name of an
AnimationClip.
If an action fitting the clip and root parameters doesn't yet exist, it
will be created by this method. Calling this method several times with the
same clip and root parameters always returns the same clip instance.
[method:AnimationAction existingAction]([param:AnimationClip clip], [param:Object3D optionalRoot])
Returns an existing [page:AnimationAction] for the passed clip, optionally
using a root object different from the mixer's default root.
The first parameter can be either an [page:AnimationClip] object or the
name of an AnimationClip.
[method:Object3D getRoot]()
Returns this mixer's root object.
[method:this stopAllAction]()
Deactivates all previously scheduled actions on this mixer.
[method:this update]([param:Number deltaTimeInSeconds])
Advances the global mixer time and updates the animation.
This is usually done in the render loop, passing [page:Clock.getDelta clock.getDelta] scaled by the mixer's [page:.timeScale timeScale].
[method:this setTime]([param:Number timeInSeconds])
Sets the global mixer to a specific time and updates the animation
accordingly.
This is useful when you need to jump to an exact time in an animation. The
input parameter will be scaled by the mixer's [page:.timeScale timeScale].
[method:undefined uncacheClip]([param:AnimationClip clip])
Deallocates all memory resources for a clip. Before using this method make
sure to call [page:AnimationAction.stop]() for all related actions.
[method:undefined uncacheRoot]([param:Object3D root])
Deallocates all memory resources for a root object. Before using this
method make sure to call [page:AnimationAction.stop]() for all related
actions or alternatively [page:.stopAllAction]() when the mixer operates
on a single root.
[method:undefined uncacheAction]([param:AnimationClip clip], [param:Object3D optionalRoot])
Deallocates all memory resources for an action. Before using this method
make sure to call [page:AnimationAction.stop]() to deactivate the action.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Texture] →
[name]
Creates a texture from a canvas element.
This is almost the same as the base [page:Texture Texture] class, except
that it sets [page:Texture.needsUpdate needsUpdate] to `true` immediately.
Constructor
[name]( [param:HTMLElement canvas], [param:Constant mapping],
[param:Constant wrapS], [param:Constant wrapT], [param:Constant magFilter],
[param:Constant minFilter], [param:Constant format],
[param:Constant type], [param:Number anisotropy] )
[page:HTMLElement canvas] -- The HTML canvas element from which to load
the texture.
[page:Constant mapping] -- How the image is applied to the object. An
object type of [page:Textures THREE.UVMapping]. See [page:Textures mapping constants] for other choices.
[page:Constant wrapS] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant wrapT] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant magFilter] -- How the texture is sampled when a texel
covers more than one pixel. The default is [page:Textures THREE.LinearFilter].
See [page:Textures magnification filter constants]
for other choices.
[page:Constant minFilter] -- How the texture is sampled when a texel
covers less than one pixel. The default is [page:Textures THREE.LinearMipmapLinearFilter].
See [page:Textures minification filter constants] for other choices.
[page:Constant format] -- The format used in the texture. See
[page:Textures format constants] for other choices.
[page:Constant type] -- Default is [page:Textures THREE.UnsignedByteType].
See [page:Textures type constants] for other choices.
[page:Number anisotropy] -- The number of samples taken along the axis
through the pixel that has the highest density of texels. By default, this
value is `1`. A higher value gives a less blurry result than a basic mipmap,
at the cost of more texture samples being used. Use
[page:WebGLrenderer.getMaxAnisotropy renderer.getMaxAnisotropy]() to find
the maximum valid anisotropy value for the GPU; this value is usually a
power of 2.
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean isCanvasTexture]
Read-only flag to check if a given object is of type [name].
[property:Boolean needsUpdate]
True by default. This is required so that the canvas data is loaded.
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Texture] →
[name]
Creates a three-dimensional texture from raw data, with parameters to
divide it into width, height, and depth.
Constructor
[name]( [param:TypedArray data], [param:Number width], [param:Number height], [param:Number depth] )
[page:Object data] --
[link:https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView ArrayBufferView] of the texture.
[page:Number width] -- width of the texture.
[page:Number height] -- height of the texture.
[page:Number depth] -- depth of the texture.
Code Example
This creates a [name] with repeating data, 0 to 255
// create a buffer with some data
const sizeX = 64;
const sizeY = 64;
const sizeZ = 64;
const data = new Uint8Array( sizeX * sizeY * sizeZ );
let i = 0;
for ( let z = 0; z < sizeZ; z ++ ) {
for ( let y = 0; y < sizeY; y ++ ) {
for ( let x = 0; x < sizeX; x ++ ) {
data[ i ] = i % 256;
i ++;
}
}
}
// use the buffer to create the texture
const texture = new THREE.Data3DTexture( data, sizeX, sizeY, sizeZ );
texture.needsUpdate = true;
Examples
[example:webgl2_materials_texture3d WebGL2 / materials / texture3d]
[example:webgl2_materials_texture3d_partialupdate WebGL2 / materials / texture3d / partialupdate]
[example:webgl2_volume_cloud WebGL2 / volume / cloud]
[example:webgl2_volume_perlin WebGL2 / volume / perlin]
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean flipY]
Whether the texture is flipped along the Y axis when uploaded to the GPU.
Default is `false`.
[property:Boolean generateMipmaps]
Whether to generate mipmaps (if possible) for the texture. Default is
`false`.
[property:Image image]
Overridden with a record type holding data, width and height and depth.
[property:Boolean isData3DTexture]
Read-only flag to check if a given object is of type [name].
[property:number magFilter]
How the texture is sampled when a texel covers more than one pixel. The
default is [page:Textures THREE.NearestFilter], which uses the value of
the closest texel.
See the [page:Textures texture constants] page for details.
[property:number minFilter]
How the texture is sampled when a texel covers less than one pixel. The
default is [page:Textures THREE.NearestFilter], which uses the value of
the closest texel.
See the [page:Textures texture constants] page for details.
[property:number unpackAlignment]
`1` by default. Specifies the alignment requirements for the start of each
pixel row in memory. The allowable values are 1 (byte-alignment), 2 (rows
aligned to even-numbered bytes), 4 (word-alignment), and 8 (rows start on
double-word boundaries). See
[link:https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glPixelStorei.xhtml glPixelStorei] for more information.
[property:number wrapR]
This defines how the texture is wrapped in the depth direction.
The default is [page:Textures THREE.ClampToEdgeWrapping], where the edge
is clamped to the outer edge texels. The other two choices are
[page:Textures THREE.RepeatWrapping] and [page:Textures THREE.MirroredRepeatWrapping].
See the [page:Textures texture constants] page for details.
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
[name] generates instances of [page:BufferGeometry] from a Signed Distance Function
Uses
Mikola Lysenko's Isosurface
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { SDFGeometryGenerator } from 'three/addons/geometries/SDFGeometryGenerator.js';
Code Example
const generator = new SDFGeometryGenerator( renderer );
const sdf = 'float dist( vec3 p ){ return length(p) - 0.5; }' // glsl
const geometry = generator.generate( 64, sdf, 1 ); // ~> THREE.BufferGeometry
Examples
[example:webgl_geometry_sdf geometry / sdf ]
Constructor
[name]( [param:WebGLRenderer renderer] )
[page:WebGLRenderer renderer] -- The renderer used to render the scene.
Methods
[method:BufferGeometry generate]( [param:Int resolution], [param:String distanceField], [param:Int bounds] )
resolution
- Int [ mandatory ] Amount of 'voxels' used for triangulation. Must be power of 2.
Gets heavy after 256, most machines won't be able to process over 512. Defaults to 64.
distanceField
- String [ mandatory ] String with glsl distance function. Name of function must be 'dist', with a vec3 argument. ( see code above ). Defaults to a sphere distance.
bounds
- Int [ optional ] Bounds in which signed distance field will be evaluated. Defaults to 1.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/SDFGeometry.js examples/jsm/geometries/SDFGeometryGenerator.js]

[name]
Orbit controls allow the camera to orbit around a target.
To use this, as with all files in the /examples directory, you will have to
include the file separately in your HTML.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
Code Example
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();
function animate() {
requestAnimationFrame( animate );
// required if controls.enableDamping or controls.autoRotate are set to true
controls.update();
renderer.render( scene, camera );
}
Examples
[example:misc_controls_orbit misc / controls / orbit ]
Constructor
[name]( [param:Camera object], [param:HTMLDOMElement domElement] )
[page:Camera object]: (required) The camera to be controlled. The camera must not be a child of another object, unless that object is the scene itself.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Events
change
Fires when the camera has been transformed by the controls.
start
Fires when an interaction was initiated.
end
Fires when an interaction has finished.
Properties
[property:Boolean autoRotate]
Set to true to automatically rotate around the target.
Note that if this is enabled, you must call [page:.update]
() in your animation loop. If you want the auto-rotate speed to be independent of the frame rate (the refresh rate of the display), you must pass the time `deltaTime`, in seconds, to [page:.update]().
[property:Float autoRotateSpeed]
How fast to rotate around the target if [page:.autoRotate] is true. Default is 2.0, which equates to 30 seconds
per orbit at 60fps.
Note that if [page:.autoRotate] is enabled, you must call [page:.update]
() in your animation loop.
[property:Float dampingFactor]
The damping inertia used if [page:.enableDamping] is set to `true`. Default is `0.05`.
Note that for this to work, you must
call [page:.update] () in your animation loop.
[property:HTMLDOMElement domElement]
The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will
not set up new event listeners.
[property:Boolean enabled]
When set to `false`, the controls will not respond to user input. Default is `true`.
[property:Boolean enableDamping]
Set to true to enable damping (inertia), which can be used to give a sense of weight to the controls. Default is false.
Note that if this is enabled, you must call [page:.update] () in your animation loop.
[property:Boolean enablePan]
Enable or disable camera panning. Default is true.
[property:Boolean enableRotate]
Enable or disable horizontal and vertical rotation of the camera. Default is true.
Note that it is possible to disable a single axis by setting the min and max of the
[page:.minPolarAngle polar angle] or [page:.minAzimuthAngle azimuth angle] to the same value,
which will cause the vertical or horizontal rotation to be fixed at that value.
[property:Boolean enableZoom]
Enable or disable zooming (dollying) of the camera.
[property:Float keyPanSpeed]
How fast to pan the camera when the keyboard is used. Default is 7.0 pixels per keypress.
[property:Object keys]
This object contains references to the keycodes for controlling camera panning. Default is the 4 arrow keys.
controls.keys = {
LEFT: 'ArrowLeft', //left arrow
UP: 'ArrowUp', // up arrow
RIGHT: 'ArrowRight', // right arrow
BOTTOM: 'ArrowDown' // down arrow
}
See [link:https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code KeyboardEvent.code] for a full list of keycodes.
[property:Float maxAzimuthAngle]
How far you can orbit horizontally, upper limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI ). Default is Infinity.
[property:Float maxDistance]
How far you can dolly out ( [page:PerspectiveCamera] only ). Default is Infinity.
[property:Float maxPolarAngle]
How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI.
[property:Float maxZoom]
How far you can zoom out ( [page:OrthographicCamera] only ). Default is Infinity.
[property:Float minTargetRadius]
How close you can get the target to the 3D [page:.cursor]. Default is 0.
[property:Float maxTargetRadius]
How far you can move the target from the 3D [page:.cursor]. Default is Infinity.
[property:Float minAzimuthAngle]
How far you can orbit horizontally, lower limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI ). Default is Infinity.
[property:Float minDistance]
How far you can dolly in ( [page:PerspectiveCamera] only ). Default is 0.
[property:Float minPolarAngle]
How far you can orbit vertically, lower limit. Range is 0 to Math.PI radians, and default is 0.
[property:Float minZoom]
How far you can zoom in ( [page:OrthographicCamera] only ). Default is 0.
[property:Object mouseButtons]
This object contains references to the mouse actions used by the controls.
controls.mouseButtons = {
LEFT: THREE.MOUSE.ROTATE,
MIDDLE: THREE.MOUSE.DOLLY,
RIGHT: THREE.MOUSE.PAN
}
[property:Camera object]
The camera being controlled.
[property:Float panSpeed]
Speed of panning. Default is 1.
[property:Vector3 position0]
Used internally by the [page:.saveState] and [page:.reset] methods.
[property:Float rotateSpeed]
Speed of rotation. Default is 1.
[property:Boolean screenSpacePanning]
Defines how the camera's position is translated when panning. If true, the camera pans in screen space.
Otherwise, the camera pans in the plane orthogonal to the camera's up direction.
Default is `true`.
[property:Vector3 target0]
Used internally by the [page:.saveState] and [page:.reset] methods.
[property:Vector3 target]
The focus point of the controls, the [page:.object] orbits around this. It can be updated manually at any point to change
the focus of the controls.
[property:Vector3 cursor]
The focus point of the [page:.minTargetRadius] and [page:.maxTargetRadius] limits. It can be updated manually at any point to change the center of interest for the [page:.target].
[property:Object touches]
This object contains references to the touch actions used by the controls.
controls.touches = {
ONE: THREE.TOUCH.ROTATE,
TWO: THREE.TOUCH.DOLLY_PAN
}
[property:Float zoom0]
Used internally by the [page:.saveState] and [page:.reset] methods.
[property:Float zoomSpeed]
Speed of zooming / dollying. Default is 1.
[property:Boolean zoomToCursor]
Setting this property to `true` allows to zoom to the cursor's position. Default is `false`.
Methods
[method:undefined dispose] ()
Remove all the event listeners.
[method:radians getAzimuthalAngle] ()
Get the current horizontal rotation, in radians.
[method:radians getPolarAngle] ()
Get the current vertical rotation, in radians.
[method:Float getDistance] ()
Returns the distance from the camera to the target.
[method:undefined listenToKeyEvents] ( [param:HTMLDOMElement domElement] )
Adds key event listeners to the given DOM element. `window` is a recommended argument for using this method.
[method:undefined reset] ()
Reset the controls to their state from either the last time the [page:.saveState] was called, or the initial state.
[method:undefined saveState] ()
Save the current state of the controls. This can later be recovered with [page:.reset].
[method:undefined stopListenToKeyEvents] ()
Removes the key event listener previously defined with [page:.listenToKeyEvents]().
[method:Boolean update] ( [param:Number deltaTime] )
Update the controls. Must be called after any manual changes to the camera's transform,
or in the update loop if [page:.autoRotate] or [page:.enableDamping] are set. `deltaTime`, in seconds, is optional,
and is only required if you want the auto-rotate speed to be independent of the frame rate (the refresh rate of the display).
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/OrbitControls.js examples/jsm/controls/OrbitControls.js]

[name]
An exporter for the STL file format.
[link:https://en.wikipedia.org/wiki/STL_(file_format) STL] files describe only the surface geometry
of a three-dimensional object without any representation of color, texture or other common model attributes.
The STL format specifies both ASCII and binary representations, with binary being more compact.
STL files contain no scale information or indexes, and the units are arbitrary.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
Code Example
// Instantiate an exporter
const exporter = new STLExporter();
// Configure export options
const options = { binary: true }
// Parse the input and generate the STL encoded output
const result = exporter.parse( mesh, options );
Examples
[example:misc_exporter_stl]
Constructor
[name]()
Creates a new [name].
Methods
[method:Object parse]( [param:Object3D scene], [param:Object options] )
[page:Object3D scene] — Scene, Mesh, or other Object3D based class containing Meshes to encode.
[page:Options options] — Optional export options
binary - bool. Return an ASCII encoded string or binary data buffer. Default is `false`.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/exporters/STLExporter.js examples/jsm/exporters/STLExporter.js]

[name]
This class is an alternative implementation of [page:FlyControls].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
Examples
[example:webgl_geometry_terrain webgl / geometry / terrain ]
Constructor
[name]( [param:Camera object], [param:HTMLDOMElement domElement] )
[page:Camera object]: The camera to be controlled.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Creates a new instance of [name].
Properties
[property:Boolean activeLook]
Whether or not it's possible to look around. Default is `true`.
[property:Boolean autoForward]
Whether or not the camera is automatically moved forward. Default is `false`.
[property:Boolean constrainVertical]
Whether or not looking around is vertically constrained by [[page:.verticalMin], [page:.verticalMax]]. Default is `false`.
[property:HTMLDOMElement domElement]
The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will
not set up new event listeners.
[property:Boolean enabled]
Whether or not the controls are enabled. Default is `true`.
[property:Number heightCoef]
Determines how much faster the camera moves when it's y-component is near [page:.heightMax]. Default is *1*.
[property:Number heightMax]
Upper camera height limit used for movement speed adjustment. Default is *1*.
[property:Number heightMin]
Lower camera height limit used for movement speed adjustment. Default is *0*.
[property:Boolean heightSpeed]
Whether or not the camera's height influences the forward movement speed. Default is `false`.
Use the properties [page:.heightCoef], [page:.heightMin] and [page:.heightMax] for configuration.
[property:Boolean lookVertical]
Whether or not it's possible to vertically look around. Default is `true`.
[property:Number lookSpeed]
The look around speed. Default is `0.005`.
[property:Boolean mouseDragOn]
Whether or not the mouse is pressed down. Read-only property.
[property:Number movementSpeed]
The movement speed. Default is *1*.
[property:Camera object]
The camera to be controlled.
[property:Number verticalMax]
How far you can vertically look around, upper limit. Range is 0 to Math.PI radians. Default is `Math.PI`.
[property:Number verticalMin]
How far you can vertically look around, lower limit. Range is 0 to Math.PI radians. Default is *0*.
Methods
[method:undefined dispose] ()
Should be called if the controls is no longer required.
[method:undefined handleResize] ()
Should be called if the application window is resized.
[method:FirstPersonControls lookAt]( [param:Vector3 vector] )
[method:FirstPersonControls lookAt]( [param:Float x], [param:Float y], [param:Float z] )
vector - A vector representing the target position.
Optionally, the x, y, z components of the world space position.
Ensures the controls orient the camera towards the defined target position.
[method:undefined update] ( [param:Number delta] )
[page:Number delta]: Time delta value.
Updates the controls. Usually called in the animation loop.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/FirstPersonControls.js examples/jsm/controls/FirstPersonControls.js]

[page:BufferGeometry] →
[name]
Generate geometry representing a parametric surface.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
Code Example
const geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const klein = new THREE.Mesh( geometry, material );
scene.add( klein );
Constructor
[name]([param:Function func], [param:Integer slices], [param:Integer stacks])
func — A function that takes in a [page:Float u] and [page:Float v] value each between 0 and 1 and modifies a third [page:Vector3] argument. Default is a function that generates a curved plane surface.
slices — The count of slices to use for the parametric function. Default is *8*.
stacks — The count of stacks to use for the parametric function. Default is *8*.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/ParametricGeometry.js examples/jsm/geometries/ParametricGeometry.js]

[name]
AnimationActions schedule the performance of the animations which are
stored in [page:AnimationClip AnimationClips].
Note: Most of AnimationAction's methods can be chained.
For an overview of the different elements of the three.js animation system
see the "Animation System" article in the "Next Steps" section of the
manual.
Constructor
[name]( [param:AnimationMixer mixer], [param:AnimationClip clip],
[param:Object3D localRoot] )
[page:AnimationMixer mixer] - the `AnimationMixer` that is controlled by
this action.
[page:AnimationClip clip] - the `AnimationClip` that holds the animation
data for this action.
[page:Object3D localRoot] - the root object on which this action is
performed.
[page:Number blendMode] - defines how the animation is blended/combined
when two or more animations are simultaneously played.
Note: Instead of calling this constructor directly you should instantiate
an AnimationAction with [page:AnimationMixer.clipAction] since this method
provides caching for better performance.
Properties
[property:Number blendMode]
Defines how the animation is blended/combined when two or more animations
are simultaneously played. Valid values are *NormalAnimationBlendMode*
(default) and *AdditiveAnimationBlendMode*.
[property:Boolean clampWhenFinished]
If `clampWhenFinished` is set to true the animation will automatically be
[page:.paused paused] on its last frame.
If `clampWhenFinished` is set to false, [page:.enabled enabled] will
automatically be switched to false when the last loop of the action has
finished, so that this action has no further impact.
Default is `false`.
Note: `clampWhenFinished` has no impact if the action is interrupted (it
has only an effect if its last loop has really finished).
[property:Boolean enabled]
Setting `enabled` to `false` disables this action, so that it has no
impact. Default is `true`.
When the action is re-enabled, the animation continues from its current
[page:.time time] (setting `enabled` to `false` doesn't reset the
action).
Note: Setting `enabled` to `true` doesn’t automatically restart the
animation. Setting `enabled` to `true` will only restart the animation
immediately if the following condition is fulfilled: [page:.paused paused]
is `false`, this action has not been deactivated in the meantime (by
executing a [page:.stop stop] or [page:.reset reset] command), and neither
[page:.weight weight] nor [page:.timeScale timeScale] is `0`.
[property:Number loop]
The looping mode (can be changed with [page:.setLoop setLoop]). Default is
[page:Animation THREE.LoopRepeat] (with an infinite number of
[page:.repetitions repetitions])
Must be one of these constants:
[page:Animation THREE.LoopOnce] - playing the clip once,
[page:Animation THREE.LoopRepeat] - playing the clip with the chosen
number of `repetitions`, each time jumping from the end of the clip
directly to its beginning,
[page:Animation THREE.LoopPingPong] - playing the clip with the chosen
number of `repetitions`, alternately playing forward and backward.
[property:Boolean paused]
Setting `paused` to `true` pauses the execution of the action by setting
the effective time scale to `0`. Default is `false`.
[property:Number repetitions]
The number of repetitions of the performed [page:AnimationClip] over the
course of this action. Can be set via [page:.setLoop setLoop]. Default is
`Infinity`.
Setting this number has no effect, if the [page:.loop loop mode] is set to
[page:Animation THREE.LoopOnce].
[property:Number time]
The local time of this action (in seconds, starting with `0`).
The value gets clamped or wrapped to `0...clip.duration` (according to the
loop state). It can be scaled relatively to the global mixer time by
changing [page:.timeScale timeScale] (using [page:.setEffectiveTimeScale setEffectiveTimeScale] or [page:.setDuration setDuration]).
[property:Number timeScale]
Scaling factor for the [page:.time time]. A value of `0` causes the
animation to pause. Negative values cause the animation to play backwards.
Default is `1`.
Properties/methods concerning `timeScale` (respectively `time`) are:
[page:.getEffectiveTimeScale getEffectiveTimeScale],
[page:.halt halt],
[page:.paused paused],
[page:.setDuration setDuration],
[page:.setEffectiveTimeScale setEffectiveTimeScale],
[page:.stopWarping stopWarping],
[page:.syncWith syncWith],
[page:.warp warp].
[property:Number weight]
The degree of influence of this action (in the interval `[0, 1]`). Values
between `0` (no impact) and `1` (full impact) can be used to blend between
several actions. Default is `1`.
Properties/methods concerning `weight` are:
[page:.crossFadeFrom crossFadeFrom],
[page:.crossFadeTo crossFadeTo],
[page:.enabled enabled],
[page:.fadeIn fadeIn],
[page:.fadeOut fadeOut],
[page:.getEffectiveWeight getEffectiveWeight],
[page:.setEffectiveWeight setEffectiveWeight],
[page:.stopFading stopFading].
[property:Boolean zeroSlopeAtEnd]
Enables smooth interpolation without separate clips for start, loop and
end. Default is `true`.
[property:Boolean zeroSlopeAtStart]
Enables smooth interpolation without separate clips for start, loop and
end. Default is `true`.
Methods
[method:this crossFadeFrom]( [param:AnimationAction fadeOutAction], [param:Number durationInSeconds], [param:Boolean warpBoolean] )
Causes this action to [page:.fadeIn fade in], fading out another action
simultaneously, within the passed time interval. This method can be
chained.
If warpBoolean is true, additional [page:.warp warping] (gradually changes
of the time scales) will be applied.
Note: Like with `fadeIn`/`fadeOut`, the fading starts/ends with a weight
of `1`.
[method:this crossFadeTo]( [param:AnimationAction fadeInAction], [param:Number durationInSeconds], [param:Boolean warpBoolean] )
Causes this action to [page:.fadeOut fade out], fading in another action
simultaneously, within the passed time interval. This method can be
chained.
If warpBoolean is true, additional [page:.warp warping] (gradually changes
of the time scales) will be applied.
Note: Like with `fadeIn`/`fadeOut`, the fading starts/ends with a weight
of `1`.
[method:this fadeIn]( [param:Number durationInSeconds] )
Increases the [page:.weight weight] of this action gradually from `0` to
`1`, within the passed time interval. This method can be chained.
[method:this fadeOut]( [param:Number durationInSeconds] )
Decreases the [page:.weight weight] of this action gradually from `1` to
`0`, within the passed time interval. This method can be chained.
[method:Number getEffectiveTimeScale]()
Returns the effective time scale (considering the current states of
warping and [page:.paused paused]).
[method:Number getEffectiveWeight]()
Returns the effective weight (considering the current states of fading and
[page:.enabled enabled]).
[method:AnimationClip getClip]()
Returns the clip which holds the animation data for this action.
[method:AnimationMixer getMixer]()
Returns the mixer which is responsible for playing this action.
[method:Object3D getRoot]()
Returns the root object on which this action is performed.
[method:this halt]( [param:Number durationInSeconds] )
Decelerates this animation's speed to `0` by decreasing [page:.timeScale timeScale] gradually (starting from its current value), within the passed
time interval. This method can be chained.
[method:Boolean isRunning]()
Returns true if the action’s [page:.time time] is currently running.
In addition to being activated in the mixer (see [page:.isScheduled isScheduled]) the following conditions must be fulfilled: [page:.paused paused] is equal to false, [page:.enabled enabled] is equal to true,
[page:.timeScale timeScale] is different from `0`, and there is no
scheduling for a delayed start ([page:.startAt startAt]).
Note: `isRunning` being true doesn’t necessarily mean that the animation
can actually be seen. This is only the case, if [page:.weight weight] is
additionally set to a non-zero value.
[method:Boolean isScheduled]()
Returns true, if this action is activated in the mixer.
Note: This doesn’t necessarily mean that the animation is actually running
(compare the additional conditions for [page:.isRunning isRunning]).
[method:this play]()
Tells the mixer to activate the action. This method can be chained.
Note: Activating this action doesn’t necessarily mean that the animation
starts immediately: If the action had already finished before (by reaching
the end of its last loop), or if a time for a delayed start has been set
(via [page:.startAt startAt]), a [page:.reset reset] must be executed
first. Some other settings ([page:.paused paused]=true, [page:.enabled enabled]=false, [page:.weight weight]=0, [page:.timeScale timeScale]=0)
can prevent the animation from playing, too.
[method:this reset]()
Resets the action. This method can be chained.
This method sets [page:.paused paused] to false, [page:.enabled enabled]
to true, [page:.time time] to `0`, interrupts any scheduled fading and
warping, and removes the internal loop count and scheduling for delayed
starting.
Note: .`reset` is always called by [page:.stop stop], but .`reset` doesn’t
call .`stop` itself. This means: If you want both, resetting and stopping,
don’t call .`reset`; call .`stop` instead.
[method:this setDuration]( [param:Number durationInSeconds] )
Sets the duration for a single loop of this action (by adjusting
[page:.timeScale timeScale] and stopping any scheduled warping). This
method can be chained.
[method:this setEffectiveTimeScale]( [param:Number timeScale] )
Sets the [page:.timeScale timeScale] and stops any scheduled warping. This
method can be chained.
If [page:.paused paused] is false, the effective time scale (an internal
property) will also be set to this value; otherwise the effective time
scale (directly affecting the animation at this moment) will be set to
`0`.
Note: .`paused` will not be switched to `true` automatically, if
.`timeScale` is set to `0` by this method.
[method:this setEffectiveWeight]( [param:Number weight] )
Sets the [page:.weight weight] and stops any scheduled fading. This method
can be chained.
If [page:.enabled enabled] is true, the effective weight (an internal
property) will also be set to this value; otherwise the effective weight
(directly affecting the animation at this moment) will be set to `0`.
Note: .`enabled` will not be switched to `false` automatically, if
.`weight` is set to `0` by this method.
[method:this setLoop]( [param:Number loopMode], [param:Number repetitions])
Sets the [page:.loop loop mode] and the number of [page:.repetitions repetitions]. This method can be chained.
[method:this startAt]( [param:Number startTimeInSeconds] )
Defines the time for a delayed start (usually passed as
[page:AnimationMixer.time] + deltaTimeInSeconds). This method can be
chained.
Note: The animation will only start at the given time, if .`startAt` is
chained with [page:.play play], or if the action has already been
activated in the mixer (by a previous call of .`play`, without stopping or
resetting it in the meantime).
[method:this stop]()
Tells the mixer to deactivate this action. This method can be chained.
The action will be immediately stopped and completely [page:.reset reset].
Note: You can stop all active actions on the same mixer in one go via
[page:AnimationMixer.stopAllAction mixer.stopAllAction].
[method:this stopFading]()
Stops any scheduled [page:.fadeIn fading] which is applied to this action.
This method can be chained.
[method:this stopWarping]()
Stops any scheduled [page:.warp warping] which is applied to this action.
This method can be chained.
[method:this syncWith]( [param:AnimationAction otherAction] )
Synchronizes this action with the passed other action. This method can be
chained.
Synchronizing is done by setting this action’s [page:.time time] and
[page:.timeScale timeScale] values to the corresponding values of the
other action (stopping any scheduled warping).
Note: Future changes of the other action's `time` and `timeScale` will not
be detected.
[method:this warp]( [param:Number startTimeScale], [param:Number endTimeScale], [param:Number durationInSeconds] )
Changes the playback speed, within the passed time interval, by modifying
[page:.timeScale timeScale] gradually from `startTimeScale` to
`endTimeScale`. This method can be chained.
Events
There are two events indicating when a single loop of the action
respectively the entire action has finished. You can react to them with:
mixer.addEventListener( 'loop', function( e ) { …} ); // properties of e: type, action and loopDelta
mixer.addEventListener( 'finished', function( e	) { …} ); // properties of e: type, action and direction
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
A polyhedron is a solid in three dimensions with flat faces. This class
will take an array of vertices, project them onto a sphere, and then
divide them up to the desired level of detail. This class is used by
[page:DodecahedronGeometry], [page:IcosahedronGeometry],
[page:OctahedronGeometry], and [page:TetrahedronGeometry] to generate
their respective geometries.
Code Example
const verticesOfCube = [
-1,-1,-1,
1,-1,-1,
1, 1,-1,
-1, 1,-1,
-1,-1, 1,
1,-1, 1,
1, 1, 1,
-1, 1, 1,
];
const indicesOfFaces = [
2,1,0,
0,3,2,
0,4,7,
7,3,0,
0,1,5,
5,4,0,
1,2,6,
6,5,1,
2,3,7,
7,6,2,
4,5,6,
6,7,4
];
const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
Constructor
[name]([param:Array vertices], [param:Array indices], [param:Float radius], [param:Integer detail])
vertices — [page:Array] of points of the form [1,1,1, -1,-1,-1, ... ]
indices — [page:Array] of indices that make up the faces of the form
[0,1,2, 2,3,0, ... ]
radius — [page:Float] - The radius of the final shape
detail — [page:Integer] - How many levels to subdivide the geometry. The
more detail, the smoother the shape.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A class containing useful utility functions for camera manipulation.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import * as CameraUtils from 'three/addons/utils/CameraUtils.js';
Methods
[method:undefined frameCorners]( [param:PerspectiveCamera camera], [param:Vector3 bottomLeftCorner], [param:Vector3 bottomRightCorner], [param:Vector3 topLeftCorner], [param:boolean estimateViewFrustum] )
Set a PerspectiveCamera's projectionMatrix and quaternion to exactly frame the corners of an arbitrary rectangle using [link:https://web.archive.org/web/20191110002841/http://csc.lsu.edu/~kooima/articles/genperspective/index.html Kooima's Generalized Perspective Projection formulation].
NOTE: This function ignores the standard parameters; do not call updateProjectionMatrix() after this! toJSON will also not capture the off-axis matrix generated by this function.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/CameraUtils.js examples/jsm/utils/CameraUtils.js]

[page:Loader] →
[name]
A loader for loading a JSON resource in the
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
This uses the [page:FileLoader] internally for loading files.
Code Example
const loader = new THREE.ObjectLoader();
loader.load(
// resource URL
"models/json/example.json",
// onLoad callback
// Here the loaded data is assumed to be an object
function ( obj ) {
// Add the loaded object to the scene
scene.add( obj );
},
// onProgress callback
function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
// onError callback
function ( err ) {
console.error( 'An error happened' );
}
);
// Alternatively, to parse a previously loaded JSON structure
const object = loader.parse( a_json_object );
scene.add( object );
Examples
[example:webgl_materials_lightmap WebGL / materials / lightmap]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] — Will be called when load completes. The argument
will be the loaded [page:Object3D object].
[page:Function onProgress] (optional) — Will be called while load
progresses. The argument will be the ProgressEvent instance, which
contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and call onLoad with the parsed response content.
[method:Object3D parse]( [param:Object json], [param:Function onLoad] )
[page:Object json] — required. The JSON source to parse.
[page:Function onLoad] — Will be called when parsed completes. The
argument will be the parsed [page:Object3D object].
Parse a `JSON` structure and return a three.js object. This is used
internally by [page:.load]() but can also be used directly to parse a
previously loaded JSON structure.
[method:Object parseGeometries]( [param:Object json] )
[page:Object json] — required. The JSON source to parse.
This is used by [page:.parse]() to parse any [page:BufferGeometry geometries] in the JSON structure.
[method:Object parseMaterials]( [param:Object json] )
[page:Object json] — required. The JSON source to parse.
This is used by [page:.parse]() to parse any materials in the JSON
structure using [page:MaterialLoader].
[method:Object parseAnimations]( [param:Object json] )
[page:Object json] — required. The JSON source to parse.
This is used by [page:.parse]() to parse any animations in the JSON
structure, using [page:AnimationClip.parse]().
[method:Object parseImages]( [param:Object json] )
[page:Object json] — required. The JSON source to parse.
This is used by [page:.parse]() to parse any images in the JSON structure,
using [page:ImageLoader].
[method:Object parseTextures]( [param:Object json] )
[page:Object json] — required. The JSON source to parse.
This is used by [page:.parse]() to parse any textures in the JSON
structure.
[method:Object3D parseObject]( [param:Object json], [param:BufferGeometry geometries], [param:Material materials], [param:AnimationClip animations] )
[page:Object json] — required. The JSON source to parse.
[page:BufferGeometry geometries] — required. The geometries of the
JSON.
[page:Material materials] — required. The materials of the JSON.
[page:AnimationClip animations] — required. The animations of the JSON.
This is used by [page:.parse]() to parse any 3D objects in the JSON
structure.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A representation of mesh, line, or point geometry. Includes vertex
positions, face indices, normals, colors, UVs, and custom attributes
within buffers, reducing the cost of passing all this data to the GPU.
To read and edit data in BufferGeometry attributes, see
[page:BufferAttribute] documentation.
Code Example
const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
-1.0, -1.0,
1.0, // v0
1.0, -1.0,
1.0, // v1
1.0,
1.0,
1.0, // v2
1.0,
1.0,
1.0, // v3
-1.0,
1.0,
1.0, // v4
-1.0, -1.0,
1.0
// v5
] );
// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry, material );
Code Example (Index)
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array( [
-1.0, -1.0,
1.0, // v0
1.0, -1.0,
1.0, // v1
1.0,
1.0,
1.0, // v2
-1.0,
1.0,
1.0, // v3
] );
const indices = [
0, 1, 2,
2, 3, 0,
];
geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry, material );
Examples
[example:webgl_buffergeometry Mesh with non-indexed faces]
[example:webgl_buffergeometry_indexed Mesh with indexed faces]
[example:webgl_buffergeometry_lines Lines]
[example:webgl_buffergeometry_lines_indexed Indexed Lines]
[example:webgl_buffergeometry_custom_attributes_particles Particles]
[example:webgl_buffergeometry_rawshader Raw Shaders]
Constructor
[name]()
This creates a new [name]. It also sets several properties to a default
value.
Properties
[property:Object attributes]
This hashmap has as id the name of the attribute to be set and as value
the [page:BufferAttribute buffer] to set it to. Rather than accessing this
property directly, use [page:.setAttribute] and [page:.getAttribute] to
access attributes of this geometry.
[property:Box3 boundingBox]
Bounding box for the bufferGeometry, which can be calculated with
[page:.computeBoundingBox](). Default is `null`.
[property:Sphere boundingSphere]
Bounding sphere for the bufferGeometry, which can be calculated with
[page:.computeBoundingSphere](). Default is `null`.
[property:Object drawRange]
Determines the part of the geometry to render. This should not be set
directly, instead use [page:.setDrawRange]. Default is
{ start: 0, count: Infinity }
For non-indexed BufferGeometry, count is the number of vertices to render.
For indexed BufferGeometry, count is the number of indices to render.
[property:Array groups]
Split the geometry into groups, each of which will be rendered in a
separate WebGL draw call. This allows an array of materials to be used
with the geometry.
Each group is an object of the form:
{ start: Integer, count: Integer, materialIndex: Integer }
where start specifies the first element in this draw call – the first
vertex for non-indexed geometry, otherwise the first triangle index. Count
specifies how many vertices (or indices) are included, and materialIndex
specifies the material array index to use.
Use [page:.addGroup] to add groups, rather than modifying this array
directly.
Every vertex and index must belong to exactly one group — groups must not
share vertices or indices, and must not leave vertices or indices unused.
[property:Integer id]
Unique number for this bufferGeometry instance.
[property:BufferAttribute index]
Allows for vertices to be re-used across multiple triangles; this is
called using "indexed triangles". Each triangle is associated with the
indices of three vertices. This attribute therefore stores the index of
each vertex for each triangular face. If this attribute is not set, the
[page:WebGLRenderer renderer] assumes that each three contiguous positions
represent a single triangle. Default is `null`.
[property:Boolean isBufferGeometry]
Read-only flag to check if a given object is of type [name].
[property:Object morphAttributes]
Hashmap of [page:BufferAttribute]s holding details of the geometry's morph
targets.
Note: Once the geometry has been rendered, the morph attribute data cannot
be changed. You will have to call [page:.dispose](), and create a new
instance of [name].
[property:Boolean morphTargetsRelative]
Used to control the morph target behavior; when set to true, the morph
target data is treated as relative offsets, rather than as absolute
positions/normals. Default is `false`.
[property:String name]
Optional name for this bufferGeometry instance. Default is an empty
string.
[property:Object userData]
An object that can be used to store custom data about the BufferGeometry.
It should not hold references to functions as these will not be cloned.
Default is an empty object `{}`.
[property:String uuid]
[link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID] of
this object instance. This gets automatically assigned and shouldn't be
edited.
Methods
[page:EventDispatcher EventDispatcher] methods are available on this
class.
[method:undefined addGroup]( [param:Integer start], [param:Integer count], [param:Integer materialIndex] )
Adds a group to this geometry; see the [page:BufferGeometry.groups groups]
property for details.
[method:this applyMatrix4]( [param:Matrix4 matrix] )
Applies the matrix transform to the geometry.
[method:this applyQuaternion]( [param:Quaternion quaternion] )
Applies the rotation represented by the quaternion to the geometry.
[method:this center] ()
Center the geometry based on the bounding box.
[method:undefined clearGroups]( )
Clears all groups.
[method:BufferGeometry clone]()
Creates a clone of this BufferGeometry.
[method:undefined computeBoundingBox]()
Computes the bounding box of the geometry, and updates the [page:.boundingBox] attribute.
The bounding box is not computed by the engine; it must be computed by your app.
You may need to recompute the bounding box if the geometry vertices are modified.
[method:undefined computeBoundingSphere]()
Computes the bounding sphere of the geometry, and updates the [page:.boundingSphere] attribute.
The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
You may need to recompute the bounding sphere if the geometry vertices are modified.
[method:undefined computeTangents]()
Calculates and adds a tangent attribute to this geometry.
The computation is only supported for indexed geometries and if position,
normal, and uv attributes are defined. When using a tangent space normal
map, prefer the MikkTSpace algorithm provided by
[page:BufferGeometryUtils.computeMikkTSpaceTangents] instead.
[method:undefined computeVertexNormals]()
Computes vertex normals for the given vertex data. For indexed geometries, the method sets each vertex normal to be the average of the face normals of the faces that share that vertex.
For non-indexed geometries, vertices are not shared, and the method sets each vertex normal to be the same as the face normal.
[method:this copy]( [param:BufferGeometry bufferGeometry] )
Copies another BufferGeometry to this BufferGeometry.
[method:BufferAttribute deleteAttribute]( [param:String name] )
Deletes the [page:BufferAttribute attribute] with the specified name.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:BufferAttribute getAttribute]( [param:String name] )
Returns the [page:BufferAttribute attribute] with the specified name.
[method:BufferAttribute getIndex] ()
Return the [page:.index] buffer.
[method:Boolean hasAttribute]( [param:String name] )
Returns `true` if the attribute with the specified name exists.
[method:this lookAt] ( [param:Vector3 vector] )
vector - A world vector to look at.
Rotates the geometry to face a point in space. This is typically done as a
one time operation, and not during a loop. Use [page:Object3D.lookAt] for
typical real-time mesh usage.
[method:undefined normalizeNormals]()
Every normal vector in a geometry will have a magnitude of `1`. This will
correct lighting on the geometry surfaces.
[method:this rotateX] ( [param:Float radians] )
Rotate the geometry about the X axis. This is typically done as a one time
operation, and not during a loop. Use [page:Object3D.rotation] for typical
real-time mesh rotation.
[method:this rotateY] ( [param:Float radians] )
Rotate the geometry about the Y axis. This is typically done as a one time
operation, and not during a loop. Use [page:Object3D.rotation] for typical
real-time mesh rotation.
[method:this rotateZ] ( [param:Float radians] )
Rotate the geometry about the Z axis. This is typically done as a one time
operation, and not during a loop. Use [page:Object3D.rotation] for typical
real-time mesh rotation.
[method:this scale] ( [param:Float x], [param:Float y], [param:Float z] )
Scale the geometry data. This is typically done as a one time operation,
and not during a loop. Use [page:Object3D.scale] for typical real-time
mesh scaling.
[method:this setAttribute]( [param:String name], [param:BufferAttribute attribute] )
Sets an attribute to this geometry. Use this rather than the attributes
property, because an internal hashmap of [page:.attributes] is maintained
to speed up iterating over attributes.
[method:undefined setDrawRange] ( [param:Integer start], [param:Integer count] )
Set the [page:.drawRange] property. For non-indexed BufferGeometry, count
is the number of vertices to render. For indexed BufferGeometry, count is
the number of indices to render.
[method:this setFromPoints] ( [param:Array points] )
Sets the attributes for this BufferGeometry from an array of points.
[method:this setIndex] ( [param:BufferAttribute index] )
Set the [page:.index] buffer.
[method:Object toJSON]()
Convert the buffer geometry to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
[method:BufferGeometry toNonIndexed]()
Return a non-index version of an indexed BufferGeometry.
[method:this translate] ( [param:Float x], [param:Float y], [param:Float z] )
Translate the geometry. This is typically done as a one time operation,
and not during a loop. Use [page:Object3D.position] for typical real-time
mesh translation.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
A class for generating torus geometries.
Code Example
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
Constructor
[name]([param:Float radius], [param:Float tube], [param:Integer radialSegments], [param:Integer tubularSegments], [param:Float arc])
radius - Radius of the torus, from the center of the torus to the center
of the tube. Default is `1`.
tube — Radius of the tube. Default is `0.4`.
radialSegments — Default is `12`
tubularSegments — Default is `48`.
arc — Central angle. Default is Math.PI * 2.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] →
[name]
Create a smooth 3d
cubic bezier curve
, defined by a start point, endpoint and two control points.
Code Example
const curve = new THREE.CubicBezierCurve3(
new THREE.Vector3( -10, 0, 0 ),
new THREE.Vector3( -5, 15, 0 ),
new THREE.Vector3( 20, 15, 0 ),
new THREE.Vector3( 10, 0, 0 )
);
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
Constructor
[name]( [param:Vector3 v0], [param:Vector3 v1], [param:Vector3 v2],
[param:Vector3 v3] )
[page:Vector3 v0] – The starting point.
[page:Vector3 v1] – The first control point.
[page:Vector3 v2] – The second control point.
[page:Vector3 v3] – The ending point.
Properties
See the base [page:Curve] class for common properties.
[property:Vector3 v0]
The starting point.
[property:Vector3 v1]
The first control point.
[property:Vector3 v2]
The second control point.
[property:Vector3 v3]
The ending point.
Methods
See the base [page:Curve] class for common Methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
An axis object to visualize the 3 axes in a simple way.
The X axis is red. The Y axis is green. The Z axis is blue.
Code Example
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
Examples
[example:webgl_buffergeometry_compression WebGL / buffergeometry / compression]
[example:webgl_geometry_convex WebGL / geometry / convex]
[example:webgl_loader_nrrd WebGL / loader / nrrd]
Constructor
[name]( [param:Number size] )
[page:Number size] -- (optional) size of the lines representing the axes.
Default is `1`.
Properties
See the base [page:LineSegments] class for common properties.
Methods
See the base [page:LineSegments] class for common methods.
[method:this setColors]( [param:Color xAxisColor], [param:Color yAxisColor], [param:Color zAxisColor] )
Sets the axes colors to [page:Color xAxisColor], [page:Color yAxisColor],
[page:Color zAxisColor].
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Mesh] →
[name]
Creates a simulated lens flare that tracks a light. [name] can only be used when setting the `alpha` context parameter of [page:WebGLRenderer] to `true`.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';
Code Example
const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load( "textures/lensflare/lensflare0.png" );
const textureFlare1 = textureLoader.load( "textures/lensflare/lensflare2.png" );
const textureFlare2 = textureLoader.load( "textures/lensflare/lensflare3.png" );
const lensflare = new Lensflare();
lensflare.addElement( new LensflareElement( textureFlare0, 512, 0 ) );
lensflare.addElement( new LensflareElement( textureFlare1, 512, 0 ) );
lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );
light.add( lensflare );
Examples
[example:webgl_lensflares WebGL / lensflares]
Constructor
LensflareElement( [param:Texture texture], [param:Float size], [param:Float distance], [param:Color color] )
[page:Texture texture] - THREE.Texture to use for the flare.
[page:Float size] - (optional) size in pixels
[page:Float distance] - (optional) (0-1) from light source (0 = at light source)
[page:Color color] - (optional) the [page:Color] of the lens flare
Properties
See the base [page:Mesh] class for common properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/Lensflare.js examples/jsm/objects/Lensflare.js]

[page:Texture] →
[name]
This class can only be used in combination with
[page:WebGLRenderer.copyFramebufferToTexture]().
const pixelRatio = window.devicePixelRatio;
const textureSize = 128 * pixelRatio;
// instantiate a framebuffer texture
const frameTexture = new FramebufferTexture( textureSize, textureSize );
// calculate start position for copying part of the frame data
const vector = new Vector2();
vector.x = ( window.innerWidth * pixelRatio / 2 ) - ( textureSize / 2 );
vector.y = ( window.innerHeight * pixelRatio / 2 ) - ( textureSize / 2 );
// render the scene
renderer.clear();
renderer.render( scene, camera );
// copy part of the rendered frame into the framebuffer texture
renderer.copyFramebufferToTexture( vector, frameTexture );
Examples
[example:webgl_framebuffer_texture]
Constructor
[name]( [param:Number width], [param:Number height] )
[page:Number width] -- The width of the texture.
[page:Number height] -- The height of the texture.
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean generateMipmaps]
Whether to generate mipmaps for the [name]. Default value is `false`.
[property:Boolean isFramebufferTexture]
Read-only flag to check if a given object is of type [name].
[property:number magFilter]
How the texture is sampled when a texel covers more than one pixel. The
default is [page:Textures THREE.NearestFilter], which uses the value of
the closest texel.
See [page:Textures texture constants] for details.
[property:number minFilter]
How the texture is sampled when a texel covers less than one pixel. The
default is [page:Textures THREE.NearestFilter], which uses the value of
the closest texel.
See [page:Textures texture constants] for details.
[property:Boolean needsUpdate]
True by default. This is required so that the canvas data is loaded.
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
This class is designed to assist with
[link:https://en.wikipedia.org/wiki/Ray_casting raycasting]. Raycasting is
used for mouse picking (working out what objects in the 3d space the mouse
is over) amongst other things.
Code Example
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function onPointerMove( event ) {
// calculate pointer position in normalized device coordinates
// (-1 to +1) for both components
pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function render() {
// update the picking ray with the camera and pointer position
raycaster.setFromCamera( pointer, camera );
// calculate objects intersecting the picking ray
const intersects = raycaster.intersectObjects( scene.children );
for ( let i = 0; i < intersects.length; i ++ ) {
intersects[ i ].object.material.color.set( 0xff0000 );
}
renderer.render( scene, camera );
}
window.addEventListener( 'pointermove', onPointerMove );
window.requestAnimationFrame(render);
Examples
[example:webgl_interactive_cubes Raycasting to a Mesh]
[example:webgl_interactive_cubes_ortho Raycasting to a Mesh in using an OrthographicCamera]
[example:webgl_interactive_buffergeometry Raycasting to a Mesh with BufferGeometry]
[example:webgl_instancing_raycast Raycasting to a InstancedMesh]
[example:webgl_interactive_lines Raycasting to a Line]
[example:webgl_interactive_raycasting_points Raycasting to Points]
[example:webgl_geometry_terrain_raycast Terrain raycasting]
[example:webgl_interactive_voxelpainter Raycasting to paint voxels]
[example:webgl_raycaster_texture Raycast to a Texture]
Constructor
[name]( [param:Vector3 origin], [param:Vector3 direction], [param:Float near], [param:Float far] )
[page:Vector3 origin] — The origin vector where the ray casts from.
[page:Vector3 direction] — The direction vector that gives direction to
the ray. Should be normalized.
[page:Float near] — All results returned are further away than near. Near
can't be negative. Default value is `0`.
[page:Float far] — All results returned are closer than far. Far can't be
lower than near. Default value is Infinity.
This creates a new raycaster object.
Properties
[property:Float far]
The far factor of the raycaster. This value indicates which objects can be
discarded based on the distance. This value shouldn't be negative and
should be larger than the near property.
[property:Float near]
The near factor of the raycaster. This value indicates which objects can
be discarded based on the distance. This value shouldn't be negative and
should be smaller than the far property.
[property:Camera camera]
The camera to use when raycasting against view-dependent objects such as
billboarded objects like [page:Sprites]. This field can be set manually or
is set when calling "setFromCamera". Defaults to null.
[property:Layers layers]
Used by [name] to selectively ignore 3D objects when performing
intersection tests. The following code example ensures that only 3D
objects on layer `1` will be honored by the instance of [name].
raycaster.layers.set( 1 );
object.layers.enable( 1 );
[property:Object params]
An object with the following properties:
{
Mesh: {},
Line: { threshold: 1 },
LOD: {},
Points: { threshold: 1 },
Sprite: {}
}
Where threshold is the precision of the raycaster when intersecting
objects, in world units.
[property:Ray ray]
The [Page:Ray] used for the raycasting.
Methods
[method:undefined set]( [param:Vector3 origin], [param:Vector3 direction])
[page:Vector3 origin] — The origin vector where the ray casts from.
[page:Vector3 direction] — The normalized direction vector that gives
direction to the ray.
Updates the ray with a new origin and direction. Please note that this
method only copies the values from the arguments.
[method:undefined setFromCamera]( [param:Vector2 coords], [param:Camera camera] )
[page:Vector2 coords] — 2D coordinates of the mouse, in normalized device
coordinates (NDC)---X and Y components should be between `-1` and `1`.
[page:Camera camera] — camera from which the ray should originate
Updates the ray with a new origin and direction.
[method:this setFromXRController]( [param:WebXRController controller] )
[page:WebXRController controller] — The controller to copy the position and direction from.
Updates the ray with a new origin and direction.
[method:Array intersectObject]( [param:Object3D object], [param:Boolean recursive], [param:Array optionalTarget] )
[page:Object3D object] — The object to check for intersection with the
ray.
[page:Boolean recursive] — If true, it also checks all descendants.
Otherwise it only checks intersection with the object. Default is true.
[page:Array optionalTarget] — (optional) target to set the result.
Otherwise a new [page:Array] is instantiated. If set, you must clear this
array prior to each call (i.e., array.length = 0;).
Checks all intersection between the ray and the object with or without the
descendants. Intersections are returned sorted by distance, closest first.
An array of intersections is returned...
[ { distance, point, face, faceIndex, object }, ... ]
[page:Float distance] – distance between the origin of the ray and the
intersection
[page:Vector3 point] – point of intersection, in world coordinates
[page:Object face] – intersected face
[page:Integer faceIndex] – index of the intersected face
[page:Object3D object] – the intersected object
[page:Vector2 uv] - U,V coordinates at point of intersection
[page:Vector2 uv1] - Second set of U,V coordinates at point of
intersection
[page:Vector3 normal] - interpolated normal vector at point of
intersection
[page:Integer instanceId] – The index number of the instance where the ray
intersects the InstancedMesh
`Raycaster` delegates to the [page:Object3D.raycast raycast] method of the
passed object, when evaluating whether the ray intersects the object or
not. This allows [page:Mesh meshes] to respond differently to ray casting
than [page:Line lines] and [page:Points pointclouds].
*Note* that for meshes, faces must be pointed towards the origin of the
[page:.ray ray] in order to be detected; intersections of the ray passing
through the back of a face will not be detected. To raycast against both
faces of an object, you'll want to set the [page:Mesh.material material]'s
[page:Material.side side] property to `THREE.DoubleSide`.
[method:Array intersectObjects]( [param:Array objects], [param:Boolean recursive], [param:Array optionalTarget] )
[page:Array objects] — The objects to check for intersection with the
ray.
[page:Boolean recursive] — If true, it also checks all descendants of the
objects. Otherwise it only checks intersection with the objects. Default
is true.
[page:Array optionalTarget] — (optional) target to set the result.
Otherwise a new [page:Array] is instantiated. If set, you must clear this
array prior to each call (i.e., array.length = 0;).
Checks all intersection between the ray and the objects with or without
the descendants. Intersections are returned sorted by distance, closest
first. Intersections are of the same form as those returned by
[page:.intersectObject].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
An exporter for `EXR`.
[link:https://www.openexr.com/ EXR] ( Extended Dynamic Range) is an
[link:https://github.com/AcademySoftwareFoundation/openexr open format specification]
for professional-grade image storage format of the motion picture industry. The purpose of
format is to accurately and efficiently represent high-dynamic-range scene-linear image data
and associated metadata. The library is widely used in host application software where accuracy
is critical, such as photorealistic rendering, texture access, image compositing, deep compositing,
and DI.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { EXRExporter } from 'three/addons/exporters/EXRExporter.js';
Code Example
// Instantiate a exporter
const exporter = new EXRExporter();
// Parse the input render target data and generate the EXR output
const EXR = exporter.parse( renderer, renderTarget, options );
downloadFile( EXR );
Constructor
[name]()
Creates a new [name].
Methods
[method:null parse]( [param:WebGLRenderer renderer], [param:WebGLRenderTarget renderTarget], [param:Object options] )
[page:Function renderTarget] — WebGLRenderTarget containing data used for exporting EXR image.
[page:Options options] — Export options.
type - Output datatype for internal EXR data. Available options:
THREE.HalfFloatType // default option
THREE.FloatType
compression - Internal compression algorithm. Available options:
NO_COMPRESSION
ZIP_COMPRESSION // default option
ZIPS_COMPRESSION
Generates a .exr output from the input render target.
[method:null parse]( [param:DataTexture dataTexture], [param:Object options] )
[page:Function dataTexture] — DataTexture containing data used for exporting EXR image.
[page:Options options] — Export options (details above).
Generates a .exr output from the input data texture.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/exporters/EXRExporter.js examples/jsm/exporters/EXRExporter.js]

[name]
An object with several loader utility functions.
Functions
[method:String decodeText]( [param:TypedArray array] )
[page:TypedArray array] — A stream of bytes as a typed array.
The function takes a stream of bytes as input and returns a string
representation.
[method:String extractUrlBase]( [param:String url] )
[page:String url] — The url to extract the base url from.
Extract the base from the URL.
[method:String resolveURL]( [param:String url], [param:String path] )
[page:String url] — The absolute or relative url resolve. [page:String path] — The base path for relative urls to be resolved against.
Resolves relative urls against the given path. Absolute paths, data urls,
and blob urls will be returned as is. Invalid urls will return an empty
string.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

WebGLRenderer Constants
Cull Face Modes
THREE.CullFaceNone
THREE.CullFaceBack
THREE.CullFaceFront
THREE.CullFaceFrontBack
[page:constant CullFaceNone] disables face culling.
[page:constant CullFaceBack] culls back faces (default).
[page:constant CullFaceFront] culls front faces.
[page:constant CullFaceFrontBack] culls both front and back faces.
Shadow Types
THREE.BasicShadowMap
THREE.PCFShadowMap
THREE.PCFSoftShadowMap
THREE.VSMShadowMap
These define the WebGLRenderer's [page:WebGLRenderer.shadowMap.type shadowMap.type] property.
[page:constant BasicShadowMap] gives unfiltered shadow maps - fastest, but
lowest quality.
[page:constant PCFShadowMap] filters shadow maps using the
Percentage-Closer Filtering (PCF) algorithm (default).
[page:constant PCFSoftShadowMap] filters shadow maps using the
Percentage-Closer Filtering (PCF) algorithm with better soft shadows
especially when using low-resolution shadow maps.
[page:constant VSMShadowMap] filters shadow maps using the Variance Shadow
Map (VSM) algorithm. When using VSMShadowMap all shadow receivers will
also cast shadows.
Tone Mapping
THREE.NoToneMapping
THREE.LinearToneMapping
THREE.ReinhardToneMapping
THREE.CineonToneMapping
THREE.ACESFilmicToneMapping
THREE.AgXToneMapping
THREE.NeutralToneMapping
THREE.CustomToneMapping
These define the WebGLRenderer's [page:WebGLRenderer.toneMapping toneMapping] property. This is used to approximate the appearance of high
dynamic range (HDR) on the low dynamic range medium of a standard computer
monitor or mobile device's screen.
THREE.LinearToneMapping, THREE.ReinhardToneMapping, THREE.CineonToneMapping, THREE.ACESFilmicToneMapping,
THREE.AgXToneMapping and THREE.NeutralToneMapping are built-inimplementations of tone mapping.
THREE.CustomToneMapping expects a custom implementation by modyfing GLSL code of the material's fragment shader.
See the [example:webgl_tonemapping WebGL / tonemapping] example.
THREE.NeutralToneMapping is an implementation based on the Khronos 3D Commerce Group standard tone mapping.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/constants.js src/constants.js]

[page:Interpolant] →
[name]
Code Example
const interpolant = new THREE.[name](
new Float32Array( 2 ),
new Float32Array( 2 ),
1,
new Float32Array( 1 )
);
interpolant.evaluate( 0.5 );
Constructor
[name]( parameterPositions, sampleValues, sampleSize, resultBuffer )
parameterPositions -- array of positions
sampleValues -- array of samples
sampleSize -- number of samples
resultBuffer -- buffer to store the interpolation results.
Properties
[property:null parameterPositions]
[property:null resultBuffer]
[property:null sampleValues]
[property:Object settings]
[property:null valueSize]
Methods
[method:Array evaluate]( [param:Number t] )
Evaluate the interpolant at position *t*.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Represents the data source of a texture.
Constructor
[name]( [param:Any data] )
[page:Any data] -- The data definition of a texture. Default is `null`.
Properties
[property:Any data]
The actual data of a texture. The type of this property depends on the
texture that uses this instance.
[property:Boolean isSource]
Read-only flag to check if a given object is of type [name].
[property:Boolean needsUpdate]
When the property is set to `true`, the engine allocates the memory for the texture (if necessary) and triggers the actual texture upload to the GPU next time the source is used.
[property:Boolean dataReady]
This property is only relevant when [page:.needUpdate] is set to `true` and provides more control on how texture data should be processed.
When `dataReady` is set to `false`, the engine performs the memory allocation (if necessary) but does not transfer the data into the GPU memory. Default is `true`.
[property:String uuid]
[link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID] of
this object instance. This gets automatically assigned, so this shouldn't
be edited.
[property:Integer version]
This starts at `0` and counts how many times [page:Source.needsUpdate .needsUpdate] is set to `true`.
Methods
[method:Object toJSON]( [param:Object meta] )
meta -- optional object containing metadata.
Convert the data source to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
An implementation of the earcut polygon triangulation algorithm. The code
is a port of [link:https://github.com/mapbox/earcut mapbox/earcut].
Methods
[method:Array triangulate]( data, holeIndices, dim )
data -- A flat array of vertex coordinates.
holeIndices -- An array of hole indices if any.
dim -- The number of coordinates per vertex in the input array.
Triangulates the given shape definition by returning an array of
triangles. A triangle is defined by three consecutive integers
representing vertex indices.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
This can be used as a helper object to view the edges of a
[page:BufferGeometry geometry].
Code Example
const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );
Examples
[example:webgl_helpers helpers]
Constructor
[name]( [param:BufferGeometry geometry], [param:Integer thresholdAngle] )
geometry — Any geometry object.
thresholdAngle — An edge is only rendered if the angle (in degrees)
between the face normals of the adjoining faces exceeds this value.
default = 1 degree.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Webgl Shader Library for three.js
Properties
Methods
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A class containing useful utility functions for scene manipulation.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import * as SceneUtils from 'three/addons/utils/SceneUtils.js';
Methods
[method:Group createMeshesFromInstancedMesh]( [param:InstancedMesh instancedMesh] )
instancedMesh -- The instanced mesh.
Creates a new group object that contains a new mesh for each instance of the given instanced mesh.
[method:Group createMeshesFromMultiMaterialMesh]( [param:Mesh mesh] )
mesh -- A mesh with multiple materials.
Converts the given multi-material mesh into an instance of [page:Group] holding for each material a separate mesh.
[method:Group createMultiMaterialObject]( [param:BufferGeometry geometry], [param:Array materials] )
geometry -- The geometry for the set of materials.
materials -- The materials for the object.
Creates a new Group that contains a new mesh for each material defined in materials. Beware that this is not the same as an array of materials which defines multiple materials for 1 mesh.
This is mostly useful for objects that need both a material and a wireframe implementation.
[method:T reduceVertices]( [param:Object3D object], [param:function func], [param:T initialValue] )
object -- The object to traverse (uses [page:Object3D.traverseVisible traverseVisible] internally).
func -- The binary function applied for the reduction. Must have the signature: (value: T, vertex: Vector3): T.
initialValue -- The value to initialize the reduction with. This is required
as it also sets the reduction type, which is not required to be Vector3.
Akin to Array.prototype.reduce(), but operating on the vertices of all the
visible descendant objects, in world space. Additionally, it can operate as a
transform-reduce, returning a different type T than the Vector3 input. This
can be useful for e.g. fitting a viewing frustum to the scene.
[method:undefined sortInstancedMesh]( [param:InstancedMesh mesh], [param:Function compareFn] )
mesh -- InstancedMesh in which instances will be sorted.
compareFn -- Comparator function defining the sort order.
Sorts the instances within an [page:InstancedMesh], according to a user-defined
callback. The callback will be provided with two arguments,
indexA
and
indexB
, and must return a numerical value. See
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description Array.prototype.sort]
for more information on sorting callbacks and their return values.
Because of the high performance cost, three.js does not sort
[page:InstancedMesh] instances automatically. Manually sorting may be
helpful to improve display of alpha blended materials (back to front),
and to reduce overdraw in opaque materials (front to back).
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/SceneUtils.js examples/jsm/utils/SceneUtils.js]

[page:BufferGeometry] → [page:PolyhedronGeometry] →
[name]
A class for generating a tetrahedron geometries.
Constructor
[name]([param:Float radius], [param:Integer detail])
radius — Radius of the tetrahedron. Default is `1`.
detail — Default is `0`. Setting this to a value greater than `0` adds
vertices making it no longer a tetrahedron.
Properties
See the base [page:PolyhedronGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:PolyhedronGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] → [page:EllipseCurve] →
[name]
Alias for [page:EllipseCurve].
Properties
See the [page:EllipseCurve] class for common properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] →
[name]
Create a smooth 2d
cubic bezier curve
, defined by a start point, endpoint and two control points.
Code Example
const curve = new THREE.CubicBezierCurve(
new THREE.Vector2( -10, 0 ),
new THREE.Vector2( -5, 15 ),
new THREE.Vector2( 20, 15 ),
new THREE.Vector2( 10, 0 )
);
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
Constructor
[name] ( [param:Vector2 v0], [param:Vector2 v1], [param:Vector2 v2],
[param:Vector2 v3] )
[page:Vector2 v0] – The starting point.
[page:Vector2 v1] – The first control point.
[page:Vector2 v2] – The second control point.
[page:Vector2 v3] – The ending point.
Properties
See the base [page:Curve] class for common properties.
[property:Vector2 v0]
The starting point.
[property:Vector2 v1]
The first control point.
[property:Vector2 v2]
The second control point.
[property:Vector2 v3]
The ending point.
Methods
See the base [page:Curve] class for common Methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
[link:http://en.wikipedia.org/wiki/Frustum Frustums] are used to determine
what is inside the camera's field of view. They help speed up the
rendering process - objects which lie outside a camera's frustum can
safely be excluded from rendering.
This class is mainly intended for use internally by a renderer for
calculating a [page:Camera camera] or [page:LightShadow.camera shadowCamera]'s frustum.
Constructor
[name]([param:Plane p0], [param:Plane p1], [param:Plane p2], [param:Plane p3], [param:Plane p4], [param:Plane p5])
[page:Plane p0] - (optional) defaults to a new [page:Plane].
[page:Plane p1] - (optional) defaults to a new [page:Plane].
[page:Plane p2] - (optional) defaults to a new [page:Plane].
[page:Plane p3] - (optional) defaults to a new [page:Plane].
[page:Plane p4] - (optional) defaults to a new [page:Plane].
[page:Plane p5] - (optional) defaults to a new [page:Plane].
Creates a new [name].
Properties
[property:Array planes]
Array of 6 [page:Plane planes].
Methods
[method:Frustum clone]()
Return a new Frustum with the same parameters as this one.
[method:Boolean containsPoint]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] to test.
Checks to see if the frustum contains the [page:Vector3 point].
[method:this copy]( [param:Frustum frustum] )
[page:Frustum frustum] - The frustum to copy
Copies the properties of the passed [page:Frustum frustum] into this one.
[method:Boolean intersectsBox]( [param:Box3 box] )
[page:Box3 box] - [page:Box3] to check for intersection.
Return true if [page:Box3 box] intersects with this frustum.
[method:Boolean intersectsObject]( [param:Object3D object] )
Checks whether the [page:Object3D object]'s
[page:BufferGeometry.boundingSphere bounding sphere] is intersecting the
Frustum.
Note that the object must have a [page:BufferGeometry geometry] so that
the bounding sphere can be calculated.
[method:Boolean intersectsSphere]( [param:Sphere sphere] )
[page:Sphere sphere] - [page:Sphere] to check for intersection.
Return true if [page:Sphere sphere] intersects with this frustum.
[method:Boolean intersectsSprite]( [param:Sprite sprite] )
Checks whether the [page:Sprite sprite] is intersecting the Frustum.
[method:this set]( [param:Plane p0], [param:Plane p1], [param:Plane p2], [param:Plane p3], [param:Plane p4], [param:Plane p5] )
Sets the frustum from the passed planes. No plane order is implied.
Note that this method only copies the values from the given objects.
[method:this setFromProjectionMatrix]( [param:Matrix4 matrix] )
[page:Matrix4 matrix] - Projection [page:Matrix4] used to set the
[page:.planes planes]
Sets the frustum planes from the projection matrix.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
Helper object to assist with visualizing a [page:DirectionalLight]'s
effect on the scene. This consists of plane and a line representing the
light's position and direction.
Code Example
const light = new THREE.DirectionalLight( 0xFFFFFF );
scene.add( light );
const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );
Constructor
[name]( [param:DirectionalLight light], [param:Number size], [param:Hex color] )
[page:DirectionalLight light]-- The light to be visualized.
[page:Number size] -- (optional) dimensions of the plane. Default is
`1`.
[page:Hex color] -- (optional) if this is not the set the helper will take
the color of the light.
Properties
See the base [page:Object3D] class for common properties.
[property:Line lightPlane]
Contains the line mesh showing the location of the directional light.
[property:DirectionalLight light]
Reference to the [page:DirectionalLight directionalLight] being
visualized.
[property:Object matrix]
Reference to the light's [page:Object3D.matrixWorld matrixWorld].
[property:Object matrixAutoUpdate]
See [page:Object3D.matrixAutoUpdate]. Set to `false` here as the helper is
using the light's [page:Object3D.matrixWorld matrixWorld].
[property:hex color]
The color parameter passed in the constructor. Default is `undefined`. If
this is changed, the helper's color will update the next time
[page:.update update] is called.
Methods
See the base [page:Object3D] class for common properties.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:undefined update]()
Updates the helper to match the position and direction of the [page:.light directionalLight] being visualized.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
This class is used to convert a series of shapes to an array of
[page:Path]s, for example an SVG shape to a path.
Constructor
[name]( )
Creates a new ShapePath. Unlike a [page:Path], no points are passed in as
the ShapePath is designed to be generated after creation.
Properties
[property:Array subPaths]
Array of [page:Path]s.
[property:Array currentPath]
The current [page:Path] that is being generated.
[property:Color color]
[page:Color] of the shape, by default set to white (0xffffff).
Methods
[method:this moveTo]( [param:Float x], [param:Float y] )
Starts a new [page:Path] and calls [page:Path.moveTo]( x, y ) on that
[page:Path]. Also points [page:ShapePath.currentPath currentPath] to that
[page:Path].
[method:this lineTo]( [param:Float x], [param:Float y] )
This creates a line from the [page:ShapePath.currentPath currentPath]'s
offset to X and Y and updates the offset to X and Y.
[method:this quadraticCurveTo]( [param:Float cpX], [param:Float cpY], [param:Float x], [param:Float y] )
This creates a quadratic curve from the [page:ShapePath.currentPath currentPath]'s offset to x and y with cpX and cpY as control point and
updates the [page:ShapePath.currentPath currentPath]'s offset to x and y.
[method:this bezierCurveTo]( [param:Float cp1X], [param:Float cp1Y], [param:Float cp2X], [param:Float cp2Y], [param:Float x], [param:Float y] )
This creates a bezier curve from the [page:ShapePath.currentPath currentPath]'s offset to x and y with cp1X, cp1Y and cp2X, cp2Y as control
points and updates the [page:ShapePath.currentPath currentPath]'s offset
to x and y.
[method:this splineThru] ( [param:Array points] )
points - An array of [page:Vector2]s
Connects a new [page:SplineCurve] onto the [page:ShapePath.currentPath currentPath].
[method:Array toShapes]( [param:Boolean isCCW] )
isCCW -- Changes how solids and holes are generated
Converts the [page:ShapePath.subPaths subPaths] array into an array of
Shapes. By default solid shapes are defined clockwise (CW) and holes are
defined counterclockwise (CCW). If isCCW is set to true, then those are
flipped.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/extras/core/ShapePath.js src/extras/core/ShapePath.js]

Animation Constants
Loop Modes
THREE.LoopOnce
THREE.LoopRepeat
THREE.LoopPingPong
Interpolation Modes
THREE.InterpolateDiscrete
THREE.InterpolateLinear
THREE.InterpolateSmooth
Ending Modes
THREE.ZeroCurvatureEnding
THREE.ZeroSlopeEnding
THREE.WrapAroundEnding
Animation Blend Modes
THREE.NormalAnimationBlendMode
THREE.AdditiveAnimationBlendMode
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/constants.js src/constants.js]

[name]
An object with various functions to assist with animations, used
internally.
Methods
[method:Array convertArray]( array, type, forceClone )
Converts an array to a specific type.
[method:Array flattenJSON]( jsonKeys, times, values, valuePropertyName )
Used for parsing AOS keyframe formats.
[method:Array getKeyframeOrder]( times )
Returns an array by which times and values can be sorted.
[method:Boolean isTypedArray]( object )
Returns `true` if the object is a typed array.
[method:AnimationClip makeClipAdditive]( [param:AnimationClip targetClip], [param:Number referenceFrame], [param:AnimationClip referenceClip], [param:Number fps] )
Converts the keyframes of the given animation clip to an additive format.
[method:Array sortedArray]( values, stride, order )
Sorts the array previously returned by [page:AnimationUtils.getKeyframeOrder getKeyframeOrder].
[method:AnimationClip subclip]( [param:AnimationClip clip], [param:String name], [param:Number startFrame], [param:Number endFrame], [param:Number fps] )
Creates a new clip, containing only the segment of the original clip between the given frames.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
Class for loading [page:AnimationClip AnimationClips] in JSON format. This
uses the [page:FileLoader] internally for loading files.
Code Example
// instantiate a loader
const loader = new THREE.AnimationLoader();
// load a resource
loader.load(
// resource URL
'animations/animation.js',
// onLoad callback
function ( animations ) {
// animations is an array of AnimationClips
},
// onProgress callback
function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
// onError callback
function ( err ) {
console.log( 'An error happened' );
}
);
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] — Will be called when load completes. The argument
will be the loaded [page:AnimationClip animation clips].
[page:Function onProgress] (optional) — Will be called while load
progresses. The argument will be the ProgressEvent instance, which
contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called if load errors.
Begin loading from url and pass the loaded animation to onLoad.
[method:Array parse]( [param:JSON json] )
[page:JSON json] — required
Parse the JSON object and return an array of animation clips. Individual
clips in the object will be parsed with [page:AnimationClip.parse].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] →
[name]
Create a smooth 2d spline curve from a series of points. Internally this
uses [page:Interpolations.CatmullRom] to create the curve.
Code Example
// Create a sine-like wave
const curve = new THREE.SplineCurve( [
new THREE.Vector2( -10, 0 ),
new THREE.Vector2( -5, 5 ),
new THREE.Vector2( 0, 0 ),
new THREE.Vector2( 5, -5 ),
new THREE.Vector2( 10, 0 )
] );
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const splineObject = new THREE.Line( geometry, material );
Constructor
[name]( [param:Array points] )
points – An array of [page:Vector2] points that define the curve.
Properties
See the base [page:Curve] class for common properties.
[property:Array points]
The array of [page:Vector2] points that define the curve.
Methods
See the base [page:Curve] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading a `.svg` resource.
[link:https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Scalable Vector Graphics] is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
Code Example
// instantiate a loader
const loader = new SVGLoader();
// load a SVG resource
loader.load(
// resource URL
'data/svgSample.svg',
// called when the resource is loaded
function ( data ) {
const paths = data.paths;
const group = new THREE.Group();
for ( let i = 0; i < paths.length; i ++ ) {
const path = paths[ i ];
const material = new THREE.MeshBasicMaterial( {
color: path.color,
side: THREE.DoubleSide,
depthWrite: false
} );
const shapes = SVGLoader.createShapes( path );
for ( let j = 0; j < shapes.length; j ++ ) {
const shape = shapes[ j ];
const geometry = new THREE.ShapeGeometry( shape );
const mesh = new THREE.Mesh( geometry, material );
group.add( mesh );
}
}
scene.add( group );
},
// called when loading is in progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_svg]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.svg` file.
[page:Function onLoad] — (optional) A function to be called after loading is successfully completed. The function receives an array of [page:ShapePath] as an argument.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains [page:Integer total] and [page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.
Begin loading from url and call onLoad with the response content.
Static Methods
[method:Array createShapes]( [param:ShapePath shape] )
[page:ShapePath shape] — A ShapePath from the array of [page:ShapePath], given as argument in the onLoad function for the load function of [page:SVGLoader].
Returns one or more [page:Shape] objects created from the [param:ShapePath shape] provided as an argument in this function.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/SVGLoader.js examples/jsm/loaders/SVGLoader.js]

[page:Object3D] → [page:Light] →
[name]
This light gets emitted from a single point in one direction, along a cone
that increases in size the further from the light it gets.
This light can cast shadows - see the [page:SpotLightShadow] page for
details.
Code Example
// white spotlight shining from the side, modulated by a texture, casting a shadow
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
spotLight.map = new THREE.TextureLoader().load( url );
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add( spotLight );
Examples
[example:webgl_lights_spotlight lights / spotlight ]
[example:webgl_lights_spotlights lights / spotlights ]
Constructor
[name]( [param:Integer color], [param:Float intensity], [param:Float distance], [param:Radians angle], [param:Float penumbra], [param:Float decay] )
[page:Integer color] - (optional) hexadecimal color of the light. Default
is 0xffffff (white).
[page:Float intensity] - (optional) numeric value of the light's
strength/intensity. Default is `1`.
[page:Float distance] - Maximum range of the light. Default is `0` (no
limit).
[page:Radians angle] - Maximum angle of light dispersion from its
direction whose upper bound is Math.PI/2.
[page:Float penumbra] - Percent of the spotlight cone that is attenuated
due to penumbra. Takes values between zero and `1`. Default is zero.
[page:Float decay] - The amount the light dims along the distance of the
light.
Creates a new [name].
Properties
See the base [page:Light Light] class for common properties.
[property:Float angle]
Maximum extent of the spotlight, in radians, from its direction. Should be
no more than `Math.PI/2`. The default is `Math.PI/3`.
[property:Boolean castShadow]
If set to `true` light will cast dynamic shadows. *Warning*: This is
expensive and requires tweaking to get shadows looking right. See the
[page:SpotLightShadow] for details. The default is `false`.
[property:Float decay]
The amount the light dims along the distance of the light. Default is
`2`.
In context of physically-correct rendering the default value should not be
changed.
[property:Float distance]
When distance is zero, light will attenuate according to inverse-square
law to infinite distance. When distance is non-zero, light will attenuate
according to inverse-square law until near the distance cutoff, where it
will then attenuate quickly and smoothly to `0`. Inherently, cutoffs are
not physically correct.
Default is `0.0`.
[property:Float intensity]
The light's luminous intensity measured in candela (cd). Default is `1`.
Changing the intensity will also change the light's power.
[property:Boolean isSpotLight]
Read-only flag to check if a given object is of type [name].
[property:Float penumbra]
Percent of the spotlight cone that is attenuated due to penumbra. Takes
values between zero and `1`. The default is `0.0`.
[property:Vector3 position]
This is set equal to [page:Object3D.DEFAULT_UP] (0, 1, 0), so that the
light shines from the top down.
[property:Float power]
The light's power.
Power is the luminous power of the light measured in lumens (lm).
Changing the power will also change the light's intensity.
[property:SpotLightShadow shadow]
A [page:SpotLightShadow] used to calculate shadows for this light.
[property:Object3D target]
The Spotlight points from its [page:.position position] to
target.position. The default position of the target is `(0, 0, 0)`.
*Note*: For the target's position to be changed to anything other than the
default, it must be added to the [page:Scene scene] using
scene.add( light.target );
This is so that the target's [page:Object3D.matrixWorld matrixWorld] gets
automatically updated each frame.
It is also possible to set the target to be another object in the scene
(anything with a [page:Object3D.position position] property), like so:
const targetObject = new THREE.Object3D();
scene.add(targetObject);
light.target = targetObject;
The spotlight will now track the target object.
[property:Texture map]
A [page:Texture] used to modulate the color of the light. The spot light
color is mixed with the RGB value of this texture, with a ratio
corresponding to its alpha value. The cookie-like masking effect is
reproduced using pixel values (0, 0, 0, 1-cookie_value). *Warning*:
[page:.map] is disabled if [page:.castShadow] is *false*.
Methods
See the base [page:Light Light] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:this copy]( [param:SpotLight source] )
Copies value of all the properties from the [page:SpotLight source] to
this SpotLight.
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] → [page:ExtrudeGeometry] →
[name]
A class for generating text as a single geometry. It is constructed by providing a string of text, and a set of
parameters consisting of a loaded font and settings for the geometry's parent [page:ExtrudeGeometry].
See the [page:FontLoader] page for additional details.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
Code Example
const loader = new FontLoader();
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
const geometry = new TextGeometry( 'Hello three.js!', {
font: font,
size: 80,
depth: 5,
curveSegments: 12,
bevelEnabled: true,
bevelThickness: 10,
bevelSize: 8,
bevelOffset: 0,
bevelSegments: 5
} );
} );
Examples
[example:webgl_geometry_text geometry / text ]
Constructor
[name]([param:String text], [param:Object parameters])
text — The text that needs to be shown.
parameters — Object that can contains the following parameters.
font — an instance of THREE.Font.
size — Float. Size of the text. Default is 100.
depth — Float. Thickness to extrude text.
Default is 50.
curveSegments — Integer. Number of points on the curves. Default is 12.
bevelEnabled — Boolean. Turn on bevel. Default is False.
bevelThickness — Float. How deep into text bevel goes. Default is 10.
bevelSize — Float. How far from text outline is bevel. Default is 8.
bevelOffset — Float. How far from text outline bevel starts. Default is 0.
bevelSegments — Integer. Number of bevel segments. Default is 3.
Available Fonts
TextGeometry uses
typeface.json
generated fonts.
Some existing fonts can be found located in
/examples/fonts
and must be included in the page.
Font
Weight
Style
File Path
helvetiker
normal
normal
/examples/fonts/helvetiker_regular.typeface.json
helvetiker
bold
normal
/examples/fonts/helvetiker_bold.typeface.json
optimer
normal
normal
/examples/fonts/optimer_regular.typeface.json
optimer
bold
normal
/examples/fonts/optimer_bold.typeface.json
gentilis
normal
normal
/examples/fonts/gentilis_regular.typeface.json
gentilis
bold
normal
/examples/fonts/gentilis_bold.typeface.json
droid sans
normal
normal
/examples/fonts/droid/droid_sans_regular.typeface.json
droid sans
bold
normal
/examples/fonts/droid/droid_sans_bold.typeface.json
droid serif
normal
normal
/examples/fonts/droid/droid_serif_regular.typeface.json
droid serif
bold
normal
/examples/fonts/droid/droid_serif_bold.typeface.json
Properties
See the base [page:ExtrudeGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
Methods
See the base [page:ExtrudeGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/TextGeometry.js examples/jsm/geometries/TextGeometry.js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
Helper object to graphically show the world-axis-aligned bounding box
around an object. The actual bounding box is handled with [page:Box3],
this is just a visual helper for debugging. It can be automatically
resized with the [page:BoxHelper.update] method when the object it's
created from is transformed. Note that the object must have a
[page:BufferGeometry] for this to work, so it won't work with [page:Sprite Sprites].
Code Example
const sphere = new THREE.SphereGeometry();
const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) );
const box = new THREE.BoxHelper( object, 0xffff00 );
scene.add( box );
Examples
[example:webgl_helpers WebGL / helpers]
[example:webgl_loader_nrrd WebGL / loader / nrrd]
[example:webgl_buffergeometry_drawrange WebGL / buffergeometry / drawrange]
Constructor
[name]( [param:Object3D object], [param:Color color] )
[page:Object3D object] -- (optional) the object3D to show the
world-axis-aligned boundingbox.
[page:Color color] -- (optional) hexadecimal value that defines the box's
color. Default is 0xffff00.
Creates a new wireframe box that bounds the passed object. Internally this
uses [page:Box3.setFromObject] to calculate the dimensions. Note that this
includes any children.
Properties
See the base [page:LineSegments] class for common properties.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined update]()
Updates the helper's geometry to match the dimensions of the object,
including any children. See [page:Box3.setFromObject].
[method:this setFromObject]( [param:Object3D object] )
[page:Object3D object] - [page:Object3D] to create the helper of.
Updates the wireframe box for the passed object.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
A continuous line.
This is nearly the same as [page:LineSegments]; the only difference is
that it is rendered using
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements gl.LINE_STRIP] instead of
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements gl.LINES]
Code Example
const material = new THREE.LineBasicMaterial({
color: 0x0000ff
});
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );
Constructor
[name]( [param:BufferGeometry geometry], [param:Material material] )
[page:BufferGeometry geometry] — vertices representing the line
segment(s). Default is a new [page:BufferGeometry].
[page:Material material] — material for the line. Default is a new
[page:LineBasicMaterial].
Properties
See the base [page:Object3D] class for common properties.
[property:BufferGeometry geometry]
Vertices representing the line segment(s).
[property:Boolean isLine]
Read-only flag to check if a given object is of type [name].
[property:Material material]
Material for the line.
[property:Array morphTargetInfluences]
An array of weights typically from 0-1 that specify how much of the morph
is applied. Undefined by default, but reset to a blank array by
[page:.updateMorphTargets]().
[property:Object morphTargetDictionary]
A dictionary of morphTargets based on the morphTarget.name property.
Undefined by default, but rebuilt [page:.updateMorphTargets]().
Methods
See the base [page:Object3D] class for common methods.
[method:this computeLineDistances]()
Computes an array of distance values which are necessary for
[page:LineDashedMaterial]. For each vertex in the geometry, the method
calculates the cumulative length from the current point to the very
beginning of the line.
[method:undefined raycast]( [param:Raycaster raycaster], [param:Array intersects] )
Get intersections between a casted [page:Ray] and this Line.
[page:Raycaster.intersectObject] will call this method.
[method:Line clone]()
Returns a clone of this Line object and its descendants.
[method:undefined updateMorphTargets]()
Updates the morphTargets to have no influence on the object. Resets the
[page:.morphTargetInfluences] and [page:.morphTargetDictionary]
properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Project structure
Every three.js project needs at least one HTML file to define the webpage, and a JavaScript file to run your three.js code. The structure and naming choices below aren't required, but will be used throughout this guide for consistency.
index.html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>My first three.js app</title>
<style>
body { margin: 0; }
</style>
</head>
<body>
<script type="module" src="/main.js"></script>
</body>
</html>
main.js
import * as THREE from 'three';
...
public/
The
public/
folder is sometimes also called a "static" folder, because the files it contains are pushed to the website unchanged. Usually textures, audio, and 3D models will go here.
Now that we've set up the basic project structure, we need a way to run the project locally and access it through a web browser. Installation and local development can be accomplished with npm and a build tool, or by importing three.js from a CDN. Both options are explained in the sections below.
Option 1: Install with NPM and a build tool
Development
Installing from the [link:https://www.npmjs.com/ npm package registry] and using a [link:https://eloquentjavascript.net/10_modules.html#h_zWTXAU93DC build tool] is the recommended approach for most users — the more dependencies your project needs, the more likely you are to run into problems that the static hosting cannot easily resolve. With a build tool, importing local JavaScript files and npm packages should work out of the box, without import maps.
Install [link:https://nodejs.org/ Node.js]. We'll need it to load manage dependencies and to run our build tool.
Install three.js and a build tool, [link:https://vitejs.dev/ Vite], using a [link:https://www.joshwcomeau.com/javascript/terminal-for-js-devs/ terminal] in your project folder. Vite will be used during development, but it isn't part of the final webpage. If you prefer to use another build tool, that's fine — we support modern build tools that can import [link:https://eloquentjavascript.net/10_modules.html#h_zWTXAU93DC ES Modules].
# three.js
npm install --save three
# vite
npm install --save-dev vite
Installation added
node_modules/
and
package.json
to my project. What are they?
npm uses
package.json
to describe which versions of each dependency you've installed. If you have other people working on the project with you, they can install the original versions of each dependency simply by running
npm install
. If you're using version history, commit
package.json
.
npm installs the code for each dependency in a new
node_modules/
folder. When Vite builds your application, it sees imports for 'three' and pulls three.js files automatically from this folder. The
node_modules/
folder is used only during development, and shouldn't be uploaded to your web hosting provider or committed to version history.
From your terminal, run:
npx vite
What is
npx
?
npx is installed with Node.js, and runs command line programs like Vite so that you don't have to search for the right file in
node_modules/
yourself. If you prefer, you can put [link:https://vitejs.dev/guide/#command-line-interface Vite's common commands] into the [link:https://docs.npmjs.com/cli/v9/using-npm/scripts package.json:scripts] list, and use
npm run dev
instead.
If everything went well, you'll see a URL like
http://localhost:5173
appear in your terminal, and can open that URL to see your web application.
The page will be blank — you're ready to [link:#manual/introduction/Creating-a-scene create a scene].
If you want to learn more about these tools before you continue, see:
[link:https://threejs-journey.com/lessons/local-server three.js journey: Local Server]
[link:https://vitejs.dev/guide/cli.html Vite: Command Line Interface]
[link:https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management MDN: Package management basics]
Production
Later, when you're ready to deploy your web application, you'll just need to tell Vite to run a production build —
npx vite build
. Everything used by the application will be compiled, optimized, and copied into the
dist/
folder. The contents of that folder are ready to be hosted on your website.
Option 2: Import from a CDN
Development
Installing without build tools will require some changes to the project structure given above.
We imported code from 'three' (an npm package) in
main.js
, and web browsers don't know what that means. In
index.html
we'll need to add an [link:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap import map] defining where to get the package. Put the code below inside the
<head></head>
tag, after the styles.
<script type="importmap">
{
"imports": {
"three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.js",
"three/addons/": "https://cdn.jsdelivr.net/npm/three@<version>/examples/jsm/"
}
}
</script>
Don't forget to replace
<version>
with an actual version of three.js, like
"v0.149.0"
. The most recent version can be found on the [link:https://www.npmjs.com/package/three?activeTab=versions npm version list].
We'll also need to run a
local server
to host these files at URL where the web browser can access them. While it's technically possible to double-click an HTML file and open it in your browser, important features that we'll later implement, do not work when the page is opened this way, for security reasons.
Install [link:https://nodejs.org/ Node.js], then run [link:https://www.npmjs.com/package/serve serve] to start a local server in the project's directory:
npx serve .
If everything went well, you'll see a URL like http://localhost:3000 appear in your terminal, and can open that URL to see your web application.
The page will be blank — you're ready to [link:#manual/introduction/Creating-a-scene create a scene].
Many other local static servers are available — some use different languages instead of Node.js, and others are desktop applications. They all work basically the same way, and we've provided a few alternatives below.
More local servers
Command Line
Command line local servers run from a terminal window. The associated programming language may need to be installed first.
npx http-server
(Node.js)
npx five-server
(Node.js)
python -m SimpleHTTPServer
(Python 2.x)
python -m http.server
(Python 3.x)
php -S localhost:8000
(PHP 5.4+)
GUI
GUI local servers run as an application window on your computer, and may have a user interface.
[link:https://greggman.github.io/servez Servez]
Code Editor Plugins
Some code editors have plugins that spawn a simple server on demand.
[link:https://marketplace.visualstudio.com/items?itemName=yandeu.five-server Five Server] for Visual Studio Code
[link:https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer Live Server] for Visual Studio Code
[link:https://atom.io/packages/atom-live-server Live Server] for Atom
Production
When you're ready to deploy your web application, push the source files to your web hosting provider — no need to build or compile anything. The downside of that tradeoff is that you'll need to be careful to keep the import map updated with any dependencies (and dependencies of dependencies!) that your application requires. If the CDN hosting your dependencies goes down temporarily, your website will stop working too.
IMPORTANT:
Import all dependencies from the same version of three.js, and from the same CDN. Mixing files from different sources may cause duplicate code to be included, or even break the application in unexpected ways.
Addons
Out of the box, three.js includes the fundamentals of a 3D engine. Other three.js components — such as controls, loaders, and post-processing effects — are part of the [link:https://github.com/mrdoob/three.js/tree/dev/examples/jsm addons/] directory. Addons do not need to be
installed
separately, but do need to be
imported
separately.
The example below shows how to import three.js with the [page:OrbitControls] and [page:GLTFLoader] addons. Where necessary, this will also be mentioned in each addon's documentation or examples.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();
Some excellent third-party projects are available for three.js, too. These need to be installed separately — see [link:#manual/introduction/Libraries-and-Plugins Libraries and Plugins].
Next Steps
You're now ready to [link:#manual/introduction/Creating-a-scene create a scene].

[page:Loader] →
[name]
A loader for loading an `.mtl` resource, used internally by [page:OBJLoader].
The Material Template Library format (MTL) or .MTL File Format is a companion file format to .OBJ that describes surface shading
(material) properties of objects within one or more .OBJ files.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
Constructor
[name]( [param:LoadingManager loadingManager] )
[page:LoadingManager loadingManager] — LoadingManager to use. Defaults to [page:DefaultLoadingManager DefaultLoadingManager]
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.mtl` file.
[page:Function onLoad] — (optional) A function to be called after the loading is successfully completed. The function receives the loaded [page:MTLLoaderMaterialCreator MTLLoader.MaterialCreator] instance.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains [page:Integer total] and [page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.
Begin loading from url and return the loaded material.
[method:this setMaterialOptions]( [param:Object options] )
[page:Object options] — required
side: Which side to apply the material. THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
wrap: What type of wrapping to apply for textures. THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
normalizeRGB: RGBs need to be normalized to 0-1 from 0-255. Default: false, assumed to be already normalized
ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's. Default: false
invertTrProperty: Use values 1 of Tr field for fully opaque. This option is useful for obj exported from 3ds MAX, vcglib or meshlab. Default: false
Set of options on how to construct the materials
[method:MTLLoaderMaterialCreator parse]( [param:String text, param:String path] )
[page:String text] — The textual `mtl` structure to parse.
[page:String path] — The path to the MTL file.
Parse a `mtl` text structure and return a [page:MTLLoaderMaterialCreator MTLLoader.MaterialCreator] instance.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/[name].js examples/jsm/loaders/[name].js]

[page:Object3D] → [page:Light] →
[name]
Light probes are an alternative way of adding light to a 3D scene. Unlike
classical light sources (e.g. directional, point or spot lights), light
probes do not emit light. Instead they store information about light
passing through 3D space. During rendering, the light that hits a 3D
object is approximated by using the data from the light probe.
Light probes are usually created from (radiance) environment maps. The
class [page:LightProbeGenerator] can be used to create light probes from
instances of [page:CubeTexture] or [page:WebGLCubeRenderTarget]. However,
light estimation data could also be provided in other forms e.g. by WebXR.
This enables the rendering of augmented reality content that reacts to
real world lighting.
The current probe implementation in three.js supports so-called diffuse
light probes. This type of light probe is functionally equivalent to an
irradiance environment map.
Examples
[example:webgl_lightprobe WebGL / light probe ]
[example:webgl_lightprobe_cubecamera WebGL / light probe / cube camera ]
Constructor
[name]( [param:SphericalHarmonics3 sh], [param:Float intensity] )
[page:SphericalHarmonics3 sh] - (optional) An instance of
[page:SphericalHarmonics3].
[page:Float intensity] - (optional) Numeric value of the light probe's
intensity. Default is `1`.
Creates a new [name].
Properties
See the base [page:Light Light] class for common properties. The
[page:Light.color color] property is currently not evaluated and thus has
no effect.
[property:Boolean isLightProbe]
Read-only flag to check if a given object is of type [name].
[property:SphericalHarmonics3 sh]
A light probe uses spherical harmonics to encode lighting information.
Methods
See the base [page:Light Light] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:EventDispatcher] →
[name]
[name] is similar to [page:OrbitControls]. However, it does not maintain a constant camera [page:Object3D.up up] vector.
That means if the camera orbits over the “north” and “south” poles, it does not flip to stay "right side up".
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
Examples
[example:misc_controls_trackball misc / controls / trackball ]
Constructor
[name]( [param:Camera camera], [param:HTMLDOMElement domElement] )
[page:Camera camera]: The camera of the rendered scene.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Creates a new instance of [name].
Events
change
Fires when the camera has been transformed by the controls.
start
Fires when an interaction (e.g. touch) was initiated.
end
Fires when an interaction has finished.
Properties
[property:HTMLDOMElement domElement]
The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will
not set up new event listeners.
[property:Number dynamicDampingFactor]
Defines the intensity of damping. Only considered if [page:.staticMoving staticMoving] is set to `false`. Default is `0.2`.
[property:Boolean enabled]
Whether or not the controls are enabled.
[property:Array keys]
This array holds keycodes for controlling interactions.
When the first defined key is pressed, all mouse interactions (left, middle, right) performs orbiting.
When the second defined key is pressed, all mouse interactions (left, middle, right) performs zooming.
When the third defined key is pressed, all mouse interactions (left, middle, right) performs panning.
Default is *KeyA, KeyS, KeyD* which represents A, S, D.
[property:Number maxDistance]
How far you can dolly out ( [page:PerspectiveCamera] only ). Default is `Infinity`.
[property:Number minDistance]
How far you can dolly in ( [page:PerspectiveCamera] only ). Default is *0*.
[property:Float maxZoom]
How far you can zoom out ( [page:OrthographicCamera] only ). Default is `Infinity`.
[property:Float minZoom]
How far you can zoom in ( [page:OrthographicCamera] only ). Default is *0*.
[property:Object mouseButtons]
This object contains references to the mouse actions used by the controls.
.LEFT is assigned with `THREE.MOUSE.ROTATE`
.MIDDLE is assigned with `THREE.MOUSE.ZOOM`
.RIGHT is assigned with `THREE.MOUSE.PAN`
[property:Boolean noPan]
Whether or not panning is disabled. Default is `false`.
[property:Boolean noRotate]
Whether or not rotation is disabled. Default is `false`.
[property:Boolean noZoom]
Whether or not zooming is disabled. Default is `false`.
[property:Camera object]
The camera being controlled.
[property:Number panSpeed]
The pan speed. Default is `0.3`.
[property:Number rotateSpeed]
The rotation speed. Default is `1.0`.
[property:Object screen]
Represents the properties of the screen. Automatically set when [page:.handleResize handleResize]() is called.
left: Represents the offset in pixels to the screen's left boundary.
top: Represents the offset in pixels to the screen's top boundary.
width: Represents the screen width in pixels.
height: Represents the screen height in pixels.
[property:Boolean staticMoving]
Whether or not damping is disabled. Default is `false`.
[property:Vector3 target]
The focus point of the controls.
[property:Number zoomSpeed]
The zoom speed. Default is `1.2`.
Methods
[method:undefined checkDistances] ()
Ensures the controls stay in the range [minDistance, maxDistance]. Called by [page:.update update]().
[method:undefined dispose] ()
Should be called if the controls is no longer required.
[method:undefined handleResize] ()
Should be called if the application window is resized.
[method:undefined panCamera] ()
Performs panning if necessary. Called by [page:.update update]().
[method:undefined reset] ()
Resets the controls to its initial state.
[method:undefined rotateCamera] ()
Rotates the camera if necessary. Called by [page:.update update]().
[method:undefined update] ()
Updates the controls. Usually called in the animation loop.
[method:undefined zoomCamera] ()
Performs zooming if necessary. Called by [page:.update update]().
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/TrackballControls.js examples/jsm/controls/TrackballControls.js]

[page:Object3D] →
[name]
Creates 6 cameras that render to a [page:WebGLCubeRenderTarget].
Code Example
// Create cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
// Create cube camera
const cubeCamera = new THREE.CubeCamera( 1, 100000, cubeRenderTarget );
scene.add( cubeCamera );
// Create car
const chromeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: cubeRenderTarget.texture } );
const car = new THREE.Mesh( carGeometry, chromeMaterial );
scene.add( car );
// Update the render target cube
car.visible = false;
cubeCamera.position.copy( car.position );
cubeCamera.update( renderer, scene );
// Render the scene
car.visible = true;
renderer.render( scene, camera );
Examples
[example:webgl_materials_cubemap_dynamic materials / cubemap / dynamic ]
Constructor
[name]( [param:Number near], [param:Number far], [param:WebGLCubeRenderTarget renderTarget] )
near -- The near clipping distance.
far -- The far clipping distance.
renderTarget -- The destination cube render target.
Constructs a CubeCamera that contains 6 [page:PerspectiveCamera PerspectiveCameras] that render to a [page:WebGLCubeRenderTarget].
Properties
See the base [page:Object3D] class for common properties.
[property:WebGLCubeRenderTarget renderTarget]
The destination cube render target.
Methods
See the base [page:Object3D] class for common methods.
[method:undefined update]( [param:WebGLRenderer renderer], [param:Scene scene] )
renderer -- The current WebGL renderer
scene -- The current scene
Call this to update the [page:CubeCamera.renderTarget renderTarget].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A class containing utility functions for shapes.
Note that these are all linear functions so it is necessary to calculate
separately for x, y (and z, w if present) components of a vector.
Methods
[method:Number area]( contour )
contour -- 2D polygon. An array of THREE.Vector2()
Calculate area of a ( 2D ) contour polygon.
[method:Boolean isClockWise]( pts )
pts -- points defining a 2D polygon
Note that this is a linear function so it is necessary to calculate
separately for x, y components of a polygon.
Used internally by [page:Path Path], [page:ExtrudeGeometry ExtrudeGeometry] and [page:ShapeGeometry ShapeGeometry].
[method:Array triangulateShape]( contour, holes )
contour -- 2D polygon. An array of [page:Vector2].
holes -- An array that holds arrays of [page:Vector2]s. Each array
represents a single hole definition.
Used internally by [page:ExtrudeGeometry ExtrudeGeometry] and
[page:ShapeGeometry ShapeGeometry] to calculate faces in shapes with
holes.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:EventDispatcher] →
[name]
This class can be used to provide a drag'n'drop interaction.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { DragControls } from 'three/addons/controls/DragControls.js';
Code Example
const controls = new DragControls( objects, camera, renderer.domElement );
// add event listener to highlight dragged objects
controls.addEventListener( 'dragstart', function ( event ) {
event.object.material.emissive.set( 0xaaaaaa );
} );
controls.addEventListener( 'dragend', function ( event ) {
event.object.material.emissive.set( 0x000000 );
} );
Examples
[example:misc_controls_drag misc / controls / drag ]
Constructor
[name]( [param:Array objects], [param:Camera camera], [param:HTMLDOMElement domElement] )
[page:Array objects]: An array of draggable 3D objects.
[page:Camera camera]: The camera of the rendered scene.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Creates a new instance of [name].
Events
dragstart
Fires when the user starts to drag a 3D object.
drag
Fires when the user drags a 3D object.
dragend
Fires when the user has finished dragging a 3D object.
hoveron
Fires when the pointer is moved onto a 3D object, or onto one of its children.
hoveroff
Fires when the pointer is moved out of a 3D object.
Properties
[property:Boolean enabled]
Whether or not the controls are enabled.
[property:Boolean recursive]
Whether children of draggable objects can be dragged independently from their parent. Default is `true`.
[property:Boolean transformGroup]
This option only works if the [page:DragControls.objects] array contains a single draggable group object.
If set to `true`, [name] does not transform individual objects but the entire group. Default is `false`.
[property:String mode]
The current transformation mode. Possible values are `translate`, and `rotate`. Default is `translate`.
[property:Float rotateSpeed]
The speed at which the object will rotate when dragged in `rotate` mode. The higher the number the faster the rotation. Default is `1`.
Methods
See the base [page:EventDispatcher] class for common methods.
[method:undefined activate] ()
Adds the event listeners of the controls.
[method:undefined deactivate] ()
Removes the event listeners of the controls.
[method:undefined dispose] ()
Should be called if the controls is no longer required.
[method:Array getObjects] ()
Returns the array of draggable objects.
[method:Raycaster getRaycaster] ()
Returns the internal [page:Raycaster] instance that is used for intersection tests.
[method:undefined setObjects] ( [param:Array objects] )
Sets an array of draggable objects by overwriting the existing one.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/DragControls.js examples/jsm/controls/DragControls.js]

[page:Loader] →
[name]
A 3D LUT loader that supports the .cube file format.
Based on the following reference:
[link:https://wwwimages2.adobe.com/content/dam/acom/en/products/speedgrade/cc/pdfs/cube-lut-specification-1.0.pdf]
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { LUTCubeLoader } from 'three/addons/loaders/LUTCubeLoader.js';
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The LoadingManager to use. Defaults to [page:DefaultLoadingManager DefaultLoadingManager]
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.cube` file.
[page:Function onLoad] — (optional) A function to be called after the loading is successfully completed. The function receives the result of the [page:Function parse] method.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains [page:Integer total] and [page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.
Begin loading from url and return the loaded LUT.
[method:Object parse]( [param:String input] )
[page:String input] — The cube data string.
Parse a cube data string and fire [page:Function onLoad] callback when complete. The argument to [page:Function onLoad] will be an [page:Object object] containing the following LUT data: [page:String .title], [page:Number .size], [page:Vector3 .domainMin], [page:Vector3 .domainMax], [page:DataTexture .texture] and [page:Data3DTexture .texture3D].
[method:this setType]( [param:Number type] )
[page:Number type] - The texture type. See the [page:Textures texture constants] page for details.
Sets the desired texture type. Only [page:Textures THREE.UnsignedByteType] and [page:Textures THREE.FloatType] are supported. The default is [page:Textures THREE.UnsignedByteType].
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/[name].js examples/jsm/loaders/[name].js]

[page:Loader] →
[name]
A loader for `LDraw` resources.
[link:https://ldraw.org LDraw] (LEGO Draw) is an
[link:https://ldraw.org/article/218.html open format specification] for describing LEGO
and other construction set 3D models.
An LDraw asset (a text file usually with extension .ldr, .dat or .txt) can describe
just a single construction piece, or an entire model.
In the case of a model the LDraw file can reference other LDraw files, which are loaded
from a library path set with [page:Function setPartsLibraryPath]. You usually download
the LDraw official parts library, extract to a folder and point setPartsLibraryPath to it.
Library parts will be loaded by trial and error in subfolders 'parts', 'p' and 'models'.
These file accesses are not optimal for web environment, so a script tool has been made
to pack an LDraw file with all its dependencies into a single file, which loads much faster.
See section 'Packing LDraw models'. The LDrawLoader example loads several packed files.
The official parts library is not included due to its large size.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { LDrawLoader } from 'three/addons/loaders/LDrawLoader.js';
Extensions
LDrawLoader supports the following extensions:
!COLOUR: Color and surface finish declarations.
BFC: Back Face Culling specification.
!CATEGORY: Model/part category declarations.
!KEYWORDS: Model/part keywords declarations.
Code Example
// Instantiate a loader
const loader = new LDrawLoader();
// Optionally set library parts path
// loader.setPartsLibraryPath( path to library );
// Load a LDraw resource
loader.load(
// resource URL
'models/car.ldr_Packed.mpd',
// called when the resource is loaded
function ( group ) {
// Optionally, use LDrawUtils.mergeObject() from
// 'examples/jsm/utils/LDrawUtils.js' to merge all
// geometries by material (it gives better runtime
// performance, but building steps are lost)
// group = LDrawUtils.mergeObject( group );
scene.add( group );
},
// called while loading is progressing
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_ldraw]
Packing LDraw models
To pack a model with all its referenced files, download the
[link:https://www.ldraw.org/parts/latest-parts.html Official LDraw parts library]
and use the following Node script:
[link:https://github.com/mrdoob/three.js/blob/master/utils/packLDrawModel.js utils/packLDrawModel.js]
It contains instructions on how to setup the files and execute it.
Metadata in .userData
LDrawLoader returns a [page:Group] object which contains an object hierarchy. Depending of each subobject
type, its .userData member will contain the following members:
In a [page:Group], the userData member will contain:
.numBuildingSteps: Only in the root [page:Group], Indicates total number of building steps in
the model. These can be used to set visibility of objects to show different building steps, which is
done in the example.
.buildingStep: Indicates the building index of this step.
.category: Contains, if not null, the [page:String] category for this piece or model.
.keywords: Contains, if not null, an array of [page:String] keywords for this piece or model.
In a [page:Material], the userData member will contain:
.code: Indicates the LDraw code for this material.
.edgeMaterial: Only in a [page:Mesh] material, indicates the [page:LineBasicMaterial] belonging to edges
of the same color code (in the LDraw format, each surface material is also related to an edge material)
.conditionalEdgeMaterial: Only in a [page:LineSegments] material, indicates the [page:Material] belonging
to conditional edges of the same color code.
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the LDraw file.
[page:Function onLoad] — A function to be called after the loading is successfully completed. The function receives the loaded JSON response returned from [page:Function parse].
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading from url and call the callback function with the parsed response content.
[method:this setPartsLibraryPath]( [param:String path] )
[page:String path] —
Path to library parts files to load referenced parts from. This is different from [page:Loader.setPath], which indicates the path to load the main asset from.
This method must be called prior to [page:.load] unless the model to load does not reference library parts (usually it will be a model with all its parts packed in a single file)
[method:this setFileMap]( [param:Map fileMap] )
[page:Map map] — Set a map from [page:String] to [page:String] which maps referenced library filenames to new filenames. If a fileMap is not specified (the default), library parts will be accessed by trial and error in subfolders 'parts', 'p' and 'models'.
[method:undefined parse]( [param:String text], [param:String path], [param:Function onLoad], [param:Function onError] )
[page:String text] — LDraw asset to parse, as string.
[page:String path] — The base path from which to find other referenced LDraw asset files.
[page:Function onLoad] — A function to be called when parse completes.
Parse a LDraw file contents as a String and fire [page:Function onLoad] callback when complete. The argument to [page:Function onLoad] will be an [page:Group] that contains hierarchy of [page:Group], [page:Mesh] and [page:LineSegments] (with other part data in .userData fields).
[method:Material getMaterial]( [param:String colourCode] )
[page:String colourCode] — Color code to get the associated [page:Material].
[method:String getMainMaterial]()
Returns the [page:Material] for the main LDraw color.
For an already loaded LDraw asset, returns the [page:Material] associated with the main color code.
This method can be useful to modify the main material of a model or part that exposes it.
The main color code is the standard way to color an LDraw part. It is '16' for triangles and '24' for edges. Usually
a complete model will not expose the main color (that is, no part uses the code '16' at the top level, because they
are assigned other specific colors) An LDraw part file on the other hand will expose the code '16' to be colored, and
can have additional fixed colors.
[method:String getMainEdgeMaterial]()
Returns the [page:Material] for the edges main LDraw color.
[method:void preloadMaterials]( [param:String path] )
[page:String path] — Path of the LDraw materials asset.
This async method preloads materials from a single LDraw file. In the official parts library there is a special
file which is loaded always the first (LDConfig.ldr) and contains all the standard color codes. This method is
intended to be used with not packed files, for example in an editor where materials are preloaded and parts are
loaded on demand.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/LDrawLoader.js examples/jsm/loaders/LDrawLoader.js]

[name]
What is a color space?
Every color space is a collection of several design decisions, chosen together to support a
large range of colors while satisfying technical constraints related to precision and display
technologies. When creating a 3D asset, or assembling 3D assets together into a scene, it is
important to know what these properties are, and how the properties of one color space relate
to other color spaces in the scene.
sRGB colors and white point (D65) displayed in the reference CIE 1931 chromaticity
diagram. Colored region represents a 2D projection of the sRGB gamut, which is a 3D
volume. Source:
Wikipedia
Color primaries:
Primary colors (e.g. red, green, blue) are not absolutes; they are
selected from the visible spectrum based on constraints of limited precision and
capabilities of available display devices. Colors are expressed as a ratio of the primary colors.
White point:
Most color spaces are engineered such that an equally weighted sum of
primaries
R = G = B
will appear to be without color, or "achromatic". The appearance
of achromatic values (like white or grey) depend on human perception, which in turn depends
heavily on the context of the observer. A color space specifies its "white point" to balance
these needs. The white point defined by the sRGB color space is
[link:https://en.wikipedia.org/wiki/Illuminant_D65 D65].
Transfer functions:
After choosing the color gamut and a color model, we still need to
define mappings ("transfer functions") of numerical values to/from the color space. Does
r = 0.5
represent 50% less physical illumination than
r = 1.0
? Or 50% less bright, as perceived
by an average human eye? These are different things, and that difference can be represented as
a mathematical function. Transfer functions may be
linear
or
nonlinear
, depending
on the objectives of the color space. sRGB defines nonlinear transfer functions. Those
functions are sometimes approximated as
gamma functions
, but the term "gamma" is
ambiguous and should be avoided in this context.
These three parameters — color primaries, white point, and transfer functions — define a color
space, with each chosen for particular goals. Having defined the parameters, a few additional terms
are helpful:
Color model:
Syntax for numerically identifying colors within chosen the color gamut —
a coordinate system for colors. In three.js we're mainly concerned with the RGB color
model, having three coordinates
r, g, b ∈ [0,1]
("closed domain") or
r, g, b ∈ [0,∞]
("open domain") each representing a fraction of a primary
color. Other color models (HSL, Lab, LCH) are commonly used for artistic control.
Color gamut:
Once color primaries and a white point have been chosen, these represent
a volume within the visible spectrum (a "gamut"). Colors not within this volume ("out of gamut")
cannot be expressed by closed domain [0,1] RGB values. In the open domain [0,∞], the gamut is
technically infinite.
Consider two very common color spaces: [page:SRGBColorSpace] ("sRGB") and
[page:LinearSRGBColorSpace] ("Linear-sRGB"). Both use the same primaries and white point,
and therefore have the same color gamut. Both use the RGB color model. They differ only in
the transfer functions — Linear-sRGB is linear with respect to physical light intensity.
sRGB uses the nonlinear sRGB transfer functions, and more closely resembles the way that
the human eye perceives light and the responsiveness of common display devices.
That difference is important. Lighting calculations and other rendering operations must
generally occur in a linear color space. However, a linear colors are less efficient to
store in an image or framebuffer, and do not look correct when viewed by a human observer.
As a result, input textures and the final rendered image will generally use the nonlinear
sRGB color space.
ℹ️
NOTICE:
While some modern displays support wider gamuts like Display-P3,
the web platform's graphics APIs largely rely on sRGB. Applications using three.js
today will typically use only the sRGB and Linear-sRGB color spaces.
Roles of color spaces
Linear workflows — required for modern rendering methods — generally involve more than
one color space, each assigned to a particular role. Linear and nonlinear color spaces are
appropriate for different roles, explained below.
Input color space
Colors supplied to three.js — from color pickers, textures, 3D models, and other sources —
each have an associated color space. Those not already in the Linear-sRGB working color
space must be converted, and textures be given the correct
texture.colorSpace
assignment.
Certain conversions (for hexadecimal and CSS colors in sRGB) can be made automatically if
the THREE.ColorManagement API is enabled before initializing colors:
THREE.ColorManagement.enabled = true;
Materials, lights, and shaders:
Colors in materials, lights, and shaders store
RGB components in the Linear-sRGB working color space.
Vertex colors:
[page:BufferAttribute BufferAttributes] store RGB components in the
Linear-sRGB working color space.
Color textures:
PNG or JPEG [page:Texture Textures] containing color information
(like .map or .emissiveMap) use the closed domain sRGB color space, and must be annotated with
texture.colorSpace = SRGBColorSpace
. Formats like OpenEXR (sometimes used for .envMap or
.lightMap) use the Linear-sRGB color space indicated with
texture.colorSpace = LinearSRGBColorSpace
,
and may contain values in the open domain [0,∞].
Non-color textures:
Textures that do not store color information (like .normalMap
or .roughnessMap) do not have an associated color space, and generally use the (default) texture
annotation of
texture.colorSpace = NoColorSpace
. In rare cases, non-color data
may be represented with other nonlinear encodings for technical reasons.
⚠️
WARNING:
Many formats for 3D models do not correctly or consistently
define color space information. While three.js attempts to handle most cases, problems
are common with older file formats. For best results, use glTF 2.0 ([page:GLTFLoader])
and test 3D models in online viewers early to confirm the asset itself is correct.
Working color space
Rendering, interpolation, and many other operations must be performed in an open domain
linear working color space, in which RGB components are proportional to physical
illumination. In three.js, the working color space is Linear-sRGB.
Output color space
Output to a display device, image, or video may involve conversion from the open domain
Linear-sRGB working color space to another color space. This conversion may be performed in
the main render pass ([page:WebGLRenderer.outputColorSpace]), or during post-processing.
renderer.outputColorSpace = THREE.SRGBColorSpace; // optional with post-processing
Display:
Colors written to a WebGL canvas for display should be in the sRGB
color space.
Image:
Colors written to an image should use the color space appropriate for
the format and usage. Fully-rendered images written to PNG or JPEG textures generally
use the sRGB color space. Images containing emission, light maps, or other data not
confined to the [0,1] range will generally use the open domain Linear-sRGB color space,
and a compatible image format like OpenEXR.
⚠️
WARNING:
Render targets may use either sRGB or Linear-sRGB. sRGB makes
better use of limited precision. In the closed domain, 8 bits often suffice for sRGB
whereas ≥12 bits (half float) may be required for Linear-sRGB. If later pipeline
stages require Linear-sRGB input, the additional conversions may have a small
performance cost.
Custom materials based on [page:ShaderMaterial] and [page:RawShaderMaterial] have to implement their own output color space conversion.
For instances of `ShaderMaterial`, adding the `colorspace_fragment` shader chunk to the fragment shader's `main()` function should be sufficient.
Working with THREE.Color instances
Methods reading or modifying [page:Color] instances assume data is already in the
three.js working color space, Linear-sRGB. RGB and HSL components are direct
representations of data stored by the Color instance, and are never converted
implicitly. Color data may be explicitly converted with
.convertLinearToSRGB()
or
.convertSRGBToLinear()
.
// RGB components (no change).
color.r = color.g = color.b = 0.5;
console.log( color.r ); // → 0.5
// Manual conversion.
color.r = 0.5;
color.convertSRGBToLinear();
console.log( color.r ); // → 0.214041140
With
ColorManagement.enabled = true
set (recommended), certain conversions
are made automatically. Because hexadecimal and CSS colors are generally sRGB, [page:Color]
methods will automatically convert these inputs from sRGB to Linear-sRGB in setters, or
convert from Linear-sRGB to sRGB when returning hexadecimal or CSS output from getters.
// Hexadecimal conversion.
color.setHex( 0x808080 );
console.log( color.r ); // → 0.214041140
console.log( color.getHex() ); // → 0x808080
// CSS conversion.
color.setStyle( 'rgb( 0.5, 0.5, 0.5 )' );
console.log( color.r ); // → 0.214041140
// Override conversion with 'colorSpace' argument.
color.setHex( 0x808080, LinearSRGBColorSpace );
console.log( color.r ); // → 0.5
console.log( color.getHex( LinearSRGBColorSpace ) ); // → 0x808080
console.log( color.getHex( SRGBColorSpace ) ); // → 0xBCBCBC
Common mistakes
When an individual color or texture is misconfigured, it will appear darker or lighter than
expected. When the renderer's output color space is misconfigured, the entire scene may appear
darker (e.g. missing conversion to sRGB) or lighter (e.g. a double conversion to sRGB with
post-processing). In each case the problem may not be uniform, and simply increasing/decreasing
lighting does not solve it.
A more subtle issue appears when
both
the input color spaces and the output color
spaces are incorrect — the overall brightness levels may be fine, but colors may change
unexpectedly under different lighting, or shading may appear more blown-out and less soft
than intended. These two wrongs do not make a right, and it's important that the working
color space be linear ("scene referred") and the output color space be nonlinear
("display referred").
Further reading
GPU Gems 3: The Importance of Being Linear
, by Larry Gritz and Eugene d'Eon
What every coder should know about gamma
, by John Novak
The Hitchhiker's Guide to Digital Color
, by Troy Sobotka
Color Management
, Blender

[name]
This buffer attribute class does not construct a VBO. Instead, it uses
whatever VBO is passed in constructor and can later be altered via the
`buffer` property.
It is required to pass additional params alongside the VBO. Those are: the
GL context, the GL data type, the number of components per vertex, the
number of bytes per component, and the number of vertices.
The most common use case for this class is when some kind of GPGPU
calculation interferes or even produces the VBOs in question.
Constructor
[name]( [param:WebGLBuffer buffer], [param:GLenum type], [param:Integer itemSize], [param:Integer elementSize], [param:Integer count] )
`buffer` — Must be a
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer WebGLBuffer].
`type` — One of
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#Data_types WebGL Data Types].
`itemSize` — The number of values of the array that should be associated
with a particular vertex. For instance, if this attribute is storing a
3-component vector (such as a position, normal, or color), then itemSize
should be 3.
`elementSize` — 1, 2 or 4. The corresponding size (in bytes) for the given
"type" param.
gl.FLOAT: 4
gl.UNSIGNED_SHORT: 2
gl.SHORT: 2
gl.UNSIGNED_INT: 4
gl.INT: 4
gl.BYTE: 1
gl.UNSIGNED_BYTE: 1
`count` — The expected number of vertices in VBO.
Properties
[property:WebGLBuffer buffer]
The current
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer WebGLBuffer] instance.
[property:Integer count]
The expected number of vertices in VBO.
[property:Boolean isGLBufferAttribute]
Read-only. Always `true`.
[property:Integer itemSize]
How many values make up each item (vertex).
[property:Integer elementSize]
Stores the corresponding size in bytes for the current `type` property
value.
See above (constructor) for a list of known type sizes.
[property:String name]
Optional name for this attribute instance. Default is an empty string.
[property:GLenum type]
A
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#Data_types WebGL Data Type] describing the underlying VBO contents.
Set this property together with `elementSize`. The recommended way is
using the `setType` method.
Methods
[method:this setBuffer]( buffer )
Sets the `buffer` property.
[method:this setType]( type, elementSize )
Sets the both `type` and `elementSize` properties.
[method:this setItemSize]( itemSize )
Sets the `itemSize` property.
[method:this setCount]( count )
Sets the `count` property.
[property:Integer version]
A version number, incremented every time the needsUpdate property is set
to true.
[property:Boolean needsUpdate]
Default is `false`. Setting this to true increments
[page:GLBufferAttribute.version version].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A class containing utility functions for data.
Methods
[method:Number toHalfFloat]( [param:Number val] )
val -- A single precision floating point value.
Returns a half precision floating point value from the given single
precision floating point value.
[method:Number fromHalfFloat]( [param:Number val] )
val -- A half precision floating point value.
Returns a single precision floating point value from the given half
precision floating point value.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Uniforms library for shared webgl shaders
Properties
Methods
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A vertex as a double linked list node.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { VertexNode } from 'three/addons/math/ConvexHull.js';
Constructor
[name]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] A point (x, y, z) in 3D space.
Creates a new instance of [name].
Properties
[property:Vector3 point]
A point (x, y, z) in 3D space. Default is undefined.
[property:VertexNode prev]
Reference to the previous vertex in the double linked list. Default is null.
[property:VertexNode next]
Reference to the next vertex in the double linked list. Default is null.
[property:Face face]
Reference to the face that is able to see this vertex. Default is undefined.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/ConvexHull.js examples/jsm/math/ConvexHull.js]

[name]
This class contains the parameters that define linear fog, i.e., that
grows linearly denser with the distance.
Code Example
const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
Constructor
[name]( [param:Integer color], [param:Float near], [param:Float far] )
The color parameter is passed to the [page:Color] constructor to set the
color property. Color can be a hexadecimal integer or a CSS-style string.
Properties
[property:Boolean isFog]
Read-only flag to check if a given object is of type [name].
[property:String name]
Optional name of the object (doesn't need to be unique). Default is an
empty string.
[property:Color color]
Fog color. Example: If set to black, far away objects will be rendered
black.
[property:Float near]
The minimum distance to start applying fog. Objects that are less than
'near' units from the active camera won't be affected by fog.
Default is `1`.
[property:Float far]
The maximum distance at which fog stops being calculated and applied.
Objects that are more than 'far' units away from the active camera won't
be affected by fog.
Default is `1000`.
Methods
[method:Fog clone]()
Returns a new fog instance with the same parameters as this one.
[method:Object toJSON]()
Return fog data in JSON format.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
The basis for a half-edge data structure, also known as doubly connected edge list (DCEL).
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { HalfEdge } from 'three/addons/math/ConvexHull.js';
Constructor
[name]( [param:VertexNode vertex], [param:Face face] )
[page:VertexNode vertex] - [page:VertexNode] A reference to its destination vertex.
[page:Face face] - [page:Face] A reference to its face.
Creates a new instance of [name].
Properties
[property:VertexNode vertex]
Reference to the destination vertex. The origin vertex can be obtained by querying the destination of its twin, or of the previous half-edge. Default is undefined.
[property:HalfEdge prev]
Reference to the previous half-edge of the same face. Default is null.
[property:HalfEdge next]
Reference to the next half-edge of the same face. Default is null.
[property:HalfEdge twin]
Reference to the twin half-edge to reach the opposite face. Default is null.
[property:Face face]
Each half-edge bounds a single face and thus has a reference to that face. Default is undefined.
Methods
[method:VertexNode head]()
Returns the destination vertex.
[method:VertexNode tail]()
Returns the origin vertex.
[method:Float length]()
Returns the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) of the edge.
[method:Float lengthSquared]()
Returns the square of the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) of the edge.
[method:this setTwin]( [param:HalfEdge edge] )
[page:HalfEdge edge] - Any half-edge.
Sets the twin edge of this half-edge. It also ensures that the twin reference of the given half-edge is correctly set.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/ConvexHull.js examples/jsm/math/ConvexHull.js]

[name]
This guide provides a brief overview of the basic components of a web-based VR application
made with three.js.
Workflow
First, you have to include [link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/VRButton.js VRButton.js]
into your project.
import { VRButton } from 'three/addons/webxr/VRButton.js';
*VRButton.createButton()* does two important things: It creates a button which indicates
VR compatibility. Besides, it initiates a VR session if the user activates the button. The only thing you have
to do is to add the following line of code to your app.
document.body.appendChild( VRButton.createButton( renderer ) );
Next, you have to tell your instance of `WebGLRenderer` to enable XR rendering.
renderer.xr.enabled = true;
Finally, you have to adjust your animation loop since we can't use our well known
*window.requestAnimationFrame()* function. For VR projects we use [page:WebGLRenderer.setAnimationLoop setAnimationLoop].
The minimal code looks like this:
renderer.setAnimationLoop( function () {
renderer.render( scene, camera );
} );
Next Steps
Have a look at one of the official WebVR examples to see this workflow in action.
[example:webxr_vr_ballshooter WebXR / VR / ballshooter]
[example:webxr_vr_cubes WebXR / VR / cubes]
[example:webxr_vr_dragging WebXR / VR / dragging]
[example:webxr_vr_paint WebXR / VR / paint]
[example:webxr_vr_panorama_depth WebXR / VR / panorama_depth]
[example:webxr_vr_panorama WebXR / VR / panorama]
[example:webxr_vr_rollercoaster WebXR / VR / rollercoaster]
[example:webxr_vr_sandbox WebXR / VR / sandbox]
[example:webxr_vr_sculpt WebXR / VR / sculpt]
[example:webxr_vr_video WebXR / VR / video]

[page:EventDispatcher] →
[name]
Arcball controls allow the camera to be controlled by a virtual trackball with full touch support and advanced navigation functionality.
Cursor/finger positions and movements are mapped over a virtual trackball surface
represented by a gizmo and mapped in intuitive and consistent camera movements.
Dragging cursor/fingers will cause camera to orbit around the center of the trackball in a conservative way (returning to the starting point
will make the camera to return to its starting orientation).
In addition to supporting pan, zoom and pinch gestures, Arcball controls provide
focus
functionality with a double click/tap for
intuitively moving the object's point of interest in the center of the virtual trackball.
Focus allows a much better inspection and navigation in complex environment.
Moreover Arcball controls allow FOV manipulation (in a vertigo-style method) and z-rotation.
Saving and restoring of Camera State is supported also through clipboard
(use ctrl+c and ctrl+v shortcuts for copy and paste the state).
Unlike [page:OrbitControls] and [page:TrackballControls], [name] doesn't require [page:.update] to be called externally in an animation loop when animations
are on.
To use this, as with all files in the /examples directory, you will have to
include the file separately in your HTML.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
Code Example
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
const controls = new ArcballControls( camera, renderer.domElement, scene );
controls.addEventListener( 'change', function () {
renderer.render( scene, camera );
} );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();
Examples
[example:misc_controls_arcball misc / controls / arcball ]
Constructor
[name]( [param:Camera camera], [param:HTMLDOMElement domElement], [param:Scene scene] )
[page:Camera camera]: (required) The camera to be controlled. The camera must not be a child of another object, unless that object is the scene itself.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
[page:Scene scene]: The scene rendered by the camera. If not given, gizmos cannot be shown.
Events
change
Fires when the camera has been transformed by the controls.
start
Fires when an interaction was initiated.
end
Fires when an interaction has finished.
Properties
[property:Boolean adjustNearFar]
If true, camera's near and far values will be adjusted every time zoom is performed trying to mantain the same visible portion
given by initial near and far values ( [page:PerspectiveCamera] only ).
Default is false.
[property:Camera camera]
The camera being controlled.
[property:Boolean cursorZoom]
Set to true to make zoom become cursor centered.
[property:Float dampingFactor]
The damping inertia used if [page:.enableAnimations] is set to true.
[property:HTMLDOMElement domElement]
The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will
not set up new event listeners.
[property:Boolean enabled]
When set to `false`, the controls will not respond to user input. Default is `true`.
[property:Boolean enableAnimations]
Set to true to enable animations for rotation (damping) and focus operation. Default is true.
[property:Boolean enableGrid]
When set to true, a grid will appear when panning operation is being performed (desktop interaction only). Default is false.
[property:Boolean enablePan]
Enable or disable camera panning. Default is true.
[property:Boolean enableRotate]
Enable or disable camera rotation. Default is true.
[property:Boolean enableZoom]
Enable or disable zooming of the camera.
[property:Float focusAnimationTime]
Duration time of focus animation.
[property:Float maxDistance]
How far you can dolly out ( [page:PerspectiveCamera] only ). Default is Infinity.
[property:Float maxZoom]
How far you can zoom out ( [page:OrthographicCamera] only ). Default is Infinity.
[property:Float minDistance]
How far you can dolly in ( [page:PerspectiveCamera] only ). Default is 0.
[property:Float minZoom]
How far you can zoom in ( [page:OrthographicCamera] only ). Default is 0.
[property:Float radiusFactor]
The size of the gizmo relative to the screen width and height. Default is 0.67.
[property:Float rotateSpeed]
Speed of rotation. Default is 1.
[property:Float scaleFactor]
The scaling factor used when performing zoom operation.
[property:Scene scene]
The scene rendered by the camera.
[property:Float wMax]
Maximum angular velocity allowed on rotation animation start.
Methods
[method:undefined activateGizmos] ( [param:Boolean isActive] )
Make gizmos more or less visible.
[method:undefined copyState] ()
Copy the current state to clipboard (as a readable JSON text).
[method:undefined dispose] ()
Remove all the event listeners, cancel any pending animation and clean the scene from gizmos and grid.
[method:undefined pasteState] ()
Set the controls state from the clipboard, assumes that the clipboard stores a JSON text as saved from [page:.copyState].
[method:undefined reset] ()
Reset the controls to their state from either the last time the [page:.saveState] was called, or the initial state.
[method:undefined saveState] ()
Save the current state of the controls. This can later be recovered with [page:.reset].
[method:undefined setCamera] ( [param:Camera camera] )
Set the camera to be controlled. Must be called in order to set a new camera to be controlled.
[method:undefined setGizmosVisible] ( [param:Boolean value] )
Set the visible property of gizmos.
[method:undefined setTbRadius] ( [param:Float value] )
Update the `radiusFactor` value, redraw the gizmo and send a `changeEvent` to visualise the changes.
[method:Boolean setMouseAction] ( [param:String operation], mouse, key )
Set a new mouse action by specifying the operation to be performed and a mouse/key combination. In case of conflict, replaces the existing one.
Operations can be specified as 'ROTATE', 'PAN', 'FOV' or 'ZOOM'.
Mouse inputs can be specified as mouse buttons 0, 1 and 2 or 'WHEEL' for wheel notches.
Keyboard modifiers can be specified as 'CTRL', 'SHIFT' or null if not needed.
[method:Boolean unsetMouseAction] ( mouse, key )
Removes a mouse action by specifying its mouse/key combination.
Mouse inputs can be specified as mouse buttons 0, 1 and 2 or 'WHEEL' for wheel notches.
Keyboard modifiers can be specified as 'CTRL', 'SHIFT' or null if not needed.
[method:undefined update] ()
Update the controls. Must be called after any manual changes to the camera's transform.
[method:Raycaster getRaycaster] ()
Returns the [page:Raycaster] object that is used for user interaction. This object is shared between all instances of
ArcballControls. If you set the [page:Object3D.layers .layers] property of the [name], you will also want to
set the [page:Raycaster.layers .layers] property on the [page:Raycaster] with a matching value, or else the [name]
won't work as expected.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/ArcballControls.js examples/jsm/controls/ArcballControls.js]

[page:BufferGeometry] →
[name]
Creates extruded geometry from a path shape.
Code Example
const length = 12, width = 8;
const shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, width );
shape.lineTo( length, width );
shape.lineTo( length, 0 );
shape.lineTo( 0, 0 );
const extrudeSettings = {
steps: 2,
depth: 16,
bevelEnabled: true,
bevelThickness: 1,
bevelSize: 1,
bevelOffset: 0,
bevelSegments: 1
};
const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );
Constructor
[name]([param:Array shapes], [param:Object options])
shapes — Shape or an array of shapes.
options — Object that can contain the following parameters.
curveSegments — int. Number of points on the curves. Default is `12`.
steps — int. Number of points used for subdividing segments along the
depth of the extruded spline. Default is `1`.
depth — float. Depth to extrude the shape. Default is `1`.
bevelEnabled — bool. Apply beveling to the shape. Default is true.
bevelThickness — float. How deep into the original shape the bevel goes.
Default is `0.2`.
bevelSize — float. Distance from the shape outline that the bevel
extends. Default is bevelThickness - 0.1.
bevelOffset — float. Distance from the shape outline that the bevel
starts. Default is `0`.
bevelSegments — int. Number of bevel layers. Default is `3`.
extrudePath — THREE.Curve. A 3D spline path along which the shape should
be extruded. Bevels not supported for path extrusion.
UVGenerator — Object. object that provides UV generator functions
This object extrudes a 2D shape to a 3D geometry.
When creating a Mesh with this geometry, if you'd like to have a separate
material used for its face and its extruded sides, you can use an array of
materials. The first material will be applied to the face; the second
material will be applied to the sides.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A 3D LUT loader that supports the .3dl file format.
Based on the following references:
[link:http://download.autodesk.com/us/systemdocs/help/2011/lustre/index.html?url=./files/WSc4e151a45a3b785a24c3d9a411df9298473-7ffd.htm,topicNumber=d0e9492]
[link:https://community.foundry.com/discuss/topic/103636/format-spec-for-3dl?mode=Post&postID=895258]
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { LUT3dlLoader } from 'three/addons/loaders/LUT3dlLoader.js';
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The LoadingManager to use. Defaults to [page:DefaultLoadingManager DefaultLoadingManager]
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.3dl` file.
[page:Function onLoad] — (optional) A function to be called after the loading is successfully completed. The function receives the result of the [page:Function parse] method.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains [page:Integer total] and [page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.
Begin loading from url and return the loaded LUT.
[method:Object parse]( [param:String input] )
[page:String input] — The 3dl data string.
Parse a 3dl data string and fire [page:Function onLoad] callback when complete. The argument to [page:Function onLoad] will be an [page:Object object] containing the following LUT data: [page:Number .size], [page:DataTexture .texture] and [page:Data3DTexture .texture3D].
[method:this setType]( [param:Number type] )
[page:Number type] - The texture type. See the [page:Textures texture constants] page for details.
Sets the desired texture type. Only [page:Textures THREE.UnsignedByteType] and [page:Textures THREE.FloatType] are supported. The default is [page:Textures THREE.UnsignedByteType].
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/[name].js examples/jsm/loaders/[name].js]

[page:KeyframeTrack] →
[name]
A Track of vector keyframe values.
Constructor
[name]( [param:String name], [param:Array times], [param:Array values] )
[page:String name] - (required) identifier for the KeyframeTrack.
[page:Array times] - (required) array of keyframe times.
[page:Array values] - values for the keyframes at the times specified, a
flat array of vector components.
[page:Constant interpolation] - the type of interpolation to use. See
[page:Animation Animation Constants] for possible values. Default is
[page:Animation InterpolateLinear].
Properties
See [page:KeyframeTrack] for inherited properties.
[property:String ValueTypeName]
String 'vector'.
Methods
See [page:KeyframeTrack] for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] →
[name]
A curve representing a 2d line segment.
Constructor
[name]( [param:Vector2 v1], [param:Vector2 v2] )
[page:Vector2 v1] – The start point.
[page:Vector2 v2] - The end point.
Properties
See the base [page:Curve] class for common properties.
[property:Vector2 v1]
The start point.
[property:Vector2 v2]
The end point
Methods
See the base [page:Curve] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

Texture Constants
Mapping Modes
THREE.UVMapping
THREE.CubeReflectionMapping
THREE.CubeRefractionMapping
THREE.EquirectangularReflectionMapping
THREE.EquirectangularRefractionMapping
THREE.CubeUVReflectionMapping
These define the texture's mapping mode.
[page:Constant UVMapping] is the default, and maps the texture using the
mesh's UV coordinates.
The rest define environment mapping types.
[page:Constant CubeReflectionMapping] and [page:Constant CubeRefractionMapping] are for use with a [page:CubeTexture CubeTexture],
which is made up of six textures, one for each face of the cube.
[page:Constant CubeReflectionMapping] is the default for a
[page:CubeTexture CubeTexture].
[page:Constant EquirectangularReflectionMapping] and [page:Constant EquirectangularRefractionMapping] are for use with an equirectangular
environment map. Also called a lat-long map, an equirectangular texture
represents a 360-degree view along the horizontal centerline, and a
180-degree view along the vertical axis, with the top and bottom edges of
the image corresponding to the north and south poles of a mapped
sphere.
See the [example:webgl_materials_envmaps materials / envmaps] example.
Wrapping Modes
THREE.RepeatWrapping
THREE.ClampToEdgeWrapping
THREE.MirroredRepeatWrapping
These define the texture's [page:Texture.wrapS wrapS] and
[page:Texture.wrapT wrapT] properties, which define horizontal and
vertical texture wrapping.
With [page:constant RepeatWrapping] the texture will simply repeat to
infinity.
[page:constant ClampToEdgeWrapping] is the default. The last pixel of the
texture stretches to the edge of the mesh.
With [page:constant MirroredRepeatWrapping] the texture will repeats to
infinity, mirroring on each repeat.
Magnification Filters
THREE.NearestFilter
THREE.LinearFilter
For use with a texture's [page:Texture.magFilter magFilter] property,
these define the texture magnification function to be used when the pixel
being textured maps to an area less than or equal to one texture element
(texel).
[page:constant NearestFilter] returns the value of the texture element
that is nearest (in Manhattan distance) to the specified texture
coordinates.
[page:constant LinearFilter] is the default and returns the weighted
average of the four texture elements that are closest to the specified
texture coordinates, and can include items wrapped or repeated from other
parts of a texture, depending on the values of [page:Texture.wrapS wrapS]
and [page:Texture.wrapT wrapT], and on the exact mapping.
Minification Filters
THREE.NearestFilter
THREE.NearestMipmapNearestFilter
THREE.NearestMipmapLinearFilter
THREE.LinearFilter
THREE.LinearMipmapNearestFilter
THREE.LinearMipmapLinearFilter
For use with a texture's [page:Texture.minFilter minFilter] property,
these define the texture minifying function that is used whenever the
pixel being textured maps to an area greater than one texture element
(texel).
In addition to [page:constant NearestFilter] and [page:constant LinearFilter], the following four functions can be used for
minification:
[page:constant NearestMipmapNearestFilter] chooses the mipmap that most
closely matches the size of the pixel being textured and uses the
[page:constant NearestFilter] criterion (the texel nearest to the center
of the pixel) to produce a texture value.
[page:constant NearestMipmapLinearFilter] chooses the two mipmaps that
most closely match the size of the pixel being textured and uses the
[page:constant NearestFilter] criterion to produce a texture value from
each mipmap. The final texture value is a weighted average of those two
values.
[page:constant LinearMipmapNearestFilter] chooses the mipmap that most
closely matches the size of the pixel being textured and uses the
[page:constant LinearFilter] criterion (a weighted average of the four
texels that are closest to the center of the pixel) to produce a texture
value.
[page:constant LinearMipmapLinearFilter] is the default and chooses the
two mipmaps that most closely match the size of the pixel being textured
and uses the [page:constant LinearFilter] criterion to produce a texture
value from each mipmap. The final texture value is a weighted average of
those two values.
See the [example:webgl_materials_texture_filters materials / texture / filters] example.
Types
THREE.UnsignedByteType
THREE.ByteType
THREE.ShortType
THREE.UnsignedShortType
THREE.IntType
THREE.UnsignedIntType
THREE.FloatType
THREE.HalfFloatType
THREE.UnsignedShort4444Type
THREE.UnsignedShort5551Type
THREE.UnsignedInt248Type
THREE.UnsignedInt5999Type
For use with a texture's [page:Texture.type type] property, which must
correspond to the correct format. See below for details.
[page:constant UnsignedByteType] is the default.
Formats
THREE.AlphaFormat
THREE.RedFormat
THREE.RedIntegerFormat
THREE.RGFormat
THREE.RGIntegerFormat
THREE.RGBFormat
THREE.RGBAFormat
THREE.RGBAIntegerFormat
THREE.LuminanceFormat
THREE.LuminanceAlphaFormat
THREE.DepthFormat
THREE.DepthStencilFormat
For use with a texture's [page:Texture.format format] property, these
define how elements of a 2d texture, or `texels`, are read by shaders.
[page:constant AlphaFormat] discards the red, green and blue components
and reads just the alpha component.
[page:constant RedFormat] discards the green and blue components and reads
just the red component.
[page:constant RedIntegerFormat] discards the green and blue components
and reads just the red component. The texels are read as integers instead
of floating point.
[page:constant RGFormat] discards the alpha, and blue components and reads
the red, and green components.
[page:constant RGIntegerFormat] discards the alpha, and blue components
and reads the red, and green components. The texels are read as integers
instead of floating point.
[page:constant RGBAFormat] is the default and reads the red, green, blue
and alpha components.
[page:constant RGBAIntegerFormat] is the default and reads the red, green,
blue and alpha components. The texels are read as integers instead of
floating point.
[page:constant LuminanceFormat] reads each element as a single luminance
component. This is then converted to a floating point, clamped to the
range [0,1], and then assembled into an RGBA element by placing the
luminance value in the red, green and blue channels, and attaching 1.0 to
the alpha channel.
[page:constant LuminanceAlphaFormat] reads each element as a
luminance/alpha double. The same process occurs as for the [page:constant LuminanceFormat], except that the alpha channel may have values other than
`1.0`.
[page:constant DepthFormat] reads each element as a single depth value,
converts it to floating point, and clamps to the range [0,1]. This is the
default for [page:DepthTexture DepthTexture].
[page:constant DepthStencilFormat] reads each element is a pair of depth
and stencil values. The depth component of the pair is interpreted as in
[page:constant DepthFormat]. The stencil component is interpreted based on
the depth + stencil internal format.
Note that the texture must have the correct [page:Texture.type type] set,
as described above. See
[link:https://developer.mozilla.org/en/docs/Web/API/WebGLRenderingContext/texImage2D WebGLRenderingContext.texImage2D] for details.
DDS / ST3C Compressed Texture Formats
THREE.RGB_S3TC_DXT1_Format
THREE.RGBA_S3TC_DXT1_Format
THREE.RGBA_S3TC_DXT3_Format
THREE.RGBA_S3TC_DXT5_Format
For use with a [page:CompressedTexture CompressedTexture]'s
[page:Texture.format format] property, these require support for the
[link:https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/ WEBGL_compressed_texture_s3tc] extension.
There are four [link:https://en.wikipedia.org/wiki/S3_Texture_Compression S3TC] formats available via this extension. These are:
[page:constant RGB_S3TC_DXT1_Format]: A DXT1-compressed image in an RGB
image format.
[page:constant RGBA_S3TC_DXT1_Format]: A DXT1-compressed image in an RGB
image format with a simple on/off alpha value.
[page:constant RGBA_S3TC_DXT3_Format]: A DXT3-compressed image in an RGBA
image format. Compared to a 32-bit RGBA texture, it offers 4:1
compression.
[page:constant RGBA_S3TC_DXT5_Format]: A DXT5-compressed image in an RGBA
image format. It also provides a 4:1 compression, but differs to the DXT3
compression in how the alpha compression is done.
PVRTC Compressed Texture Formats
THREE.RGB_PVRTC_4BPPV1_Format
THREE.RGB_PVRTC_2BPPV1_Format
THREE.RGBA_PVRTC_4BPPV1_Format
THREE.RGBA_PVRTC_2BPPV1_Format
For use with a [page:CompressedTexture CompressedTexture]'s
[page:Texture.format format] property, these require support for the
[link:https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/	WEBGL_compressed_texture_pvrtc] extension.
PVRTC is typically only available on mobile devices with PowerVR chipsets,
which are mainly Apple devices.
There are four [link:https://en.wikipedia.org/wiki/PVRTC PVRTC] formats
available via this extension. These are:
[page:constant RGB_PVRTC_4BPPV1_Format]: RGB compression in 4-bit mode.
One block for each 4×4 pixels.
[page:constant RGB_PVRTC_2BPPV1_Format]: RGB compression in 2-bit mode.
One block for each 8×4 pixels.
[page:constant RGBA_PVRTC_4BPPV1_Format]: RGBA compression in 4-bit mode.
One block for each 4×4 pixels.
[page:constant RGBA_PVRTC_2BPPV1_Format]: RGBA compression in 2-bit mode.
One block for each 8×4 pixels.
ETC Compressed Texture Format
THREE.RGB_ETC1_Format
THREE.RGB_ETC2_Format
THREE.RGBA_ETC2_EAC_Format
For use with a [page:CompressedTexture CompressedTexture]'s
[page:Texture.format format] property, these require support for the
[link:https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/ WEBGL_compressed_texture_etc1] (ETC1) or
[link:https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc/ WEBGL_compressed_texture_etc] (ETC2) extensions.
ASTC Compressed Texture Format
THREE.RGBA_ASTC_4x4_Format
THREE.RGBA_ASTC_5x4_Format
THREE.RGBA_ASTC_5x5_Format
THREE.RGBA_ASTC_6x5_Format
THREE.RGBA_ASTC_6x6_Format
THREE.RGBA_ASTC_8x5_Format
THREE.RGBA_ASTC_8x6_Format
THREE.RGBA_ASTC_8x8_Format
THREE.RGBA_ASTC_10x5_Format
THREE.RGBA_ASTC_10x6_Format
THREE.RGBA_ASTC_10x8_Format
THREE.RGBA_ASTC_10x10_Format
THREE.RGBA_ASTC_12x10_Format
THREE.RGBA_ASTC_12x12_Format
For use with a [page:CompressedTexture CompressedTexture]'s
[page:Texture.format format] property, these require support for the
[link:https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/ WEBGL_compressed_texture_astc] extension.
BPTC Compressed Texture Format
THREE.RGBA_BPTC_Format
For use with a [page:CompressedTexture CompressedTexture]'s
[page:Texture.format format] property, these require support for the
[link:https://www.khronos.org/registry/webgl/extensions/EXT_texture_compression_bptc/ EXT_texture_compression_bptc] extension.
Texture Comparison functions
THREE.NeverCompare
THREE.LessCompare
THREE.EqualCompare
THREE.LessEqualCompare
THREE.GreaterCompare
THREE.NotEqualCompare
THREE.GreaterEqualCompare
THREE.AlwaysCompare
Internal Formats
'ALPHA'
'RGB'
'RGBA'
'LUMINANCE'
'LUMINANCE_ALPHA'
'RED_INTEGER'
'R8'
'R8_SNORM'
'R8I'
'R8UI'
'R16I'
'R16UI'
'R16F'
'R32I'
'R32UI'
'R32F'
'RG8'
'RG8_SNORM'
'RG8I'
'RG8UI'
'RG16I'
'RG16UI'
'RG16F'
'RG32I'
'RG32UI'
'RG32F'
'RGB565'
'RGB8'
'RGB8_SNORM'
'RGB8I'
'RGB8UI'
'RGB16I'
'RGB16UI'
'RGB16F'
'RGB32I'
'RGB32UI'
'RGB32F'
'RGB9_E5'
'SRGB8'
'R11F_G11F_B10F'
'RGBA4'
'RGBA8'
'RGBA8_SNORM'
'RGBA8I'
'RGBA8UI'
'RGBA16I'
'RGBA16UI'
'RGBA16F'
'RGBA32I'
'RGBA32UI'
'RGBA32F'
'RGB5_A1'
'RGB10_A2'
'RGB10_A2UI'
'SRGB8_ALPHA8'
'DEPTH_COMPONENT16'
'DEPTH_COMPONENT24'
'DEPTH_COMPONENT32F'
'DEPTH24_STENCIL8'
'DEPTH32F_STENCIL8'
For use with a texture's [page:Texture.internalFormat internalFormat]
property, these define how elements of a texture, or `texels`, are stored
on the GPU.
[page:constant R8] stores the red component on 8 bits.
[page:constant R8_SNORM] stores the red component on 8 bits. The component
is stored as normalized.
[page:constant R8I] stores the red component on 8 bits. The component is
stored as an integer.
[page:constant R8UI] stores the red component on 8 bits. The component is
stored as an unsigned integer.
[page:constant R16I] stores the red component on 16 bits. The component is
stored as an integer.
[page:constant R16UI] stores the red component on 16 bits. The component
is stored as an unsigned integer.
[page:constant R16F] stores the red component on 16 bits. The component is
stored as floating point.
[page:constant R32I] stores the red component on 32 bits. The component is
stored as an integer.
[page:constant R32UI] stores the red component on 32 bits. The component
is stored as an unsigned integer.
[page:constant R32F] stores the red component on 32 bits. The component is
stored as floating point.
[page:constant RG8] stores the red and green components on 8 bits each.
[page:constant RG8_SNORM] stores the red and green components on 8 bits
each. Every component is stored as normalized.
[page:constant RG8I] stores the red and green components on 8 bits each.
Every component is stored as an integer.
[page:constant RG8UI] stores the red and green components on 8 bits each.
Every component is stored as an unsigned integer.
[page:constant RG16I] stores the red and green components on 16 bits each.
Every component is stored as an integer.
[page:constant RG16UI] stores the red and green components on 16 bits
each. Every component is stored as an unsigned integer.
[page:constant RG16F] stores the red and green components on 16 bits each.
Every component is stored as floating point.
[page:constant RG32I] stores the red and green components on 32 bits each.
Every component is stored as an integer.
[page:constant RG32UI] stores the red and green components on 32 bits.
Every component is stored as an unsigned integer.
[page:constant RG32F] stores the red and green components on 32 bits.
Every component is stored as floating point.
[page:constant RGB8] stores the red, green, and blue components on 8 bits
each. [page:constant RGB8_SNORM] stores the red, green, and blue
components on 8 bits each. Every component is stored as normalized.
[page:constant RGB8I] stores the red, green, and blue components on 8 bits
each. Every component is stored as an integer.
[page:constant RGB8UI] stores the red, green, and blue components on 8
bits each. Every component is stored as an unsigned integer.
[page:constant RGB16I] stores the red, green, and blue components on 16
bits each. Every component is stored as an integer.
[page:constant RGB16UI] stores the red, green, and blue components on 16
bits each. Every component is stored as an unsigned integer.
[page:constant RGB16F] stores the red, green, and blue components on 16
bits each. Every component is stored as floating point
[page:constant RGB32I] stores the red, green, and blue components on 32
bits each. Every component is stored as an integer.
[page:constant RGB32UI] stores the red, green, and blue components on 32
bits each. Every component is stored as an unsigned integer.
[page:constant RGB32F] stores the red, green, and blue components on 32
bits each. Every component is stored as floating point
[page:constant R11F_G11F_B10F] stores the red, green, and blue components
respectively on 11 bits, 11 bits, and 10bits. Every component is stored as
floating point.
[page:constant RGB565] stores the red, green, and blue components
respectively on 5 bits, 6 bits, and 5 bits.
[page:constant RGB9_E5] stores the red, green, and blue components on 9
bits each.
[page:constant RGBA8] stores the red, green, blue, and alpha components on
8 bits each.
[page:constant RGBA8_SNORM] stores the red, green, blue, and alpha
components on 8 bits. Every component is stored as normalized.
[page:constant RGBA8I] stores the red, green, blue, and alpha components
on 8 bits each. Every component is stored as an integer.
[page:constant RGBA8UI] stores the red, green, blue, and alpha components
on 8 bits. Every component is stored as an unsigned integer.
[page:constant RGBA16I] stores the red, green, blue, and alpha components
on 16 bits. Every component is stored as an integer.
[page:constant RGBA16UI] stores the red, green, blue, and alpha components
on 16 bits. Every component is stored as an unsigned integer.
[page:constant RGBA16F] stores the red, green, blue, and alpha components
on 16 bits. Every component is stored as floating point.
[page:constant RGBA32I] stores the red, green, blue, and alpha components
on 32 bits. Every component is stored as an integer.
[page:constant RGBA32UI] stores the red, green, blue, and alpha components
on 32 bits. Every component is stored as an unsigned integer.
[page:constant RGBA32F] stores the red, green, blue, and alpha components
on 32 bits. Every component is stored as floating point.
[page:constant RGB5_A1] stores the red, green, blue, and alpha components
respectively on 5 bits, 5 bits, 5 bits, and 1 bit.
[page:constant RGB10_A2] stores the red, green, blue, and alpha components
respectively on 10 bits, 10 bits, 10 bits and 2 bits.
[page:constant RGB10_A2UI] stores the red, green, blue, and alpha
components respectively on 10 bits, 10 bits, 10 bits and 2 bits. Every
component is stored as an unsigned integer.
[page:constant SRGB8] stores the red, green, and blue components on 8 bits
each.
[page:constant SRGB8_ALPHA8] stores the red, green, blue, and alpha
components on 8 bits each.
[page:constant DEPTH_COMPONENT16] stores the depth component on 16bits.
[page:constant DEPTH_COMPONENT24] stores the depth component on 24bits.
[page:constant DEPTH_COMPONENT32F] stores the depth component on 32bits.
The component is stored as floating point.
[page:constant DEPTH24_STENCIL8] stores the depth, and stencil components
respectively on 24 bits and 8 bits. The stencil component is stored as an
unsigned integer.
[page:constant DEPTH32F_STENCIL8] stores the depth, and stencil components
respectively on 32 bits and 8 bits. The depth component is stored as
floating point, and the stencil component as an unsigned integer.
Note that the texture must have the correct [page:Texture.type type] set,
as well as the correct [page:Texture.format format]. See
[link:https://developer.mozilla.org/en/docs/Web/API/WebGLRenderingContext/texImage2D WebGLRenderingContext.texImage2D], and
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/texImage3D WebGL2RenderingContext.texImage3D], for more details regarding the
possible combination of [page:Texture.format format],
[page:Texture.internalFormat internalFormat], and [page:Texture.type type].
For more in-depth information regarding internal formats, you can also
refer directly to the
[link:https://www.khronos.org/registry/webgl/specs/latest/2.0/ WebGL2 Specification] and to the
[link:https://www.khronos.org/registry/OpenGL/specs/es/3.0/es_spec_3.0.pdf OpenGL ES 3.0 Specification].
Depth Packing
THREE.BasicDepthPacking
THREE.RGBADepthPacking
For use with the [page:MeshDepthMaterial.depthPacking depthPacking]
property of `MeshDepthMaterial`.
Color Space
THREE.NoColorSpace = ""
THREE.SRGBColorSpace = "srgb"
THREE.LinearSRGBColorSpace = "srgb-linear"
Used to define the color space of textures (and the output color space of
the renderer).
If the color space type is changed after the texture has already been used
by a material, you will need to set [page:Material.needsUpdate Material.needsUpdate] to `true` to make the material recompile.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/constants.js src/constants.js]

[name]
[name] contains spline and Bézier functions internally used by concrete
curve classes.
Methods
[method:Float CatmullRom]( [param:Float t], [param:Float p0], [param:Float p1], [param:Float p2], [param:Float p3] )
t -- interpolation weight.
p0, p1, p2, p3 -- the points defining the spline curve.
Used internally by [page:SplineCurve SplineCurve].
[method:Float QuadraticBezier]( [param:Float t], [param:Float p0], [param:Float p1], [param:Float p2] )
t -- interpolation weight.
p0, p1, p2 -- the starting, control and end points defining the curve.
Used internally by [page:QuadraticBezierCurve3 QuadraticBezierCurve3] and
[page:QuadraticBezierCurve QuadraticBezierCurve].
[method:Float CubicBezier]( [param:Float t], [param:Float p0], [param:Float p1], [param:Float p2], [param:Float p3] )
t -- interpolation weight.
p0, p1, p2, p3 -- the starting, control(twice) and end points defining the
curve.
Used internally by [page:CubicBezierCurve3 CubicBezierCurve3] and
[page:CubicBezierCurve CubicBezierCurve].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A class containing utility functions for images.
Methods
[method:String getDataURL]( [param:HTMLCanvasElement image] |
[param:HTMLImageElement image] | [param:ImageBitmap image] )
image -- The image object.
Returns a data URI containing a representation of the given image.
[method:Object sRGBToLinear]( [param:HTMLCanvasElement image] |
[param:HTMLImageElement image] | [param:ImageBitmap image] )
image -- The image object.
Converts the given sRGB image data to linear color space.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] →
[name]
This helper displays the directional cone of a [page:PositionalAudio].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { PositionalAudioHelper } from 'three/addons/helpers/PositionalAudioHelper.js';
Code Example
const positionalAudio = new THREE.PositionalAudio( listener );
positionalAudio.setDirectionalCone( 180, 230, 0.1 );
const helper = new PositionalAudioHelper( positionalAudio );
positionalAudio.add( helper );
Examples
[example:webaudio_orientation webaudio / orientation ]
Constructor
[name]( [param:PositionalAudio audio], [param:Number range] )
[page:PositionalAudio audio] -- The [page:PositionalAudio] to be visualized.
[page:Number range] -- (optional) The range of the directional cone.
[page:Number divisionsInnerAngle] -- (optional) The amount of divisions of the inner part of the directional cone.
[page:Number divisionsOuterAngle] -- (optional) The amount of divisions of the outer part of the directional cone.
Properties
See the base [page:Object3D] class for common properties.
[property:PositionalAudio audio]
[page:PositionalAudio] to be visualized.
[property:Number range]
The range of the directional cone.
[property:Number divisionsInnerAngle]
The amount of divisions of the inner part of the directional cone.
[property:Number divisionsOuterAngle]
The amount of divisions of the outer part of the directional cone.
Methods
See the base [page:Line] class for common methods.
[method:undefined update]()
Updates the helper.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/PositionalAudioHelper.js examples/jsm/helpers/PositionalAudioHelper.js]

[page:BufferGeometry] →
[name]
A class for generating a two-dimensional ring geometry.
Code Example
const geometry = new THREE.RingGeometry( 1, 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material ); scene.add( mesh );
Constructor
[name]([param:Float innerRadius], [param:Float outerRadius],
[param:Integer thetaSegments], [param:Integer phiSegments], [param:Float thetaStart], [param:Float thetaLength])
innerRadius — Default is `0.5`.
outerRadius — Default is `1`.
thetaSegments — Number of segments. A higher number means the ring will be
more round. Minimum is `3`. Default is `32`.
phiSegments — Number of segments per ring segment. Minimum is `1`. Default is `1`.
thetaStart — Starting angle. Default is `0`.
thetaLength — Central angle. Default is Math.PI * 2.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Represents an axis-aligned bounding box (AABB) in 2D space.
Constructor
[name]( [param:Vector2 min], [param:Vector2 max] )
[page:Vector2 min] - (optional) [page:Vector2] representing the lower (x,
y) boundary of the box. Default is ( + Infinity, + Infinity ).
[page:Vector2 max] - (optional) [page:Vector2] representing the upper (x,
y) boundary of the box. Default is ( - Infinity, - Infinity ).
Creates a [name] bounded by min and max.
Properties
[property:Vector2 min]
[page:Vector2] representing the lower (x, y) boundary of the box.
Default is ( + Infinity, + Infinity ).
[property:Vector2 max]
[page:Vector2] representing the lower upper (x, y) boundary of the box.
Default is ( - Infinity, - Infinity ).
Methods
[method:Vector2 clampPoint]( [param:Vector2 point], [param:Vector2 target] )
[page:Vector2 point] - [page:Vector2] to clamp.
[page:Vector2 target] — the result will be copied into this Vector2.
[link:https://en.wikipedia.org/wiki/Clamping_(graphics) Clamps] the
[page:Vector2 point] within the bounds of this box.
[method:Box2 clone]()
Returns a new [page:Box2] with the same [page:.min min] and [page:.max max] as this one.
[method:Boolean containsBox]( [param:Box2 box] )
[page:Box2 box] - [page:Box2 Box2] to test for inclusion.
Returns true if this box includes the entirety of [page:Box2 box]. If this
and [page:Box2 box] are identical,
this function also returns true.
[method:Boolean containsPoint]( [param:Vector2 point] )
[page:Vector2 point] - [page:Vector2] to check for inclusion.
Returns true if the specified [page:Vector2 point] lies within or on the
boundaries of this box.
[method:this copy]( [param:Box2 box] )
Copies the [page:.min min] and [page:.max max] from [page:Box2 box] to
this box.
[method:Float distanceToPoint]( [param:Vector2 point] )
[page:Vector2 point] - [page:Vector2] to measure distance to.
Returns the distance from any edge of this box to the specified point. If
the [page:Vector2 point] lies inside of this box, the distance will be `0`.
[method:Boolean equals]( [param:Box2 box] )
[page:Box2 box] - Box to compare with this one.
Returns true if this box and [page:Box2 box] share the same lower and
upper bounds.
[method:this expandByPoint]( [param:Vector2 point] )
[page:Vector2 point] - [page:Vector2] that should be included in the
box.
Expands the boundaries of this box to include [page:Vector2 point].
[method:this expandByScalar]( [param:Float scalar] )
[page:Float scalar] - Distance to expand the box by.
Expands each dimension of the box by [page:Float scalar]. If negative, the
dimensions of the box will be contracted.
[method:this expandByVector]( [param:Vector2 vector] )
[page:Vector2 vector] - [page:Vector2] to expand the box by.
Expands this box equilaterally by [page:Vector2 vector]. The width of this
box will be expanded by the x component of [page:Vector2 vector] in both
directions. The height of this box will be expanded by the y component of
[page:Vector2 vector] in both directions.
[method:Vector2 getCenter]( [param:Vector2 target] )
[page:Vector2 target] — the result will be copied into this Vector2.
Returns the center point of the box as a [page:Vector2].
[method:Vector2 getParameter]( [param:Vector2 point], [param:Vector2 target] )
[page:Vector2 point] - [page:Vector2].
[page:Vector2 target] — the result will be copied into this Vector2.
Returns a point as a proportion of this box's width and height.
[method:Vector2 getSize]( [param:Vector2 target] )
[page:Vector2 target] — the result will be copied into this Vector2.
Returns the width and height of this box.
[method:this intersect]( [param:Box2 box] )
[page:Box2 box] - Box to intersect with.
Returns the intersection of this and [page:Box2 box], setting the upper
bound of this box to the lesser of the two boxes' upper bounds and the
lower bound of this box to the greater of the two boxes' lower bounds.
[method:Boolean intersectsBox]( [param:Box2 box] )
[page:Box2 box] - Box to check for intersection against.
Determines whether or not this box intersects [page:Box2 box].
[method:Boolean isEmpty]()
Returns true if this box includes zero points within its bounds.
Note that a box with equal lower and upper bounds still includes one
point, the one both bounds share.
[method:this makeEmpty]()
Makes this box empty.
[method:this set]( [param:Vector2 min], [param:Vector2 max] )
[page:Vector2 min] - (required ) [page:Vector2] representing the lower (x,
y) boundary of the box.
[page:Vector2 max] - (required) [page:Vector2] representing the upper (x,
y) boundary of the box.
Sets the lower and upper (x, y) boundaries of this box.
Please note that this method only copies the values from the given
objects.
[method:this setFromCenterAndSize]( [param:Vector2 center], [param:Vector2 size] )
[page:Vector2 center] - Desired center position of the box
([page:Vector2]).
[page:Vector2 size] - Desired x and y dimensions of the box
([page:Vector2]).
Centers this box on [page:Vector2 center] and sets this box's width and
height to the values specified in [page:Vector2 size].
[method:this setFromPoints]( [param:Array points] )
[page:Array points] - Array of [page:Vector2 Vector2s] that the resulting
box will contain.
Sets the upper and lower bounds of this box to include all of the points
in [page:Array points].
[method:this translate]( [param:Vector2 offset] )
[page:Vector2 offset] - Direction and distance of offset.
Adds [page:Vector2 offset] to both the upper and lower bounds of this box,
effectively moving this box [page:Vector2 offset] units in 2D space.
[method:this union]( [param:Box2 box] )
[page:Box2 box] - Box that will be unioned with this box.
Unions this box with [page:Box2 box], setting the upper bound of this box
to the greater of the two boxes' upper bounds and the lower bound of this
box to the lesser of the two boxes' lower bounds.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:KeyframeTrack] →
[name]
A Track of keyframe values that represent color changes.
The very basic implementation of this subclass has nothing special yet.
However, this is the place for color space parameterization.
Constructor
[name]( [param:String name], [param:Array times], [param:Array values] )
[page:String name] - (required) identifier for the KeyframeTrack.
[page:Array times] - (required) array of keyframe times.
[page:Array values] - values for the keyframes at the times specified, a
flat array of color components between `0` and `1`.
[page:Constant interpolation] - the type of interpolation to use. See
[page:Animation Animation Constants] for possible values. Default is
[page:Animation InterpolateLinear].
Properties
See [page:KeyframeTrack] for inherited properties.
[property:String ValueTypeName]
String 'color'.
Methods
See [page:KeyframeTrack] for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Mesh] →
[name]
A special version of [page:Mesh] with instanced rendering support. Use
[name] if you have to render a large number of objects with the same
geometry and material but with different world transformations. The usage
of [name] will help you to reduce the number of draw calls and thus
improve the overall rendering performance in your application.
Examples
[example:webgl_instancing_dynamic WebGL / instancing / dynamic]
[example:webgl_instancing_performance WebGL / instancing / performance]
[example:webgl_instancing_scatter WebGL / instancing / scatter]
[example:webgl_instancing_raycast WebGL / instancing / raycast]
Constructor
[name]( [param:BufferGeometry geometry], [param:Material material],
[param:Integer count] )
[page:BufferGeometry geometry] - an instance of [page:BufferGeometry].
[page:Material material] - an instance of [page:Material]. Default is a
new [page:MeshBasicMaterial].
[page:Integer count] - the number of instances.
Properties
See the base [page:Mesh] class for common properties.
[property:Box3 boundingBox]
This bounding box encloses all instances of the [name]. Can be calculated
with [page:.computeBoundingBox](). Default is `null`.
[property:Sphere boundingSphere]
This bounding sphere encloses all instances of the [name]. Can be
calculated with [page:.computeBoundingSphere](). Default is `null`.
[property:Integer count]
The number of instances. The `count` value passed into the constructor
represents the maximum number of instances of this mesh. You can change
the number of instances at runtime to an integer value in the range [0, count].
If you need more instances than the original count value, you have to
create a new [name].
[property:InstancedBufferAttribute instanceColor]
Represents the colors of all instances. `null` by default. You have to set
its [page:BufferAttribute.needsUpdate needsUpdate] flag to true if you
modify instanced data via [page:.setColorAt]().
[property:InstancedBufferAttribute instanceMatrix]
Represents the local transformation of all instances. You have to set its
[page:BufferAttribute.needsUpdate needsUpdate] flag to true if you modify
instanced data via [page:.setMatrixAt]().
[property:DataTexture morphTexture]
Represents the morph target weights of all instances. You have to set its
[page:Texture.needsUpdate needsUpdate] flag to true if you modify
instanced data via [page:.setMorphAt]().
[property:Boolean isInstancedMesh]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Mesh] class for common methods.
[method:undefined computeBoundingBox]()
Computes the bounding box of the instanced mesh, and updates the [page:.boundingBox] attribute.
The bounding box is not computed by the engine; it must be computed by your app.
You may need to recompute the bounding box if an instance is transformed via [page:.setMatrixAt]().
[method:undefined computeBoundingSphere]()
Computes the bounding sphere of the instanced mesh, and updates the [page:.boundingSphere] attribute.
The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
You may need to recompute the bounding sphere if an instance is transformed via [page:.setMatrixAt]().
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:undefined getColorAt]( [param:Integer index], [param:Color color] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Color color]: This color object will be set to the color of the
defined instance.
Get the color of the defined instance.
[method:undefined getMatrixAt]( [param:Integer index], [param:Matrix4 matrix] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Matrix4 matrix]: This 4x4 matrix will be set to the local
transformation matrix of the defined instance.
Get the local transformation matrix of the defined instance.
[method:undefined getMorphAt]( [param:Integer index], [param:Mesh mesh] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Mesh mesh]: The [page:Mesh.morphTargetInfluences .morphTargetInfluences] property of this mesh will be filled with the morph target weights of the defined instance.
Get the morph target weights of the defined instance.
[method:undefined setColorAt]( [param:Integer index], [param:Color color] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Color color]: The color of a single instance.
Sets the given color to the defined instance. Make sure you set
[page:.instanceColor][page:BufferAttribute.needsUpdate .needsUpdate] to
true after updating all the colors.
[method:undefined setMatrixAt]( [param:Integer index], [param:Matrix4 matrix] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Matrix4 matrix]: A 4x4 matrix representing the local transformation
of a single instance.
Sets the given local transformation matrix to the defined instance. Make
sure you set [page:.instanceMatrix][page:BufferAttribute.needsUpdate .needsUpdate]
to true after updating all the matrices.
[method:undefined setMorphAt]( [param:Integer index], [param:Mesh mesh] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Mesh mesh]: A mesh with [page:Mesh.morphTargetInfluences .morphTargetInfluences] property containing the morph target weights
of a single instance.
Sets the morph target weights to the defined instance. Make
sure you set [page:.morphTexture][page:Texture.needsUpdate .needsUpdate]
to true after updating all the influences.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A point's
[link:https://en.wikipedia.org/wiki/Cylindrical_coordinate_system cylindrical coordinates].
Constructor
[name]( [param:Float radius], [param:Float theta], [param:Float y] )
[page:Float radius] - distance from the origin to a point in the x-z
plane. Default is `1.0`.
[page:Float theta] - counterclockwise angle in the x-z plane measured in
radians from the positive z-axis. Default is `0`.
[page:Float y] - height above the x-z plane. Default is `0`.
Properties
[property:Float radius]
[property:Float theta]
[property:Float y]
Methods
[method:Cylindrical clone]()
Returns a new cylindrical with the same [page:.radius radius],
[page:.theta theta] and [page:.y y] properties as this one.
[method:this copy]( [param:Cylindrical other] )
Copies the values of the passed Cylindrical's [page:.radius radius],
[page:.theta theta] and [page:.y y] properties to this cylindrical.
[method:this set]( [param:Float radius], [param:Float theta], [param:Float y] )
Sets values of this cylindrical's [page:.radius radius], [page:.theta theta] and [page:.y y] properties.
[method:this setFromVector3]( [param:Vector3 vec3] )
Sets values of this cylindrical's [page:.radius radius], [page:.theta theta]
and [page:.y y] properties from the [page:Vector3 Vector3].
[method:this setFromCartesianCoords]( [param:Float x], [param:Float y], [param:Float z] )
Sets values of this cylindrical's [page:.radius radius], [page:.theta theta] and
[page:.y y] properties from Cartesian coordinates.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
This material can receive shadows, but otherwise is completely
transparent.
Code Example
const geometry = new THREE.PlaneGeometry( 2000, 2000 );
geometry.rotateX( - Math.PI / 2 );
const material = new THREE.ShadowMaterial();
material.opacity = 0.2;
const plane = new THREE.Mesh( geometry, material );
plane.position.y = -200;
plane.receiveShadow = true;
scene.add( plane );
Examples
[example:webgl_geometry_spline_editor geometry / spline / editor]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
Properties
See the base [page:Material] classes for common properties.
[property:Color color]
[page:Color] of the material, by default set to black (0x000000).
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Boolean transparent]
Defines whether this material is transparent. Default is `true`.
Methods
See the base [page:Material] classes for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Class representing a color.
Iterating through a [name] instance will yield its components (r, g, b) in
the corresponding order.
Code Examples
A Color can be initialised in any of the following ways:
//empty constructor - will default white
const color1 = new THREE.Color();
//Hexadecimal color (recommended)
const color2 = new THREE.Color( 0xff0000 );
//RGB string
const color3 = new THREE.Color("rgb(255, 0, 0)");
const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
//X11 color name - all 140 color names are supported.
//Note the lack of CamelCase in the name
const color5 = new THREE.Color( 'skyblue' );
//HSL string
const color6 = new THREE.Color("hsl(0, 100%, 50%)");
//Separate RGB values between 0 and 1
const color7 = new THREE.Color( 1, 0, 0 );
Constructor
[name]( [param:Color_Hex_or_String r], [param:Float g], [param:Float b] )
[page:Color_Hex_or_String r] - (optional) If arguments [page:Float g] and
[page:Float b] are defined, the red component of the color. If they are
not defined, it can be a
[link:https://en.wikipedia.org/wiki/Web_colors#Hex_triplet hexadecimal triplet] (recommended),
a CSS-style string, or another `Color` instance.
[page:Float g] - (optional) If it is defined, the green component of the
color.
[page:Float b] - (optional) If it is defined, the blue component of the
color.
Note that standard method of specifying color in three.js is with a
[link:https://en.wikipedia.org/wiki/Web_colors#Hex_triplet hexadecimal triplet],
and that method is used throughout the rest of the
documentation.
When all arguments are defined then [page:Color_Hex_or_String r] is the
red component, [page:Float g] is the green component and [page:Float b] is
the blue component of the color.
When only [page:Color_Hex_or_String r] is defined:
It can be a [link:https://en.wikipedia.org/wiki/Web_colors#Hex_triplet hexadecimal triplet] representing the color (recommended).
It can be an another Color instance.
It can be a CSS-style string. For example:
'rgb(250, 0,0)'
'rgb(100%,0%,0%)'
'hsl(0, 100%, 50%)'
'#ff0000'
'#f00'
'red'
Properties
[property:Boolean isColor]
Read-only flag to check if a given object is of type [name].
[property:Float r]
Red channel value between `0` and `1`. Default is `1`.
[property:Float g]
Green channel value between `0` and `1`. Default is `1`.
[property:Float b]
Blue channel value between `0` and `1`. Default is `1`.
Methods
[method:this add]( [param:Color color] )
Adds the RGB values of [page:Color color] to the RGB values of this color.
[method:this addColors]( [param:Color color1], [param:Color color2] )
Sets this color's RGB values to the sum of the RGB values of [page:Color color1] and [page:Color color2].
[method:this addScalar]( [param:Number s] )
Adds [page:Number s] to the RGB values of this color.
[method:this applyMatrix3]( [param:Matrix3 m] )
Applies the transform [page:Matrix3 m] to this color's RGB components.
[method:Color clone]()
Returns a new Color with the same [page:.r r], [page:.g g] and [page:.b b]
values as this one.
[method:this copy]( [param:Color color] )
Copies the [page:.r r], [page:.g g] and [page:.b b] parameters from
[page:Color color] in to this color.
[method:this convertLinearToSRGB]()
Converts this color from linear space to sRGB space.
[method:this convertSRGBToLinear]()
Converts this color from sRGB space to linear space.
[method:this copyLinearToSRGB]( [param:Color color] )
[page:Color color] — Color to copy.
Copies the given color into this color, and then converts this color from
linear space to sRGB space.
[method:this copySRGBToLinear]( [param:Color color] )
[page:Color color] — Color to copy.
Copies the given color into this color, and then converts this color from
sRGB space to linear space.
[method:Boolean equals]( [param:Color color] )
Compares the RGB values of [page:Color color] with those of this object.
Returns true if they are the same, false otherwise.
[method:this fromArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - [page:Array] of floats in the form [ [page:Float r],
[page:Float g], [page:Float b] ].
[page:Integer offset] - An optional offset into the array.
Sets this color's components based on an array formatted like [
[page:Float r], [page:Float g], [page:Float b] ].
[method:this fromBufferAttribute]( [param:BufferAttribute attribute], [param:Integer index] )
[page:BufferAttribute attribute] - the source attribute.
[page:Integer index] - index in the attribute.
Sets this color's components from the [page:BufferAttribute attribute].
[method:Integer getHex]( [param:string colorSpace] = SRGBColorSpace )
Returns the hexadecimal value of this color.
[method:String getHexString]( [param:string colorSpace] = SRGBColorSpace )
Returns the hexadecimal value of this color as a string (for example,
'FFFFFF').
[method:Object getHSL]( [param:Object target], [param:string colorSpace] = LinearSRGBColorSpace )
[page:Object target] — the result will be copied into this Object. Adds h,
s and l keys to the object (if not already present).
Convert this Color's [page:.r r], [page:.g g] and [page:.b b] values to
[link:https://en.wikipedia.org/wiki/HSL_and_HSV HSL] format and returns an
object of the form:
{
h: 0,
s: 0,
l: 0
}
[method:Color getRGB]( [param:Color target], [param:string colorSpace] = LinearSRGBColorSpace )
[page:Color target] — the result will be copied into this object.
Returns the RGB values of this color as an instance of [page:Color].
[method:String getStyle]( [param:string colorSpace] = SRGBColorSpace )
Returns the value of this color as a CSS style string. Example:
`rgb(255,0,0)`.
[method:this lerp]( [param:Color color], [param:Float alpha] )
[page:Color color] - color to converge on.
[page:Float alpha] - interpolation factor in the closed interval `[0,
1]`.
Linearly interpolates this color's RGB values toward the RGB values of the
passed argument. The alpha argument can be thought of as the ratio between
the two colors, where `0.0` is this color and `1.0` is the first argument.
[method:this lerpColors]( [param:Color color1], [param:Color color2], [param:Float alpha] )
[page:Color color1] - the starting [page:Color].
[page:Color color2] - [page:Color] to interpolate towards.
[page:Float alpha] - interpolation factor, typically in the closed
interval `[0, 1]`.
Sets this color to be the color linearly interpolated between [page:Color color1]
and [page:Color color2] where alpha is the percent distance along
the line connecting the two colors - alpha = 0 will be [page:Color color1],
and alpha = 1 will be [page:Color color2].
[method:this lerpHSL]( [param:Color color], [param:Float alpha] )
[page:Color color] - color to converge on.
[page:Float alpha] - interpolation factor in the closed interval `[0,
1]`.
Linearly interpolates this color's HSL values toward the HSL values of the
passed argument. It differs from the classic [page:.lerp] by not
interpolating straight from one color to the other, but instead going
through all the hues in between those two colors. The alpha argument can
be thought of as the ratio between the two colors, where 0.0 is this color
and 1.0 is the first argument.
[method:this multiply]( [param:Color color] )
Multiplies this color's RGB values by the given [page:Color color]'s RGB
values.
[method:this multiplyScalar]( [param:Number s] )
Multiplies this color's RGB values by [page:Number s].
[method:this offsetHSL]( [param:Float h], [param:Float s], [param:Float l] )
Adds the given [page:Float h], [page:Float s], and [page:Float l] to this
color's values. Internally, this converts the color's [page:.r r],
[page:.g g] and [page:.b b] values to HSL, adds [page:Float h],
[page:Float s], and [page:Float l], and then converts the color back to
RGB.
[method:this set]( [param:Color_Hex_or_String r], [param:Float g], [param:Float b] )
[page:Color_Hex_or_String r] - (optional) If arguments [page:Float g] and [page:Float b] are defined, the red component of the color. If they are
not defined, it can be a [link:https://en.wikipedia.org/wiki/Web_colors#Hex_triplet hexadecimal triplet] (recommended),
a CSS-style string, or another `Color` instance.
[page:Float g] - (optional) If it is defined, the green component of the color.
[page:Float b] - (optional) If it is defined, the blue component of the color.
See the Constructor above for full details about possible arguments. Delegates to [page:.copy],
[page:.setStyle], [page:.setRGB] or [page:.setHex] depending on input type.
[method:this setFromVector3]( [param:Vector3 vector] )
Sets this colors's [page:.r r], [page:.g g] and [page:.b b] components
from the x, y, and z components of the specified [page:Vector3 vector].
[method:this setHex]( [param:Integer hex], [param:string colorSpace] = SRGBColorSpace )
[page:Integer hex] —
[link:https://en.wikipedia.org/wiki/Web_colors#Hex_triplet hexadecimal triplet] format.
Sets this color from a hexadecimal value.
[method:this setHSL]( [param:Float h], [param:Float s], [param:Float l], [param:string colorSpace] = LinearSRGBColorSpace )
[page:Float h] — hue value between `0.0` and `1.0`
[page:Float s] — saturation value between `0.0` and `1.0`
[page:Float l] — lightness value between `0.0` and `1.0`
Sets color from HSL values.
[method:this setRGB]( [param:Float r], [param:Float g], [param:Float b], [param:string colorSpace] = LinearSRGBColorSpace )
[page:Float r] — Red channel value between `0.0` and `1.0`.
[page:Float g] — Green channel value between `0.0` and `1.0`.
[page:Float b] — Blue channel value between `0.0` and `1.0`.
Sets this color from RGB values.
[method:this setScalar]( [param:Float scalar] )
[page:Float scalar] — a value between `0.0` and `1.0`.
Sets all three color components to the value [page:Float scalar].
[method:this setStyle]( [param:String style], [param:string colorSpace] = SRGBColorSpace )
[page:String style] — color as a CSS-style string.
Sets this color from a CSS-style string. For example, "rgb(250, 0,0)",
"rgb(100%, 0%, 0%)", "hsl(0, 100%, 50%)", "#ff0000", "#f00", or "red" ( or
any [link:https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart X11 color name] -
all 140 color names are supported ).
Translucent colors such as "rgba(255, 0, 0, 0.5)" and "hsla(0, 100%, 50%,
0.5)" are also accepted, but the alpha-channel coordinate will be
discarded.
Note that for X11 color names, multiple words such as Dark Orange become
the string 'darkorange'.
[method:this setColorName]( [param:String style], [param:string colorSpace] = SRGBColorSpace )
[page:String style] — color name ( from
[link:https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart X11 color names] ).
Sets this color from a color name. Faster than [page:.setStyle] method if
you don't need the other CSS-style formats.
For convenience, the list of names is exposed in Color.NAMES as a hash:
Color.NAMES.aliceblue // returns 0xF0F8FF
[method:this sub]( [param:Color color] )
Subtracts the RGB components of the given color from the RGB components of
this color. If this results in a negative component, that component is set
to zero.
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - An optional array to store the color to.
[page:Integer offset] - An optional offset into the array.
Returns an array of the form [ r, g, b ].
[method:Number toJSON]()
This methods defines the serialization result of [name]. Returns the color
as a hexadecimal value.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:LightShadow] →
[name]
This is used internally by [page:SpotLight SpotLights] for calculating
shadows.
Code Example
//Create a WebGLRenderer and turn on shadows in the renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//Create a SpotLight and turn on shadows for the light
const light = new THREE.SpotLight( 0xffffff );
light.castShadow = true; // default false
scene.add( light );
//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
light.shadow.focus = 1; // default
//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );
//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add( plane );
//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
Constructor
The constructor creates a [param:PerspectiveCamera PerspectiveCamera] to
manage the shadow's view of the world.
Properties
See the base [page:LightShadow LightShadow] class for common properties.
[property:Camera camera]
The light's view of the world. This is used to generate a depth map of the
scene; objects behind other objects from the light's perspective will be
in shadow.
The default is a [page:PerspectiveCamera] with
[page:PerspectiveCamera.near near] clipping plane at `0.5`. The
[page:PerspectiveCamera.fov fov] will track the [page:SpotLight.angle angle]
property of the owning [page:SpotLight SpotLight] via the
[page:SpotLightShadow.update update] method. Similarly, the
[page:PerspectiveCamera.aspect aspect] property will track the aspect of
the [page:LightShadow.mapSize mapSize]. If the [page:SpotLight.distance distance]
property of the light is set, the [page:PerspectiveCamera.far far]
clipping plane will track that, otherwise it defaults to `500`.
[property:Number focus]
Used to focus the shadow camera. The camera's field of view is set as a
percentage of the spotlight's field-of-view. Range is `[0, 1]`. Default is
`1.0`.
[property:Boolean isSpotLightShadow]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:LightShadow LightShadow] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/lights/[name].js src/lights/[name].js]

[page:Object3D] → [page:Line] →
[name]
A series of lines drawn between pairs of vertices.
This is nearly the same as [page:Line]; the only difference is that it is
rendered using
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements gl.LINES] instead of
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements gl.LINE_STRIP].
Constructor
[name]( [param:BufferGeometry geometry], [param:Material material] )
[page:BufferGeometry geometry] — Pair(s) of vertices representing each
line segment(s).
[page:Material material] — Material for the line. Default is
[page:LineBasicMaterial LineBasicMaterial].
Properties
See the base [page:Line] class for common properties.
[property:Boolean isLineSegments]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Line] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
Level of Detail - show meshes with more or less geometry based on distance
from the camera.
Every level is associated with an object, and rendering can be switched
between them at the distances specified. Typically you would create, say,
three meshes, one for far away (low detail), one for mid range (medium
detail) and one for close up (high detail).
Code Example
const lod = new THREE.LOD();
//Create spheres with 3 levels of detail and create new LOD levels for them
for( let i = 0; i < 3; i++ ) {
const geometry = new THREE.IcosahedronGeometry( 10, 3 - i );
const mesh = new THREE.Mesh( geometry, material );
lod.addLevel( mesh, i * 75 );
}
scene.add( lod );
Examples
[example:webgl_lod webgl / lod ]
Constructor
[name]( )
Creates a new [name].
Properties
See the base [page:Object3D] class for common properties.
[property:Boolean autoUpdate]
Whether the LOD object is updated automatically by the renderer per frame
or not. If set to false, you have to call [page:LOD.update]() in the
render loop by yourself. Default is true.
[property:Boolean isLOD]
Read-only flag to check if a given object is of type [name].
[property:Array levels]
An array of [page:Object level] objects
Each level is an object with the following properties:
[page:Object3D object] - The [page:Object3D] to display at this level.
[page:Float distance] - The distance at which to display this level of
detail.
[page:Float hysteresis] - Threshold used to avoid flickering at LOD
boundaries, as a fraction of distance.
Methods
See the base [page:Object3D] class for common methods.
[method:this addLevel]( [param:Object3D object], [param:Float distance], [param:Float hysteresis] )
[page:Object3D object] - The [page:Object3D] to display at this level.
[page:Float distance] - The distance at which to display this level of
detail. Default `0.0`.
[page:Float hysteresis] - Threshold used to avoid flickering at LOD
boundaries, as a fraction of distance. Default `0.0`.
Adds a mesh that will display at a certain distance and greater. Typically
the further away the distance, the lower the detail on the mesh.
[method:LOD clone]()
Returns a clone of this LOD object with its associated levels.
[method:Integer getCurrentLevel]()
Get the currently active LOD level. As index of the levels array.
[method:Object3D getObjectForDistance]( [param:Float distance] )
Get a reference to the first [page:Object3D] (mesh) that is greater than
[page:Float distance].
[method:undefined raycast]( [param:Raycaster raycaster], [param:Array intersects] )
Get intersections between a casted [page:Ray] and this LOD.
[page:Raycaster.intersectObject] will call this method.
[method:Object toJSON]( meta )
Create a JSON structure with details of this LOD object.
[method:undefined update]( [param:Camera camera] )
Set the visibility of each [page:levels level]'s [page:Object3D object]
based on distance from the [page:Camera camera].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Texture] →
[name]
Creates a texture for use with a video.
Note: After the initial use of a texture, the video cannot be changed.
Instead, call [page:.dispose]() on the texture and instantiate a new one.
Code Example
// assuming you have created a HTML video element with id="video"
const video = document.getElementById( 'video' );
const texture = new THREE.VideoTexture( video );
Examples
[example:webgl_materials_video materials / video]
[example:webgl_materials_video_webcam materials / video / webcam]
[example:webgl_video_kinect video / kinect]
[example:webgl_video_panorama_equirectangular video / panorama / equirectangular]
[example:webxr_vr_video vr / video]
Constructor
[name]( [param:Video video], [param:Constant mapping], [param:Constant wrapS],
[param:Constant wrapT], [param:Constant magFilter], [param:Constant minFilter],
[param:Constant format], [param:Constant type], [param:Number anisotropy] )
[page:Video video] -- The video element to use as the texture.
[page:Constant mapping] -- How the image is applied to the object. An
object type of [page:Textures THREE.UVMapping].
See [page:Textures mapping constants] for other choices.
[page:Constant wrapS] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant wrapT] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant magFilter] -- How the texture is sampled when a texel
covers more than one pixel. The default is [page:Textures THREE.LinearFilter].
See [page:Textures magnification filter constants]
for other choices.
[page:Constant minFilter] -- How the texture is sampled when a texel
covers less than one pixel. The default is [page:Textures THREE.LinearFilter].
See [page:Textures minification filter constants] for
other choices.
[page:Constant format] -- The default is [page:Textures THREE.RGBAFormat].
See [page:Textures format constants] for other choices.
[page:Constant type] -- Default is [page:Textures THREE.UnsignedByteType].
See [page:Textures type constants] for other choices.
[page:Number anisotropy] -- The number of samples taken along the axis
through the pixel that has the highest density of texels. By default, this
value is `1`. A higher value gives a less blurry result than a basic mipmap,
at the cost of more texture samples being used. Use
[page:WebGLrenderer.getMaxAnisotropy renderer.getMaxAnisotropy]() to find
the maximum valid anisotropy value for the GPU; this value is usually a
power of 2.
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean generateMipmaps]
Whether to generate mipmaps. `false` by default.
[property:Boolean isVideoTexture]
Read-only flag to check if a given object is of type [name].
[property:Boolean needsUpdate]
You will not need to set this manually here as it is handled by the
[page:VideoTexture.update update]() method.
Methods
See the base [page:Texture Texture] class for common methods.
[method:undefined update]()
This is called automatically and sets [page:VideoTexture.needsUpdate .needsUpdate]
to `true` every time a new frame is available.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

Custom Blending Equation Constants
These work with all material types. First set the material's blending mode
to THREE.CustomBlending, then set the desired Blending Equation, Source
Factor and Destination Factor.
Code Example
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
material.blending = THREE.CustomBlending;
material.blendEquation = THREE.AddEquation; //default
material.blendSrc = THREE.SrcAlphaFactor;
//default
material.blendDst = THREE.OneMinusSrcAlphaFactor; //default
Examples
[example:webgl_materials_blending_custom materials / blending / custom ]
Blending Equations
THREE.AddEquation
THREE.SubtractEquation
THREE.ReverseSubtractEquation
THREE.MinEquation
THREE.MaxEquation
Source Factors
THREE.ZeroFactor
THREE.OneFactor
THREE.SrcColorFactor
THREE.OneMinusSrcColorFactor
THREE.SrcAlphaFactor
THREE.OneMinusSrcAlphaFactor
THREE.DstAlphaFactor
THREE.OneMinusDstAlphaFactor
THREE.DstColorFactor
THREE.OneMinusDstColorFactor
THREE.SrcAlphaSaturateFactor
THREE.ConstantColorFactor
THREE.OneMinusConstantColorFactor
THREE.ConstantAlphaFactor
THREE.OneMinusConstantAlphaFactor
Destination Factors
All of the Source Factors are valid as Destination Factors, except for
THREE.SrcAlphaSaturateFactor
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/constants.js src/constants.js]

[page:Loader] →
[name]
A loader for
`MMD`
resources.
[name] creates Three.js Objects from MMD resources as PMD, PMX, VMD, and VPD files.
See [page:MMDAnimationHelper] for MMD animation handling as IK, Grant, and Physics.
If you want raw content of MMD resources, use .loadPMD/PMX/VMD/VPD methods.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
Code Example
// Instantiate a loader
const loader = new MMDLoader();
// Load a MMD model
loader.load(
// path to PMD/PMX file
'models/mmd/miku.pmd',
// called when the resource is loaded
function ( mesh ) {
scene.add( mesh );
},
// called when loading is in progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_mmd]
[example:webgl_loader_mmd_pose]
[example:webgl_loader_mmd_audio]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.pmd` or `.pmx` file.
[page:Function onLoad] — A function to be called after the loading is successfully completed.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading PMD/PMX model file from url and fire the callback function with the parsed [page:SkinnedMesh] containing [page:BufferGeometry] and an array of [page:MeshToonMaterial].
[method:undefined loadAnimation]( [param:String url], [param:Object3D object], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string or an array of string containing the path/URL of the `.vmd` file(s).If two or more files are specified, they'll be merged.
[page:Object3D object] — [page:SkinnedMesh] or [page:Camera]. Clip and its tracks will be fitting to this object.
[page:Function onLoad] — A function to be called after the loading is successfully completed.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading VMD motion file(s) from url(s) and fire the callback function with the parsed [page:AnimationClip].
[method:undefined loadWithAnimation]( [param:String modelUrl], [param:String vmdUrl], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String modelUrl] — A string containing the path/URL of the `.pmd` or `.pmx` file.
[page:String vmdUrl] — A string or an array of string containing the path/URL of the `.vmd` file(s).
[page:Function onLoad] — A function to be called after the loading is successfully completed.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading PMD/PMX model file and VMD motion file(s) from urls and fire the callback function with an [page:Object] containing parsed [page:SkinnedMesh] and [page:AnimationClip] fitting to the [page:SkinnedMesh].
[method:this setAnimationPath]( [param:String animationPath] )
[page:String animationPath] — Base path for loading animation data (VMD/VPD files).
Set the base path for additional resources like textures.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/MMDLoader.js examples/jsm/loaders/MMDLoader.js]

[name]
[name] can be used to render geometric data using SVG. The produced vector graphics are particular useful in the following use cases:
Animated logos or icons
Interactive 2D/3D diagrams or graphs
Interactive maps
Complex or animated user interfaces
[name] has various advantages. It produces crystal-clear and sharp output which is independent of the actual viewport resolution.
SVG elements can be styled via CSS. And they have good accessibility since it's possible to add metadata like title or description (useful for search engines or screen readers).
There are, however, some important limitations:
No advanced shading
No texture support
No shadow support
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';
Examples
[example:svg_lines lines]
[example:svg_sandbox sandbox]
Constructor
[name]()
Properties
[property:Number overdraw]
Number of fractional pixels to enlarge polygons in order to prevent anti-aliasing gaps. Range is [0..1]. Default is `0.5`.
Methods
[method:undefined clear]()
Tells the renderer to clear its drawing surface.
[method:Object getSize]()
Returns an object containing the width and height of the renderer.
[method:undefined render]( [param:Scene scene], [param:Camera camera] )
Renders a [page:Scene scene] using a [page:Camera camera].
[method:undefined setClearColor]( [param:Color color], [param:number alpha] )
Sets the clearColor and the clearAlpha.
[method:undefined setPrecision]( [param:Number precision] )
Sets the precision of the data used to create a path.
[method:undefined setQuality]()
Sets the render quality. Possible values are `low` and `high` (default).
[method:undefined setSize]( [param:Number width], [param:Number height] )
Resizes the renderer to (width, height).
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/SVGRenderer.js examples/jsm/renderers/SVGRenderer.js]

[name]
Constructor for the GLSL program sent to vertex and fragment shaders, including default uniforms and attributes.
Built-in uniforms and attributes
Vertex shader (unconditional):
// = object.matrixWorld
uniform mat4 modelMatrix;
// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;
// = camera.projectionMatrix
uniform mat4 projectionMatrix;
// = camera.matrixWorldInverse
uniform mat4 viewMatrix;
// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;
// = camera position in world space
uniform vec3 cameraPosition;
// default vertex attributes provided by BufferGeometry
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
Note that you can therefore calculate the position of a vertex in the vertex shader by:
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
or alternatively
gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
Vertex shader (conditional):
#ifdef USE_TANGENT
attribute vec4 tangent;
#endif
#if defined( USE_COLOR_ALPHA )
// vertex color attribute with alpha
attribute vec4 color;
#elif defined( USE_COLOR )
// vertex color attribute
attribute vec3 color;
#endif
#ifdef USE_MORPHTARGETS
attribute vec3 morphTarget0;
attribute vec3 morphTarget1;
attribute vec3 morphTarget2;
attribute vec3 morphTarget3;
#ifdef USE_MORPHNORMALS
attribute vec3 morphNormal0;
attribute vec3 morphNormal1;
attribute vec3 morphNormal2;
attribute vec3 morphNormal3;
#else
attribute vec3 morphTarget4;
attribute vec3 morphTarget5;
attribute vec3 morphTarget6;
attribute vec3 morphTarget7;
#endif
#endif
#ifdef USE_SKINNING
attribute vec4 skinIndex;
attribute vec4 skinWeight;
#endif
#ifdef USE_INSTANCING
// Note that modelViewMatrix is not set when rendering an instanced model,
// but can be calculated from viewMatrix * modelMatrix.
//
// Basic Usage:
//
gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
attribute mat4 instanceMatrix;
#endif
Fragment shader:
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
Constructor
[name]( [param:WebGLRenderer renderer], [param:String cacheKey], [param:Object parameters] )
For parameters see [page:WebGLRenderer WebGLRenderer].
Properties
[property:String name]
The name of the respective shader program.
[property:String id]
The identifier of this instance.
[property:String cacheKey]
This key enables the reusability of a single [name] for different materials.
[property:Integer usedTimes]
How many times this instance is used for rendering render items.
[property:Object program]
The actual shader program.
[property:WebGLShader vertexShader]
The vertex shader.
[property:WebGLShader fragmentShader]
The fragment shader.
Methods
[method:Object getUniforms]()
Returns a name-value mapping of all active uniform locations.
[method:Object getAttributes]()
Returns a name-value mapping of all active vertex attribute locations.
[method:undefined destroy]()
Destroys an instance of [name].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Camera] → [page:PerspectiveCamera] →
[name]
[name] can be used in order to efficiently render a scene with a
predefined set of cameras. This is an important performance aspect for
rendering VR scenes.
An instance of [name] always has an array of sub cameras. It's mandatory
to define for each sub camera the `viewport` property which determines the
part of the viewport that is rendered with this camera.
Examples
[example:webgl_camera_array camera / array ]
Constructor
[name]( [param:Array array] )
An array of cameras.
Properties
See the base [page:PerspectiveCamera] class for common properties.
[property:Array cameras]
An array of cameras.
[property:Boolean isArrayCamera]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:PerspectiveCamera] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
[name] is defined by a MatCap (or Lit Sphere) texture, which encodes the
material color and shading.
[name] does not respond to lights since the matcap image file encodes
baked lighting. It will cast a shadow onto an object that receives shadows
(and shadow clipping works), but it will not self-shadow or receive
shadows.
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Texture bumpMap]
The texture to create a bump map. The black and white values map to the
perceived depth in relation to the lights. Bump doesn't actually affect
the geometry of the object, only the lighting. If a normal map is defined
this will be ignored.
[property:Float bumpScale]
How much the bump map affects the material. Typical ranges are 0-1.
Default is `1`.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Boolean flatShading]
Define whether the material is rendered with flat shading. Default is
false.
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null. The texture map color is modulated by the
diffuse [page:.color].
[property:Texture matcap]
The matcap map. Default is null.
[property:Texture normalMap]
The texture to create a normal map. The RGB values affect the surface
normal for each pixel fragment and change the way the color is lit. Normal
maps do not change the actual shape of the surface, only the lighting. In
case the material has a normal map authored using the left handed
convention, the y component of normalScale should be negated to compensate
for the different handedness.
[property:Integer normalMapType]
The type of normal map.
Options are [page:constant THREE.TangentSpaceNormalMap] (default), and
[page:constant THREE.ObjectSpaceNormalMap].
[property:Vector2 normalScale]
How much the normal map affects the material. Typical ranges are 0-1.
Default is a [page:Vector2] set to (1,1).
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
One important aspect in order to improve performance and avoid memory leaks in your application is the disposal of unused library entities.
Whenever you create an instance of a *three.js* type, you allocate a certain amount of memory. However, *three.js* creates for specific objects
like geometries or materials WebGL related entities like buffers or shader programs which are necessary for rendering. It's important to
highlight that these objects are not released automatically. Instead, the application has to use a special API in order to free such resources.
This guide provides a brief overview about how this API is used and what objects are relevant in this context.
Geometries
A geometry usually represents vertex information defined as a collection of attributes. *three.js* internally creates an object of type [link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer WebGLBuffer]
for each attribute. These entities are only deleted if you call [page:BufferGeometry.dispose](). If a geometry becomes obsolete in your application,
execute the method to free all related resources.
Materials
A material defines how objects are rendered. *three.js* uses the information of a material definition in order to construct a shader program for rendering.
Shader programs can only be deleted if the respective material is disposed. For performance reasons, *three.js* tries to reuse existing
shader programs if possible. So a shader program is only deleted if all related materials are disposed. You can indicate the disposal of a material by
executing [page:Material.dispose]().
Textures
The disposal of a material has no effect on textures. They are handled separately since a single texture can be used by multiple materials at the same time.
Whenever you create an instance of [page:Texture], three.js internally creates an instance of [link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLTexture WebGLTexture].
Similar to buffers, this object can only be deleted by calling [page:Texture.dispose]().
If you use an `ImageBitmap` as the texture's data source, you have to call [link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap/close ImageBitmap.close]() at the application level to dispose of all CPU-side resources.
An automated call of `ImageBitmap.close()` in [page:Texture.dispose]() is not possible, since the image bitmap becomes unusable, and the engine has no way of knowing if the image bitmap is used elsewhere.
Render Targets
Objects of type [page:WebGLRenderTarget] not only allocate an instance of [link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLTexture WebGLTexture] but also
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLFramebuffer WebGLFramebuffer]s and [link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderbuffer WebGLRenderbuffer]s
for realizing custom rendering destinations. These objects are only deallocated by executing [page:WebGLRenderTarget.dispose]().
Miscellaneous
There are other classes from the examples directory like controls or post processing passes which provide `dispose()` methods in order to remove internal event listeners
or render targets. In general, it's recommended to check the API or documentation of a class and watch for `dispose()`. If present, you should use it when cleaning things up.
FAQ
Why can't *three.js* dispose objects automatically?
This question was asked many times by the community so it's important to clarify this matter. Fact is that *three.js* does not know the lifetime or scope
of user-created entities like geometries or materials. This is the responsibility of the application. For example even if a material is currently not used for rendering,
it might be necessary for the next frame. So if the application decides that a certain object can be deleted, it has to	notify the engine via calling the respective
`dispose()` method.
Does removing a mesh from the scene also dispose its geometry and material?
No, you have to explicitly dispose the geometry and material via *dispose()*. Keep in mind that geometries and materials can be shared among 3D objects like meshes.
Does *three.js* provide information about the amount of cached objects?
Yes. It's possible to evaluate [page:WebGLRenderer.info], a special property of the renderer with a series of statistical information about the graphics board memory
and the rendering process. Among other things, it tells you how many textures, geometries and shader programs are internally stored. If you notice performance problems
in your application, it's a good idea to debug this property in order to easily identify a memory leak.
What happens when you call `dispose()` on a texture but the image is not loaded yet?
Internal resources for a texture are only allocated if the image has fully loaded. If you dispose a texture before the image was loaded,
nothing happens. No resources were allocated so there is also no need for clean up.
What happens when I call `dispose()` and then use the respective object at a later point?
That depends. For geometries, materials, textures, render targets and post processing passes the deleted internal resources can be created again by the engine.
So no runtime error will occur but you might notice a negative performance impact for the current frame, especially when shader programs have to be compiled.
Controls and renderers are an exception. Instances of these classes can not be used after `dispose()` has been called. You have to create new instances in this case.
How should I manage *three.js* objects in my app? When do I know how to dispose things?
In general, there is no definite recommendation for this. It highly depends on the specific use case when calling `dispose()` is appropriate. It's important to highlight that
it's not always necessary to dispose objects all the time. A good example for this is a game which consists of multiple levels. A good place for object disposal is when
switching the level. The app could traverse through the old scene and dispose all obsolete materials, geometries and textures. As mentioned in the previous section, it does not
produce a runtime error if you dispose an object that is actually still in use. The worst thing that can happen is performance drop for a single frame.
Examples that demonstrate the usage of dispose()
[example:webgl_test_memory WebGL / test / memory]
[example:webgl_test_memory2 WebGL / test / memory2]

[name]
The goal of this section is to give a brief introduction to three.js. We will start by setting up a scene, with a spinning cube. A working example is provided at the bottom of the page in case you get stuck and need help.
Before we start
If you haven't yet, go through the [link:#manual/introduction/Installation Installation] guide. We'll assume you've already set up the same project structure (including
index.html
and
main.js
), have installed three.js, and are either running a build tool, or using a local server with a CDN and import maps.
Creating the scene
To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.
main.js —
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
Let's take a moment to explain what's going on here. We have now set up the scene, our camera and the renderer.
There are a few different cameras in three.js. For now, let's use a `PerspectiveCamera`.
The first attribute is the `field of view`. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
The second one is the `aspect ratio`. You almost always want to use the width of the element divided by the height, or you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.
The next two attributes are the `near` and `far` clipping plane. What that means, is that objects further away from the camera than the value of `far` or closer than `near` won't be rendered. You don't have to worry about this now, but you may want to use other values in your apps to get better performance.
Next up is the renderer. In addition to creating the renderer instance, we also need to set the size at which we want it to render our app. It's a good idea to use the width and height of the area we want to fill with our app - in this case, the width and height of the browser window. For performance intensive apps, you can also give `setSize` smaller values, like `window.innerWidth/2` and `window.innerHeight/2`, which will make the app render at quarter size.
If you wish to keep the size of your app but render it at a lower resolution, you can do so by calling `setSize` with false as `updateStyle` (the third argument). For example, `setSize(window.innerWidth/2, window.innerHeight/2, false)` will render your app at half resolution, given that your <canvas> has 100% width and height.
Last but not least, we add the `renderer` element to our HTML document. This is a <canvas> element the renderer uses to display the scene to us.
"That's all good, but where's that cube you promised?"
Let's add it now.
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;
To create a cube, we need a `BoxGeometry`. This is an object that contains all the points (`vertices`) and fill (`faces`) of the cube. We'll explore this more in the future.
In addition to the geometry, we need a material to color it. Three.js comes with several materials, but we'll stick to the `MeshBasicMaterial` for now. All materials take an object of properties which will be applied to them. To keep things very simple, we only supply a color attribute of `0x00ff00`, which is green. This works the same way that colors work in CSS or Photoshop (`hex colors`).
The third thing we need is a `Mesh`. A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
By default, when we call `scene.add()`, the thing we add will be added to the coordinates `(0,0,0)`. This would cause both the camera and the cube to be inside each other. To avoid this, we simply move the camera out a bit.
Rendering the scene
If you copied the code from above into the HTML file we created earlier, you wouldn't be able to see anything. This is because we're not actually rendering anything yet. For that, we need what's called a `render or animate loop`.
function animate() {
requestAnimationFrame( animate );
renderer.render( scene, camera );
}
animate();
This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). If you're new to writing games in the browser, you might say
"why don't we just create a setInterval ?"
The thing is - we could, but `requestAnimationFrame` has a number of advantages. Perhaps the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.
Animating the cube
If you insert all the code above into the file you created before we began, you should see a green box. Let's make it all a little more interesting by rotating it.
Add the following code right above the `renderer.render` call in your `animate` function:
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
This will be run every frame (normally 60 times per second), and give the cube a nice rotation animation. Basically, anything you want to move or change while the app is running has to go through the animate loop. You can of course call other functions from there, so that you don't end up with an `animate` function that's hundreds of lines.
The result
Congratulations! You have now completed your first three.js application. It's simple, but you have to start somewhere.
The full code is available below and as an editable [link:https://jsfiddle.net/0c1oqf38/ live example]. Play around with it to get a better understanding of how it works.
index.html —
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>My first three.js app</title>
<style>
body { margin: 0; }
</style>
</head>
<body>
<script type="module" src="/main.js"></script>
</body>
</html>
main.js —
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;
function animate() {
requestAnimationFrame( animate );
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
renderer.render( scene, camera );
}
animate();

[name]
This class generates a Prefiltered, Mipmapped Radiance Environment Map
(PMREM) from a cubeMap environment texture. This allows different levels
of blur to be quickly accessed based on material roughness. Unlike a
traditional mipmap chain, it only goes down to the LOD_MIN level (above),
and then creates extra even more filtered 'mips' at the same LOD_MIN
resolution, associated with higher roughness levels. In this way we
maintain resolution to smoothly interpolate diffuse lighting while
limiting sampling computation.
Note: The minimum [page:MeshStandardMaterial]'s roughness depends on the
size of the provided texture. If your render has small dimensions or the
shiny parts have a lot of curvature, you may still be able to get away
with a smaller texture size.
texture size
minimum roughness
16
0.21
32
0.15
64
0.11
128
0.076
256
0.054
512
0.038
1024
0.027
Constructor
[name]( [param:WebGLRenderer renderer] )
This constructor creates a new [name].
Methods
[method:WebGLRenderTarget fromScene]( [param:Scene scene], [param:Number sigma], [param:Number near], [param:Number far] )
[page:Scene scene] - The given scene.
[page:Number sigma] - (optional) Specifies a blur radius in radians to be
applied to the scene before PMREM generation. Default is `0`.
[page:Number near] - (optional) The near plane value. Default is `0.1`.
[page:Number far] - (optional) The far plane value. Default is `100`.
Generates a PMREM from a supplied Scene, which can be faster than using an
image if networking bandwidth is low. Optional near and far planes ensure
the scene is rendered in its entirety (the cubeCamera is placed at the
origin).
[method:WebGLRenderTarget fromEquirectangular]( [param:Texture equirectangular] )
[page:Texture equirectangular] - The equirectangular texture.
Generates a PMREM from an equirectangular texture.
[method:WebGLRenderTarget fromCubemap]( [param:CubeTexture cubemap] )
[page:CubeTexture cubemap] - The cubemap texture.
Generates a PMREM from an cubemap texture.
[method:undefined compileCubemapShader]()
Pre-compiles the cubemap shader. You can get faster start-up by invoking
this method during your texture's network fetch for increased concurrency.
[method:undefined compileEquirectangularShader]()
Pre-compiles the equirectangular shader. You can get faster start-up by
invoking this method during your texture's network fetch for increased
concurrency.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
This can be used as a helper object to view a [page:BufferGeometry geometry] as a wireframe.
Code Example
const geometry = new THREE.SphereGeometry( 100, 100, 100 );
const wireframe = new THREE.WireframeGeometry( geometry );
const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
scene.add( line );
Examples
[example:webgl_helpers helpers]
Constructor
[name]( [param:BufferGeometry geometry] )
geometry — any geometry object.
Properties
See the base [page:BufferGeometry] class for common properties.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
Abstract base class for block based textures loader (dds, pvr, ...). This
uses the [page:FileLoader] internally for loading files.
Examples
See the
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/DDSLoader.js DDSLoader]
and [link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/PVRLoader.js PVRLoader]
for examples of derived classes.
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:CompressedTexture load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] (optional) — Will be called when load completes.
The argument will be the loaded texture.
[page:Function onProgress] (optional) — Will be called while load
progresses. The argument will be the ProgressEvent instance, which
contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and pass the loaded texture to onLoad. The method
also returns a new texture object which can directly be used for material
creation.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Listed here are externally developed compatible libraries and plugins for three.js. This
list and the associated packages are maintained by the community and not guaranteed
to be up to date. If you'd like to update this list make a PR!
Physics
[link:https://github.com/lo-th/Oimo.js/ Oimo.js]
[link:https://enable3d.io/ enable3d]
[link:https://github.com/kripken/ammo.js/ ammo.js]
[link:https://github.com/pmndrs/cannon-es cannon-es]
[link:https://rapier.rs/ rapier]
[link:https://github.com/jrouwe/JoltPhysics.js Jolt]
Postprocessing
In addition to the [link:https://github.com/mrdoob/three.js/tree/dev/examples/jsm/postprocessing official three.js postprocessing effects],
support for some additional effects and frameworks are available through external libraries.
[link:https://github.com/vanruesc/postprocessing postprocessing]
Intersection and Raycast Performance
[link:https://github.com/gkjohnson/three-mesh-bvh three-mesh-bvh]
Path Tracing
[link:https://github.com/gkjohnson/three-gpu-pathtracer three-gpu-pathtracer]
File Formats
In addition to the [link:https://github.com/mrdoob/three.js/tree/dev/examples/jsm/loaders official three.js loaders],
support for some additional formats is available through external libraries.
[link:https://github.com/gkjohnson/urdf-loaders/tree/master/javascript urdf-loader]
[link:https://github.com/NASA-AMMOS/3DTilesRendererJS 3d-tiles-renderer-js]
[link:https://github.com/kaisalmen/WWOBJLoader WebWorker OBJLoader]
[link:https://github.com/IFCjs/web-ifc-three IFC.js]
Geometry
[link:https://github.com/spite/THREE.MeshLine THREE.MeshLine]
3D Text and Layout
[link:https://github.com/protectwise/troika/tree/master/packages/troika-three-text troika-three-text]
[link:https://github.com/felixmariotto/three-mesh-ui three-mesh-ui]
Particle Systems
[link:https://github.com/Alchemist0823/three.quarks three.quarks]
[link:https://github.com/creativelifeform/three-nebula three-nebula]
Inverse Kinematics
[link:https://github.com/jsantell/THREE.IK THREE.IK]
[link:https://github.com/lo-th/fullik fullik]
[link:https://github.com/gkjohnson/closed-chain-ik-js closed-chain-ik]
Game AI
[link:https://mugen87.github.io/yuka/ yuka]
[link:https://github.com/donmccurdy/three-pathfinding three-pathfinding]
[link:https://github.com/isaac-mason/recast-navigation-js recast-navigation-js]
Wrappers and Frameworks
[link:https://aframe.io/ A-Frame]
[link:https://lume.io/ Lume] - HTML elements for 3D graphics built on Three.
[link:https://github.com/pmndrs/react-three-fiber react-three-fiber] - React components for 3D graphics built on Three.
[link:https://github.com/ecsyjs/ecsy-three ECSY]
[link:https://threlte.xyz/ Threlte] - Svelte components for 3D graphics built on Three.
[link:https://needle.tools/ Needle Engine]
[link:https://tresjs.org/ tresjs] - Vue components for 3D graphics built on Three.

[name]
JavaScript events for custom objects.
[link:https://github.com/mrdoob/eventdispatcher.js EventDispatcher on GitHub]
Code Example
// Adding events to a custom object
class Car extends EventDispatcher {
start() {
this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
}
};
// Using events with the custom object
const car = new Car();
car.addEventListener( 'start', function ( event ) {
alert( event.message );
} );
car.start();
Constructor
[name]()
Creates EventDispatcher object.
Methods
[method:undefined addEventListener]( [param:String type], [param:Function listener] )
type - The type of event to listen to.
listener - The function that gets called when the event is fired.
Adds a listener to an event type.
[method:Boolean hasEventListener]( [param:String type], [param:Function listener] )
type - The type of event to listen to.
listener - The function that gets called when the event is fired.
Checks if listener is added to an event type.
[method:undefined removeEventListener]( [param:String type], [param:Function listener] )
type - The type of the listener that gets removed.
listener - The listener function that gets removed.
Removes a listener from an event type.
[method:undefined dispatchEvent]( [param:Object event] )
event - The event that gets fired.
Fire an event type.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading a [page:BufferGeometry]. This uses the
[page:FileLoader] internally for loading files.
Code Example
// instantiate a loader
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
// resource URL
'models/json/pressure.json',
// onLoad callback
function ( geometry ) {
const material = new THREE.MeshLambertMaterial( { color: 0xF5F5F5 } );
const object = new THREE.Mesh( geometry, material );
scene.add( object );
},
// onProgress callback
function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
// onError callback
function ( err ) {
console.log( 'An error happened' );
}
);
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].d
[page:Function onLoad] — Will be called when load completes. The argument
will be the loaded [page:BufferGeometry].
[page:Function onProgress] (optional) — Will be called while load
progresses. The argument will be the ProgressEvent instance, which
contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and call onLoad with the parsed response content.
[method:BufferGeometry parse]( [param:Object json] )
[page:Object json] — The `JSON` structure to parse.
Parse a `JSON` structure and return a [page:BufferGeometry].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
This class represents an abstraction of the WebXR Device API and is
internally used by [page:WebGLRenderer]. [name] also provides a public
interface that allows users to enable/disable XR and perform XR related
tasks like for instance retrieving controllers.
Properties
[property:Boolean cameraAutoUpdate]
Whether the manager's XR camera should be automatically updated or not.
Default is `true`.
[property:Boolean enabled]
This flag notifies the renderer to be ready for XR rendering. Default is
`false`. Set it to `true` if you are going to use XR in your app.
[property:Boolean isPresenting]
Whether XR presentation is active or not. Default is `false`. This flag is
read-only and automatically set by [name].
Methods
[method:ArrayCamera getCamera]()
Returns an instance of [page:ArrayCamera] which represents the XR camera
of the active XR session. For each view it holds a separate camera object
in its [page:ArrayCamera.cameras cameras] property.
The camera's `fov` is currently not used and does not reflect the fov of
the XR camera. If you need the fov on app level, you have to compute in
manually from the XR camera's projection matrices.
[method:Group getController]( [param:Integer index] )
[page:Integer index] — The index of the controller.
Returns a [page:Group] representing the so called *target ray* space of
the XR controller. Use this space for visualizing 3D objects that support
the user in pointing tasks like UI interaction.
[method:Group getControllerGrip]( [param:Integer index] )
[page:Integer index] — The index of the controller.
Returns a [page:Group] representing the so called `grip` space of the XR
controller. Use this space if the user is going to hold other 3D objects
like a lightsaber.
Note: If you want to show something in the user's hand AND offer a
pointing ray at the same time, you'll want to attached the handheld object
to the group returned by [page:.getControllerGrip]() and the ray to the
group returned by [page:.getController](). The idea is to have two
different groups in two different coordinate spaces for the same WebXR
controller.
[method:Float getFoveation]()
Returns the amount of foveation used by the XR compositor for the
projection layer.
[method:Group getHand]( [param:Integer index] )
[page:Integer index] — The index of the controller.
Returns a [page:Group] representing the so called `hand` or `joint` space
of the XR controller. Use this space for visualizing the user's hands when
no physical controllers are used.
[method:String getReferenceSpace]()
Returns the reference space.
[method:XRSession getSession]()
Returns the `XRSession` object which allows a more fine-grained management
of active WebXR sessions on application level.
[method:undefined setFoveation]( [param:Float foveation] )
[page:Float foveation] — The foveation to set.
Specifies the amount of foveation used by the XR compositor for the layer.
Must be a value between `0` and `1`.
[method:undefined setFramebufferScaleFactor]( [param:Float framebufferScaleFactor] )
[page:Float framebufferScaleFactor] — The framebuffer scale factor to
set.
Specifies the scaling factor to use when determining the size of the
framebuffer when rendering to a XR device. The value is relative to the
default XR device display resolution. Default is `1`. A value of `0.5`
would specify a framebuffer with 50% of the display's native resolution.
Note: It is not possible to change the framebuffer scale factor while
presenting XR content.
[method:undefined setReferenceSpace]( [param:XRReferenceSpace referenceSpace] )
[page:XRReferenceSpace referenceSpace] — A custom reference space.
Can be used to configure a custom reference space which overwrites the
default reference space.
[method:undefined setReferenceSpaceType]( [param:String referenceSpaceType] )
[page:String referenceSpaceType] — The reference space type to set.
Can be used to configure a spatial relationship with the user's physical
environment. Depending on how the user moves in 3D space, setting an
appropriate reference space can improve tracking. Default is
`local-floor`. Please check out the
[link:https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpaceType MDN]
for possible values and their use cases.
[method:undefined updateCamera]( [param:PerspectiveCamera camera] )
Updates the state of the XR camera. Use this method on app level if you
set [page:.cameraAutoUpdate] to `false`. The method requires the non-XR
camera of the scene as a parameter. The passed in camera's transformation
is automatically adjusted to the position of the XR camera when calling
this method.
Note: It is not possible to change the reference space type while
presenting XR content.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
3D models are available in hundreds of file formats, each with different
purposes, assorted features, and varying complexity. Although
three.js provides many loaders
, choosing the right format and
workflow will save time and frustration later on. Some formats are
difficult to work with, inefficient for realtime experiences, or simply not
fully supported at this time.
This guide provides a workflow recommended for most users, and suggestions
for what to try if things don't go as expected.
Before we start
If you're new to running a local server, begin with
[link:#manual/introduction/Installation installation]
first. Many common errors viewing 3D models can be avoided by hosting files
correctly.
Recommended workflow
Where possible, we recommend using glTF (GL Transmission Format). Both
.GLB
and
.GLTF
versions of the format are
well supported. Because glTF is focused on runtime asset delivery, it is
compact to transmit and fast to load. Features include meshes, materials,
textures, skins, skeletons, morph targets, animations, lights, and
cameras.
Public-domain glTF files are available on sites like
Sketchfab
, or various tools include glTF export:
Blender
by the Blender Foundation
Substance Painter
by Allegorithmic
Modo
by Foundry
Toolbag
by Marmoset
Houdini
by SideFX
Cinema 4D
by MAXON
COLLADA2GLTF
by the Khronos Group
FBX2GLTF
by Facebook
OBJ2GLTF
by Analytical Graphics Inc
…and
many more
If your preferred tools do not support glTF, consider requesting glTF
export from the authors, or posting on
the glTF roadmap thread
.
When glTF is not an option, popular formats such as FBX, OBJ, or COLLADA
are also available and regularly maintained.
Loading
Only a few loaders (e.g. [page:ObjectLoader]) are included by default with
three.js — others should be added to your app individually.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
Once you've imported a loader, you're ready to add a model to your scene. Syntax varies among
different loaders — when using another format, check the examples and documentation for that
loader. For glTF, usage with global scripts would be:
const loader = new GLTFLoader();
loader.load( 'path/to/model.glb', function ( gltf ) {
scene.add( gltf.scene );
}, undefined, function ( error ) {
console.error( error );
} );
See [page:GLTFLoader GLTFLoader documentation] for further details.
Troubleshooting
You've spent hours modeling an artisanal masterpiece, you load it into
the webpage, and — oh no! 😭 It's distorted, miscolored, or missing entirely.
Start with these troubleshooting steps:
Check the JavaScript console for errors, and make sure you've used an
`onError` callback when calling `.load()` to log the result.
View the model in another application. For glTF, drag-and-drop viewers
are available for
three.js
and
babylon.js
. If the model
appears correctly in one or more applications,
file a bug against three.js
.
If the model cannot be shown in any application, we strongly encourage
filing a bug with the application used to create the model.
Try scaling the model up or down by a factor of 1000. Many models are
scaled differently, and large models may not appear if the camera is
inside the model.
Try to add and position a light source. The model may be hidden in the dark.
Look for failed texture requests in the network tab, like
`"C:\\Path\To\Model\texture.jpg"`. Use paths relative to your
model instead, such as `images/texture.jpg` — this may require
editing the model file in a text editor.
Asking for help
If you've gone through the troubleshooting process above and your model
still isn't working, the right approach to asking for help will get you to
a solution faster. Post a question on the
three.js forum
and, whenever possible,
include your model (or a simpler model with the same problem) in any formats
you have available. Include enough information for someone else to reproduce
the issue quickly — ideally, a live demo.

[page:Curve] →
[name]
Create a smooth 3d spline curve from a series of points using the
[link:https://en.wikipedia.org/wiki/Centripetal_Catmull-Rom_spline Catmull-Rom] algorithm.
Code Example
//Create a closed wavey loop
const curve = new THREE.CatmullRomCurve3( [
new THREE.Vector3( -10, 0, 10 ),
new THREE.Vector3( -5, 5, 5 ),
new THREE.Vector3( 0, 0, 0 ),
new THREE.Vector3( 5, -5, 5 ),
new THREE.Vector3( 10, 0, 10 )
] );
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
Examples
[example:webgl_geometry_extrude_splines WebGL / geometry / extrude / splines]
Constructor
[name]( [param:Array points], [param:Boolean closed], [param:String curveType], [param:Float tension] )
points – An array of [page:Vector3] points
closed – Whether the curve is closed. Default is `false`.
curveType – Type of the curve. Default is `centripetal`.
tension – Tension of the curve. Default is `0.5`.
Properties
See the base [page:Curve] class for common properties.
[property:Array points]
The array of [page:Vector3] points that define the curve. It needs at
least two entries.
[property:Boolean closed]
The curve will loop back onto itself when this is true.
[property:String curveType]
Possible values are `centripetal`, `chordal` and `catmullrom`.
[property:Float tension]
When [page:.curveType] is `catmullrom`, defines catmullrom's tension.
Methods
See the base [page:Curve] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Camera] →
[name]
Camera that uses
[link:https://en.wikipedia.org/wiki/Orthographic_projection orthographic projection].
In this projection mode, an object's size in the rendered image stays
constant regardless of its distance from the camera.
This can be useful for rendering 2D scenes and UI elements, amongst other
things.
Code Example
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
scene.add( camera );
Examples
[example:webgl_camera camera ]
[example:webgl_interactive_cubes_ortho interactive / cubes / ortho ]
[example:webgl_materials_cubemap_dynamic materials / cubemap / dynamic]
[example:webgl_postprocessing_advanced postprocessing / advanced ]
[example:webgl_postprocessing_dof2 postprocessing / dof2 ]
[example:webgl_postprocessing_godrays postprocessing / godrays ]
[example:webgl_rtt rtt ]
[example:webgl_shadowmap shadowmap ]
Constructor
[name]( [param:Number left], [param:Number right], [param:Number top], [param:Number bottom], [param:Number near], [param:Number far] )
left — Camera frustum left plane.
right — Camera frustum right plane.
top — Camera frustum top plane.
bottom — Camera frustum bottom plane.
near — Camera frustum near plane.
far — Camera frustum far plane.
Together these define the camera's
[link:https://en.wikipedia.org/wiki/Viewing_frustum viewing frustum].
Properties
See the base [page:Camera] class for common properties.
Note that after making changes to most of these properties you will have
to call [page:OrthographicCamera.updateProjectionMatrix .updateProjectionMatrix] for the changes to take effect.
[property:Float bottom]
Camera frustum bottom plane.
[property:Float far]
Camera frustum far plane. Default is `2000`.
Must be greater than the current value of [page:.near near] plane.
[property:Boolean isOrthographicCamera]
Read-only flag to check if a given object is of type [name].
[property:Float left]
Camera frustum left plane.
[property:Float near]
Camera frustum near plane. Default is `0.1`.
The valid range is between `0` and the current value of the [page:.far far] plane. Note that, unlike for the [page:PerspectiveCamera], `0` is a
valid value for an OrthographicCamera's near plane.
[property:Float right]
Camera frustum right plane.
[property:Float top]
Camera frustum top plane.
[property:Object view]
Set by [page:OrthographicCamera.setViewOffset setViewOffset]. Default is
`null`.
[property:number zoom]
Gets or sets the zoom factor of the camera. Default is `1`.
Methods
See the base [page:Camera] class for common methods.
[method:undefined setViewOffset]( [param:Float fullWidth], [param:Float fullHeight], [param:Float x], [param:Float y], [param:Float width], [param:Float height] )
fullWidth — full width of multiview setup
fullHeight — full height of multiview setup
x — horizontal offset of subcamera
y — vertical offset of subcamera
width — width of subcamera
height — height of subcamera
Sets an offset in a larger
[link:https://en.wikipedia.org/wiki/Viewing_frustum viewing frustum]. This
is useful for multi-window or multi-monitor/multi-machine setups. For an
example on how to use it see [page:PerspectiveCamera.setViewOffset PerspectiveCamera].
[method:undefined clearViewOffset]()
Removes any offset set by the .setViewOffset method.
[method:undefined updateProjectionMatrix]()
Updates the camera projection matrix. Must be called after any change of
parameters.
[method:Object toJSON]([param:Object meta])
meta -- object containing metadata such as textures or images in objects'
descendants.
Convert the camera to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
This class can be used to transform objects in 3D space by adapting a similar interaction model of DCC tools like Blender.
Unlike other controls, it is not intended to transform the scene's camera.
[name] expects that its attached 3D object is part of the scene graph.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { TransformControls } from 'three/addons/controls/TransformControls.js';
Examples
[example:misc_controls_transform misc / controls / transform ]
Constructor
[name]( [param:Camera camera], [param:HTMLDOMElement domElement] )
[page:Camera camera]: The camera of the rendered scene.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Creates a new instance of [name].
Events
change
Fires if any type of change (object or property change) is performed. Property changes
are separate events you can add event listeners to. The event type is "propertyname-changed".
mouseDown
Fires if a pointer (mouse/touch) becomes active.
mouseUp
Fires if a pointer (mouse/touch) is no longer active.
objectChange
Fires if the controlled 3D object is changed.
Properties
See the base [page:Object3D] class for common properties.
[property:String axis]
The current transformation axis.
[property:Camera camera]
The camera of the rendered scene.
[property:HTMLDOMElement domElement]
The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will
not set up new event listeners.
[property:Boolean dragging]
Whether or not dragging is currently performed. Read-only property.
[property:Boolean enabled]
Whether or not the controls are enabled.
[property:String mode]
The current transformation mode. Possible values are "translate", "rotate" and "scale". Default is `translate`.
[property:Object3D object]
The 3D object being controlled.
[property:Number rotationSnap]
By default, 3D objects are continuously rotated. If you set this property to a numeric value (radians), you can define in which
steps the 3D object should be rotated. Default is `null`.
[property:Boolean showX]
Whether or not the x-axis helper should be visible. Default is `true`.
[property:Boolean showY]
Whether or not the y-axis helper should be visible. Default is `true`.
[property:Boolean showZ]
Whether or not the z-axis helper should be visible. Default is `true`.
[property:Number size]
The size of the helper UI (axes/planes). Default is *1*.
[property:String space]
Defines in which coordinate space transformations should be performed. Possible values are "world" and "local". Default is `world`.
[property:Number translationSnap]
By default, 3D objects are continuously translated. If you set this property to a numeric value (world units), you can define in which
steps the 3D object should be translated. Default is `null`.
Methods
See the base [page:Object3D] class for common methods.
[method:TransformControls attach] ( [param:Object3D object] )
[page:Object3D object]: The 3D object that should be transformed.
Sets the 3D object that should be transformed and ensures the controls UI is visible.
[method:TransformControls detach] ()
Removes the current 3D object from the controls and makes the helper UI invisible.
[method:undefined dispose] ()
Should be called if the controls is no longer required.
[method:Raycaster getRaycaster] ()
Returns the [page:Raycaster] object that is used for user interaction. This object is shared between all instances of
TransformControls. If you set the [page:Object3D.layers .layers] property of the [name], you will also want to
set the [page:Raycaster.layers .layers] property on the [page:Raycaster] with a matching value, or else the [name]
won't work as expected.
[method:String getMode] ()
Returns the transformation mode.
[method:undefined reset] ()
Resets the object's position, rotation and scale to when the current transform began.
[method:undefined setMode] ( [param:String mode] )
[page:String mode]: The transformation mode.
Sets the transformation mode.
[method:undefined setRotationSnap] ( [param:Number rotationSnap] )
[page:Number rotationSnap]: The rotation snap.
Sets the rotation snap.
[method:undefined setScaleSnap] ( [param:Number scaleSnap] )
[page:Number scaleSnap]: The scale snap.
Sets the scale snap.
[method:undefined setSize] ( [param:Number size] )
[page:Number size]: The size of the helper UI.
Sets the size of the helper UI.
[method:undefined setSpace] ( [param:String space] )
[page:String space]: The coordinate space in which transformations are applied.
Sets the coordinate space in which transformations are applied.
[method:undefined setTranslationSnap] ( [param:Number translationSnap] )
[page:Number translationSnap]: The translation snap.
Sets the translation snap.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/TransformControls.js examples/jsm/controls/TransformControls.js]

[page:BufferGeometry] → [page:CylinderGeometry] →
[name]
A class for generating cone geometries.
Code Example
const geometry = new THREE.ConeGeometry( 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh(geometry, material ); scene.add( cone );
Constructor
[name]([param:Float radius], [param:Float height], [param:Integer radialSegments], [param:Integer heightSegments], [param:Boolean openEnded], [param:Float thetaStart], [param:Float thetaLength])
radius — Radius of the cone base. Default is `1`.
height — Height of the cone. Default is `1`.
radialSegments — Number of segmented faces around the circumference of the
cone. Default is `32`
heightSegments — Number of rows of faces along the height of the cone.
Default is `1`.
openEnded — A Boolean indicating whether the base of the cone is open or
capped. Default is false, meaning capped.
thetaStart — Start angle for first segment, default = 0 (three o'clock
position).
thetaLength — The central angle, often called theta, of the circular
sector. The default is `2`*Pi, which makes for a complete cone.
Properties
See the base [page:CylinderGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:CylinderGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
[name] is a simple shape of Euclidean geometry. It is constructed from a
number of triangular segments that are oriented around a central point and
extend as far out as a given radius. It is built counter-clockwise from a
start angle and a given central angle. It can also be used to create
regular polygons, where the number of segments determines the number of
sides.
Code Example
const geometry = new THREE.CircleGeometry( 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const circle = new THREE.Mesh( geometry, material ); scene.add( circle );
Constructor
[name]([param:Float radius], [param:Integer segments], [param:Float thetaStart], [param:Float thetaLength])
radius — Radius of the circle, default = 1.
segments — Number of segments (triangles), minimum = `3`, default = `32`.
thetaStart — Start angle for first segment, default = `0` (three o'clock
position).
thetaLength — The central angle, often called theta, of the circular
sector. The default is `2`*Pi, which makes for a complete circle.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
Creates a torus knot, the particular shape of which is defined by a pair
of coprime integers, p and q. If p and q are not coprime, the result will
be a torus link.
Code Example
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torusKnot = new THREE.Mesh( geometry, material ); scene.add( torusKnot );
Constructor
[name]([param:Float radius], [param:Float tube], [param:Integer tubularSegments], [param:Integer radialSegments], [param:Integer p],
[param:Integer q])
radius - Radius of the torus. Default is `1`.
tube — Radius of the tube. Default is `0.4`.
tubularSegments — Default is `64`.
radialSegments — Default is `8`.
p — This value determines, how many times the geometry winds around its
axis of rotational symmetry. Default is `2`.
q — This value determines, how many times the geometry winds around a
circle in the interior of the torus. Default is `3`.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading an [page:Image] as an
[link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap ImageBitmap]. An ImageBitmap provides an asynchronous and resource
efficient pathway to prepare textures for rendering in WebGL.
Unlike [page:FileLoader], [name] does not avoid multiple concurrent
requests to the same URL.
Note that [page:Texture.flipY] and [page:Texture.premultiplyAlpha] with
[link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap ImageBitmap] are ignored.
[link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap ImageBitmap]
needs these configuration on bitmap creation unlike regular
images need them on uploading to GPU. You need to set the equivalent
options via [page:ImageBitmapLoader.setOptions] instead. Refer to
[link:https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.10 WebGL specification] for the detail.
Code Example
// instantiate a loader
const loader = new THREE.ImageBitmapLoader();
// set options if needed
loader.setOptions( { imageOrientation: 'flipY' } );
// load a image resource
loader.load(
// resource URL
'textures/skyboxsun25degtest.png',
// onLoad callback
function ( imageBitmap ) {
const texture = new THREE.CanvasTexture( imageBitmap );
const material = new THREE.MeshBasicMaterial( { map: texture } );
},
// onProgress callback currently not supported
undefined,
// onError callback
function ( err ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_imagebitmap WebGL / loader / ImageBitmap]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
[property:Boolean isImageBitmapLoader]
Read-only flag to check if a given object is of type [name].
[property:String options]
An optional object that sets options for the internally used
[link:https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap createImageBitmap]
factory method. Default is `undefined`.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] — Will be called when load completes. The argument
will be the loaded [page:Image image].
[page:Function onProgress] (optional) — This callback function is
currently not supported.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and return the [page:ImageBitmap image] object that
will contain the data.
[method:this setOptions]( [param:Object options] )
Sets the options object for
[link:https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap createImageBitmap].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Use an array of [page:Bone bones] to create a skeleton that can be used by
a [page:SkinnedMesh].
Code Example
// Create a simple "arm"
const bones = [];
const shoulder = new THREE.Bone();
const elbow = new THREE.Bone();
const hand = new THREE.Bone();
shoulder.add( elbow );
elbow.add( hand );
bones.push( shoulder );
bones.push( elbow );
bones.push( hand );
shoulder.position.y = -5;
elbow.position.y = 0;
hand.position.y = 5;
const armSkeleton = new THREE.Skeleton( bones );
See the [page:SkinnedMesh] page for an example of usage with standard
[page:BufferGeometry].
Constructor
[name]( [param:Array bones], [param:Array boneInverses] )
[page:Array bones] - The array of [page:Bone bones]. Default is an empty
array.
[page:Array boneInverses] - (optional) An array of [page:Matrix4 Matrix4s].
Creates a new [name].
Properties
[property:Array bones]
The array of [page:bone bones]. Note this is a copy of the original array,
not a reference, so you can modify the original array without effecting
this one.
[property:Array boneInverses]
An array of [page:Matrix4 Matrix4s] that represent the inverse of the
[page:Matrix4 matrixWorld] of the individual bones.
[property:Float32Array boneMatrices]
The array buffer holding the bone data when using a vertex texture.
[property:DataTexture boneTexture]
The [page:DataTexture] holding the bone data when using a vertex texture.
Methods
[method:Skeleton clone]()
Returns a clone of this Skeleton object.
[method:undefined calculateInverses]()
Generates the [page:.boneInverses boneInverses] array if not provided in
the constructor.
[method:this computeBoneTexture]()
Computes an instance of [page:DataTexture] in order to pass the bone data
more efficiently to the shader. The texture is assigned to
[page:.boneTexture boneTexture].
[method:undefined pose]()
Returns the skeleton to the base pose.
[method:undefined update]()
Updates the [page:Float32Array boneMatrices] and [page:DataTexture boneTexture]
after changing the bones. This is called automatically by the
[page:WebGLRenderer] if the skeleton is used with a [page:SkinnedMesh].
[method:Bone getBoneByName]( [param:String name] )
name -- String to match to the Bone's .name property.
Searches through the skeleton's bone array and returns the first with a
matching name.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Utility class for creating instances of [page:LightProbe].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js';
Examples
[example:webgl_lightprobe WebGL / light probe ]
[example:webgl_lightprobe_cubecamera WebGL / light probe / cube camera ]
Static Methods
[method:LightProbe fromCubeTexture] ( [param:CubeTexture cubeTexture] )
Creates a light probe from the given (radiance) environment map. The method expects that the environment map is represented as a cube texture.
[method:LightProbe fromCubeRenderTarget] ( [param:WebGLRenderer renderer], [param:WebGLCubeRenderTarget cubeRenderTarget] )
Creates a light probe from the given (radiance) environment map. The method expects that the environment map is represented as a cube render target.
The [page:Texture.format format] of the cube render target must be set to `RGBA`.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/lights/LightProbeGenerator.js examples/jsm/lights/LightProbeGenerator.js]

[page:Loader] →
[name]
A loader for Rhinoceros 3d files and objects.
Rhinoceros is a 3D modeler used to create, edit, analyze, document, render, animate, and translate NURBS curves, surfaces, breps, extrusions, point clouds, as well as polygon meshes and SubD objects.
[link:https://github.com/mcneel/rhino3dm rhino3dm.js] is compiled to WebAssembly from the open source geometry library [link:https://github.com/mcneel/opennurbs openNURBS].
The loader currently uses [link:https://www.npmjs.com/package/rhino3dm/v/8.4.0 rhino3dm.js 8.4.0.]
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';
Supported Conversions
The [name] converts Rhino objects to the following three.js types:
3dm type
three.js type
Point
[page:Points Points]
PointSet / PointCloud
[page:Points Points]
TextDot
[page:Sprite Sprite]
Curve
[page:Line Line]
1
Mesh
[page:Mesh Mesh]
Extrusion
[page:Mesh Mesh]
2
BREP
[page:Mesh Mesh]
2
SubD
[page:Mesh Mesh]
3
InstanceReferences
[page:Object3D Object3D]
DirectionalLight
[page:DirectionalLight DirectionalLight]
PointLight
[page:PointLight PointLight]
RectangularLight
[page:RectAreaLight RectAreaLight]
SpotLight
[page:SpotLight SpotLight]
File3dm
[page:Object3D Object3D]
4
Material / Physically Based Material
[page:MeshPhysicalMaterial MeshPhysicalMaterial]
Notes:
1
NURBS curves are discretized to a hardcoded resolution.
2
Types which are based on BREPs and NURBS surfaces are represented with their "Render Mesh". Render meshes might not be associated with these objects if they have not been displayed in an appropriate display mode in Rhino (i.e. "Shaded", "Rendered", etc), or are created programmatically, for example, via Grasshopper or directly with the rhino3dm library. As of rhino3dm.js@8.0.0-beta2, BrepFace and Extrusions can be assigned a mesh representation, but these must be generated by the user.
3
SubD objects are represented by subdividing their control net.
4
Whether a Rhino Document (File3dm) is loaded or parsed, the returned object is an [page:Object3D Object3D] with all Rhino objects (File3dmObject) as children. File3dm layers and other file level properties are added to the resulting object's userData.
5
All resulting three.js objects have useful properties from the Rhino object (i.e. layer index, name, etc.) populated in their userData object.
6
Rhino and Three.js have a different coordinate system. Upon import, you should rotate the resulting [page:Object3D Object3D] by -90º in x or set the THREE.Object3D.DEFAULT_UP at the beginning of your application:
THREE.Object3D.DEFAULT_UP.set( 0, 0, 1 );
Keep in mind that this will affect the orientation of all of the Object3Ds in your application.
Examples
[example:webgl_loader_3dm]
Constructor
Rhino3dmLoader( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new Rhino3dmLoader.
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:Object3D load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.3dm` file.
[page:Function onLoad] — A function to be called after the loading is successfully completed.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading from url and call the `onLoad` function with the resulting Object3d.
// Instantiate a loader
const loader = new Rhino3dmLoader();
// Specify path to a folder containing WASM/JS libraries or a CDN.
// For example, /jsm/libs/rhino3dm/ is the location of the library inside the three.js repository
// loader.setLibraryPath( '/path_to_library/rhino3dm/' );
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0/' );
// Load a 3DM file
loader.load(
// resource URL
'model.3dm',
// called when the resource is loaded
function ( object ) {
scene.add( object );
},
// called as loading progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
[method:Object3D parse]( [param:ArrayBuffer buffer], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:ArrayBuffer buffer] — An ArrayBuffer representing the Rhino `File3dm` document.
[page:Function onLoad] — A function to be called after the loading is successfully completed.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Parse a File3dm ArrayBuffer and call the `onLoad` function with the resulting Object3d.
See [link:https://github.com/mcneel/rhino-developer-samples/tree/8/rhino3dm/js/SampleParse3dmObjects this example] for further reference.
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0'
// Instantiate a loader
const loader = new Rhino3dmLoader();
// Specify path to a folder containing WASM/JS libraries or a CDN.
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0' );
const rhino = await rhino3dm();
console.log('Loaded rhino3dm.');
// create Rhino Document and add a point to it
const doc = new rhino.File3dm();
const ptA = [0, 0, 0];
const point = new rhino.Point( ptA );
doc.objects().add( point, null );
// create a copy of the doc.toByteArray data to get an ArrayBuffer
const buffer = new Uint8Array( doc.toByteArray() ).buffer;
loader.parse( buffer, function ( object ) {
scene.add( object );
} );
[method:this setLibraryPath]( [param:String value] )
[page:String value] — Path to folder containing the JS and WASM libraries.
// Instantiate a loader
const loader = new Rhino3dmLoader();
// Specify path to a folder containing the WASM/JS library:
loader.setLibraryPath( '/path_to_library/rhino3dm/' );
// or from a CDN:
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0' );
[method:this setWorkerLimit]( [param:Number workerLimit] )
[page:Number workerLimit] - Maximum number of workers to be allocated. Default is 4.
Sets the maximum number of [link:https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers Web Workers]
to be used during decoding. A lower limit may be preferable if workers are also for other tasks
in the application.
[method:this dispose]()
Disposes of the loader resources and deallocates memory.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/3DMLoader.js examples/jsm/loaders/3DMLoader.js]

[page:Object3D] → [page:Light] →
[name]
A light that gets emitted from a single point in all directions. A common
use case for this is to replicate the light emitted from a bare
lightbulb.
This light can cast shadows - see [page:PointLightShadow] page for
details.
Code Example
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );
Examples
[example:webgl_lights_pointlights lights / pointlights ]
[example:webgl_effects_anaglyph effects / anaglyph ]
[example:webgl_geometry_text geometry / text ]
[example:webgl_lensflares lensflares ]
Constructor
[name]( [param:Integer color], [param:Float intensity], [param:Number distance], [param:Float decay] )
[page:Integer color] - (optional) hexadecimal color of the light. Default
is 0xffffff (white).
[page:Float intensity] - (optional) numeric value of the light's
strength/intensity. Default is `1`.
[page:Number distance] - Maximum range of the light. Default is `0` (no
limit).
[page:Float decay] - The amount the light dims along the distance of the
light. Default is `2`.
Creates a new [name].
Properties
See the base [page:Light Light] class for common properties.
[property:Boolean castShadow]
If set to `true` light will cast dynamic shadows. *Warning*: This is
expensive and requires tweaking to get shadows looking right. See the
[page:PointLightShadow] for details. The default is `false`.
[property:Float decay]
The amount the light dims along the distance of the light. Default is
`2`.
In context of physically-correct rendering the default value should not be
changed.
[property:Float distance]
When distance is zero, light will attenuate according to inverse-square
law to infinite distance. When distance is non-zero, light will attenuate
according to inverse-square law until near the distance cutoff, where it
will then attenuate quickly and smoothly to 0. Inherently, cutoffs are not
physically correct.
Default is `0.0`.
[property:Float intensity]
The light's luminous intensity measured in candela (cd). Default is `1`.
Changing the intensity will also change the light's power.
[property:Float power]
The light's power.
Power is the luminous power of the light measured in lumens (lm).
Changing the power will also change the light's intensity.
[property:PointLightShadow shadow]
A [page:PointLightShadow] used to calculate shadows for this light.
The lightShadow's [page:LightShadow.camera camera] is set to a
[page:PerspectiveCamera] with [page:PerspectiveCamera.fov fov] of `90`,
[page:PerspectiveCamera.aspect aspect] of `1`, [page:PerspectiveCamera.near near]
clipping plane at `0.5` and [page:PerspectiveCamera.far far] clipping
plane at `500`.
Methods
See the base [page:Light Light] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:this copy]( [param:PointLight source] )
Copies value of all the properties from the [page:PointLight source] to
this PointLight.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A
[link:https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html render target]
is a buffer where the video card draws pixels for a scene
that is being rendered in the background. It is used in different effects,
such as applying postprocessing to a rendered image before displaying it
on the screen.
Constructor
[name]([param:Number width], [param:Number height], [param:Object options])
[page:Float width] - The width of the renderTarget. Default is `1`.
[page:Float height] - The height of the renderTarget. Default is `1`.
options - optional object that holds texture parameters for an
auto-generated target texture and depthBuffer/stencilBuffer booleans. For
an explanation of the texture parameters see [page:Texture Texture]. The
following are valid options:
[page:Constant wrapS] - default is [page:Textures ClampToEdgeWrapping].
[page:Constant wrapT] - default is [page:Textures ClampToEdgeWrapping].
[page:Constant magFilter] - default is [page:Textures LinearFilter].
[page:Constant minFilter] - default is [page:Textures LinearFilter].
[page:Boolean generateMipmaps] - default is `false`.
[page:Constant format] - default is [page:Textures RGBAFormat].
[page:Constant type] - default is [page:Textures UnsignedByteType].
[page:Number anisotropy] - default is `1`. See
[page:Texture.anisotropy]
[page:Constant colorSpace] - default is [page:Textures NoColorSpace].
[page:Boolean depthBuffer] - default is `true`.
[page:Boolean stencilBuffer] - default is `false`.
[page:Number samples] - default is `0`.
[page:Number count] - default is `1`.
Creates a new [name]
Properties
[property:Boolean isWebGLRenderTarget]
Read-only flag to check if a given object is of type [name].
[property:number width]
The width of the render target.
[property:number height]
The height of the render target.
[property:Vector4 scissor]
A rectangular area inside the render target's viewport. Fragments that are
outside the area will be discarded.
[property:Boolean scissorTest]
Indicates whether the scissor test is active or not.
[property:Vector4 viewport]
The viewport of this render target.
[property:Texture texture]
This texture instance holds the rendered pixels. Use it as input for
further processing.
[property:Texture textures]
An array holding the [page:WebGLRenderTarget.texture texture] references
of multiple render targets configured with the [page:Number count] option.
[property:Boolean depthBuffer]
Renders to the depth buffer. Default is true.
[property:Boolean stencilBuffer]
Renders to the stencil buffer. Default is false.
[property:DepthTexture depthTexture]
If set, the scene depth will be rendered to this texture. Default is null.
[property:Number samples]
Defines the count of MSAA samples. Default is `0`.
Methods
[method:undefined setSize]( [param:Number width], [param:Number height] )
Sets the size of the render target.
[method:WebGLRenderTarget clone]()
Creates a copy of this render target.
[method:this copy]( [param:WebGLRenderTarget source] )
Adopts the settings of the given render target.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[page:EventDispatcher EventDispatcher] methods are available on this
class.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Three.js uses `matrices` to encode 3D transformations---translations (position), rotations, and scaling. Every instance of [page:Object3D] has a [page:Object3D.matrix matrix] which stores that object's position, rotation, and scale. This page describes how to update an object's transformation.
Convenience properties and `matrixAutoUpdate`
There are two ways to update an object's transformation:
Modify the object's `position`, `quaternion`, and `scale` properties, and let three.js recompute
the object's matrix from these properties:
object.position.copy( start_position );
object.quaternion.copy( quaternion );
By default, the `matrixAutoUpdate` property is set true, and the matrix will be automatically recalculated.
If the object is static, or you wish to manually control when recalculation occurs, better performance can be obtained by setting the property false:
object.matrixAutoUpdate = false;
And after changing any properties, manually update the matrix:
object.updateMatrix();
Modify the object's matrix directly. The [page:Matrix4] class has various methods for modifying the matrix:
object.matrix.setRotationFromQuaternion( quaternion );
object.matrix.setPosition( start_position );
object.matrixAutoUpdate = false;
Note that `matrixAutoUpdate`
must
be set to `false` in this case, and you should make sure
not
to call `updateMatrix`. Calling `updateMatrix` will clobber the manual changes made to the matrix, recalculating the matrix from `position`, `scale`, and so on.
Object and world matrices
An object's [page:Object3D.matrix matrix] stores the object's transformation
relative
to the object's [page:Object3D.parent parent]; to get the object's transformation in
world
coordinates, you must access the object's [page:Object3D.matrixWorld].
When either the parent or the child object's transformation changes, you can request that the child object's [page:Object3D.matrixWorld matrixWorld] be updated by calling [page:Object3D.updateMatrixWorld updateMatrixWorld]().
An object can be transformed via [page:Object3D.applyMatrix4]. Note: Under-the-hood, this method relies on [page:Matrix4.decompose], and not all matrices are decomposable in this way. For example, if an object has a non-uniformly scaled parent, then the object's world matrix may not be decomposable, and this method may not be appropriate.
Rotation and Quaternion
Three.js provides two ways of representing 3D rotations: [page:Euler Euler angles] and [page:Quaternion Quaternions], as well as methods for converting between the two. Euler angles are subject to a problem called "gimbal lock," where certain configurations can lose a degree of freedom (preventing the object from being rotated about one axis). For this reason, object rotations are
always
stored in the object's [page:Object3D.quaternion quaternion].
Previous versions of the library included a `useQuaternion` property which, when set to false, would cause the object's [page:Object3D.matrix matrix] to be calculated from an Euler angle. This practice is deprecated---instead, you should use the [page:Object3D.setRotationFromEuler setRotationFromEuler] method, which will update the quaternion.

[name]
This class stores data for an attribute (such as vertex positions, face
indices, normals, colors, UVs, and any custom attributes ) associated with
a [page:BufferGeometry], which allows for more efficient passing of data
to the GPU. See that page for details and a usage example. When working
with vector-like data, the
.fromBufferAttribute( attribute, index )
helper methods on [page:Vector2.fromBufferAttribute Vector2],
[page:Vector3.fromBufferAttribute Vector3],
[page:Vector4.fromBufferAttribute Vector4], and
[page:Color.fromBufferAttribute Color] classes may be helpful.
Constructor
[name]( [param:TypedArray array], [param:Integer itemSize], [param:Boolean normalized] )
[page:TypedArray array] -- Must be a
[link:https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray TypedArray]. Used to instantiate the buffer.
This array should have
itemSize * numVertices
elements, where numVertices is the number of vertices in the associated
[page:BufferGemetry BufferGeometry].
[page:Integer itemSize] -- the number of values of the array that should
be associated with a particular vertex. For instance, if this attribute is
storing a 3-component vector (such as a position, normal, or color), then
itemSize should be 3.
[page:Boolean normalized] -- (optional) Applies to integer data only.
Indicates how the underlying data in the buffer maps to the values in the
GLSL code. For instance, if [page:TypedArray array] is an instance of
UInt16Array, and [page:Boolean normalized] is true, the values `0 -
+65535` in the array data will be mapped to 0.0f - +1.0f in the GLSL
attribute. An Int16Array (signed) would map from -32768 - +32767 to -1.0f
- +1.0f. If [page:Boolean normalized] is false, the values will be
converted to floats unmodified, i.e. 32767 becomes 32767.0f.
Properties
[property:TypedArray array]
The [page:TypedArray array] holding data stored in the buffer.
[property:Integer count]
Represents the number of items this buffer attribute stores. It is internally computed by dividing the [page:BufferAttribute.array array]'s length by the
[page:BufferAttribute.itemSize itemSize]. Read-only property.
[property:Number gpuType]
Configures the bound GPU type for use in shaders. Either [page:BufferAttribute THREE.FloatType] or [page:BufferAttribute THREE.IntType], default is [page:BufferAttribute THREE.FloatType].
Note: this only has an effect for integer arrays and is not configurable for float arrays. For lower precision float types, see [page:BufferAttributeTypes THREE.Float16BufferAttribute].
[property:Boolean isBufferAttribute]
Read-only flag to check if a given object is of type [name].
[property:Integer itemSize]
The length of vectors that are being stored in the
[page:BufferAttribute.array array].
[property:String name]
Optional name for this attribute instance. Default is an empty string.
[property:Boolean needsUpdate]
Flag to indicate that this attribute has changed and should be re-sent to
the GPU. Set this to true when you modify the value of the array.
Setting this to true also increments the [page:BufferAttribute.version version].
[property:Boolean normalized]
Indicates how the underlying data in the buffer maps to the values in the
GLSL shader code. See the constructor above for details.
[property:Function onUploadCallback]
A callback function that is executed after the Renderer has transferred
the attribute array data to the GPU.
[property:Object updateRanges]
Array of objects containing:
[page:Integer start]: Position at which to start
update.
[page:Integer count]: The number of components to update.
This can be used to only update some components of stored vectors (for
example, just the component related to color). Use the [page:BufferAttribute.addUpdateRange addUpdateRange]
function to add ranges to this array.
[property:Usage usage]
Defines the intended usage pattern of the data store for optimization
purposes. Corresponds to the `usage` parameter of
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData WebGLRenderingContext.bufferData](). Default is [page:BufferAttributeUsage StaticDrawUsage]. See usage [page:BufferAttributeUsage constants] for all
possible values.
Note: After the initial use of a buffer, its usage cannot be changed.
Instead, instantiate a new one and set the desired usage before the next
render.
[property:Integer version]
A version number, incremented every time the
[page:BufferAttribute.needsUpdate needsUpdate] property is set to true.
Methods
[method:this applyMatrix3]( [param:Matrix3 m] )
Applies matrix [page:Matrix3 m] to every Vector3 element of this
BufferAttribute.
[method:this applyMatrix4]( [param:Matrix4 m] )
Applies matrix [page:Matrix4 m] to every Vector3 element of this
BufferAttribute.
[method:this applyNormalMatrix]( [param:Matrix3 m] )
Applies normal matrix [page:Matrix3 m] to every Vector3 element of this
BufferAttribute.
[method:this transformDirection]( [param:Matrix4 m] )
Applies matrix [page:Matrix4 m] to every Vector3 element of this
BufferAttribute, interpreting the elements as a direction vectors.
[method:this addUpdateRange]( [param:Integer start], [param:Integer count] )
Adds a range of data in the data array to be updated on the GPU. Adds an
object describing the range to the [page:BufferAttribute.updateRanges updateRanges]
array.
[method:this clearUpdateRanges]()
Clears the [page:BufferAttribute.updateRanges updateRanges] array.
[method:BufferAttribute clone]()
Return a copy of this bufferAttribute.
[method:this copy]( [param:BufferAttribute bufferAttribute] )
Copies another BufferAttribute to this BufferAttribute.
[method:this copyArray]( array )
Copy the array given here (which can be a normal array or TypedArray) into
[page:BufferAttribute.array array].
See
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set TypedArray.set] for notes on requirements if copying a TypedArray.
[method:this copyAt] ( [param:Integer index1], [param:BufferAttribute bufferAttribute], [param:Integer index2] )
Copy a vector from bufferAttribute[index2] to [page:BufferAttribute.array array][index1].
[method:Number getComponent]( [param:Integer index], [param:Integer component] )
Returns the given component of the vector at the given index.
[method:Number getX]( [param:Integer index] )
Returns the x component of the vector at the given index.
[method:Number getY]( [param:Integer index] )
Returns the y component of the vector at the given index.
[method:Number getZ]( [param:Integer index] )
Returns the z component of the vector at the given index.
[method:Number getW]( [param:Integer index] )
Returns the w component of the vector at the given index.
[method:this onUpload]( [param:Function callback] )
Sets the value of the onUploadCallback property.
In the [example:webgl_buffergeometry WebGL / Buffergeometry] this is used
to free memory after the buffer has been transferred to the GPU.
[method:this set] ( [param:Array value], [param:Integer offset] )
value -- an [page:Array] or [page:TypedArray] from which to copy values.
offset -- (optional) index of the [page:BufferAttribute.array array] at
which to start copying.
Calls
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set TypedArray.set]( [page:Array value], [page:Integer offset] ) on the
[page:BufferAttribute.array array].
In particular, see that page for requirements on [page:Array value] being
a [page:TypedArray].
[method:this setUsage] ( [param:Usage value] )
Set [page:BufferAttribute.usage usage] to value. See usage
[page:BufferAttributeUsage constants] for all possible input values.
Note: After the initial use of a buffer, its usage cannot be changed.
Instead, instantiate a new one and set the desired usage before the next
render.
[method:Number setComponent]( [param:Integer index], [param:Integer component], [param:Float value] )
Sets the given component of the vector at the given index.
[method:this setX]( [param:Integer index], [param:Float x] )
Sets the x component of the vector at the given index.
[method:this setY]( [param:Integer index], [param:Float y] )
Sets the y component of the vector at the given index.
[method:this setZ]( [param:Integer index], [param:Float z] )
Sets the z component of the vector at the given index.
[method:this setW]( [param:Integer index], [param:Float w] )
Sets the w component of the vector at the given index.
[method:this setXY]( [param:Integer index], [param:Float x], [param:Float y] )
Sets the x and y components of the vector at the given index.
[method:this setXYZ]( [param:Integer index], [param:Float x], [param:Float y], [param:Float z] )
Sets the x, y and z components of the vector at the given index.
[method:this setXYZW]( [param:Integer index], [param:Float x], [param:Float y], [param:Float z], [param:Float w] )
Sets the x, y, z and w components of the vector at the given index.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
This class contains the parameters that define exponential squared fog,
which gives a clear view near the camera and a faster than exponentially
densening fog farther from the camera.
Code Example
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
Constructor
[name]( [param:Integer color], [param:Float density] )
The color parameter is passed to the [page:Color] constructor to set the
color property. Color can be a hexadecimal integer or a CSS-style string.
Properties
[property:Boolean isFogExp2]
Read-only flag to check if a given object is of type [name].
[property:String name]
Optional name of the object (doesn't need to be unique). Default is an
empty string.
[property:Color color]
Fog color. Example: If set to black, far away objects will be rendered
black.
[property:Float density]
Defines how fast the fog will grow dense.
Default is `0.00025`.
Methods
[method:FogExp2 clone]()
Returns a new FogExp2 instance with the same parameters as this one.
[method:Object toJSON]()
Return FogExp2 data in JSON format.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Texture] →
[name]
Creates an array of textures directly from raw data, width and height and
depth.
Constructor
[name]( data, width, height, depth )
The data argument must be an
[link:https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView ArrayBufferView].
The properties inherited from [page:Texture] are the
default, except magFilter and minFilter default to THREE.NearestFilter.
The properties flipY and generateMipmaps are initially set to false.
The interpretation of the data depends on type and format: If the type is
THREE.UnsignedByteType, a Uint8Array will be useful for addressing the
texel data. If the format is THREE.RGBAFormat, data needs four values for
one texel; Red, Green, Blue and Alpha (typically the opacity).
For the packed types, THREE.UnsignedShort4444Type and
THREE.UnsignedShort5551Type all color components of one texel can be
addressed as bitfields within an integer element of a Uint16Array.
In order to use the types THREE.FloatType and THREE.HalfFloatType, the
WebGL implementation must support the respective extensions
OES_texture_float and OES_texture_half_float. In order to use
THREE.LinearFilter for component-wise, bilinear interpolation of the
texels based on these types, the WebGL extensions OES_texture_float_linear
or OES_texture_half_float_linear must also be present.
Code Example
This creates a [name] where each texture has a different color.
// create a buffer with color data
const width = 512;
const height = 512;
const depth = 100;
const size = width * height;
const data = new Uint8Array( 4 * size * depth );
for ( let i = 0; i < depth; i ++ ) {
const color = new THREE.Color( Math.random(), Math.random(), Math.random() );
const r = Math.floor( color.r * 255 );
const g = Math.floor( color.g * 255 );
const b = Math.floor( color.b * 255 );
for ( let j = 0; j < size; j ++ ) {
const stride = ( i * size + j ) * 4;
data[ stride ] = r;
data[ stride + 1 ] = g;
data[ stride + 2 ] = b;
data[ stride + 3 ] = 255;
}
}
// used the buffer to create a [name]
const texture = new THREE.DataArrayTexture( data, width, height, depth );
texture.needsUpdate = true;
Examples
[example:webgl2_materials_texture2darray WebGL2 / materials / texture2darray]
[example:webgl2_rendertarget_texture2darray WebGL2 / rendertarget / texture2darray]
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean flipY]
Whether the texture is flipped along the Y axis when uploaded to the GPU.
Default is `false`.
[property:Boolean generateMipmaps]
Whether to generate mipmaps (if possible) for the texture. Default is
`false`.
[property:Object image]
Overridden with a object holding data, width, height, and depth.
[property:Boolean isDataArrayTexture]
Read-only flag to check if a given object is of type [name].
[property:number magFilter]
How the texture is sampled when a texel covers more than one pixel. The
default is [page:Textures THREE.NearestFilter], which uses the value of
the closest texel.
See the [page:Textures texture constants] page for details.
[property:number minFilter]
How the texture is sampled when a texel covers less than one pixel. The
default is [page:Textures THREE.NearestFilter], which uses the value of
the closest texel.
See the [page:Textures texture constants] page for details.
[property:number unpackAlignment]
`1` by default. Specifies the alignment requirements for the start of each
pixel row in memory. The allowable values are 1 (byte-alignment), 2 (rows
aligned to even-numbered bytes), 4 (word-alignment), and 8 (rows start on
double-word boundaries). See
[link:https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glPixelStorei.xhtml glPixelStorei] for more information.
[property:number wrapR]
This defines how the texture is wrapped in the depth direction.
The default is [page:Textures THREE.ClampToEdgeWrapping], where the edge
is clamped to the outer edge texels. The other two choices are
[page:Textures THREE.RepeatWrapping] and [page:Textures THREE.MirroredRepeatWrapping].
See the [page:Textures texture constants]
page for details.
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A class containing utility functions for [page:BufferGeometry BufferGeometry] instances.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
Methods
[method:Object computeMikkTSpaceTangents]( [param:BufferGeometry geometry], [param:Object MikkTSpace], [param:Boolean negateSign] = true )
geometry -- Instance of [page:BufferGeometry].
MikkTSpace -- Instance of
examples/jsm/libs/mikktspace.module.js
, or
mikktspace
npm package. Await
MikkTSpace.ready
before use.
negateSign -- Whether to negate the sign component (.w) of each tangent. Required for normal map conventions in some formats, including glTF.
Computes vertex tangents using the [link:http://www.mikktspace.com/ MikkTSpace] algorithm.
MikkTSpace generates the same tangents consistently, and is used in most modelling tools and
normal map bakers. Use MikkTSpace for materials with normal maps, because inconsistent
tangents may lead to subtle visual issues in the normal map, particularly around mirrored
UV seams.
In comparison to this method, [page:BufferGeometry.computeTangents] (a
custom algorithm) generates tangents that probably will not match the tangents
in other software. The custom algorithm is sufficient for general use with a
[page:ShaderMaterial], and may be faster than MikkTSpace.
Returns the original [page:BufferGeometry]. Indexed geometries will be de-indexed.
Requires position, normal, and uv attributes.
[method:Object computeMorphedAttributes]( [param:Mesh | Line | Points object] )
object -- Instance of [page:Mesh Mesh] | [page:Line Line] | [page:Points Points].
Returns the current attributes (Position and Normal) of a morphed/skinned [page:Object3D Object3D] whose geometry is a
[page:BufferGeometry BufferGeometry], together with the original ones: An Object with 4 properties:
`positionAttribute`, `normalAttribute`, `morphedPositionAttribute` and `morphedNormalAttribute`.
Helpful for Raytracing or Decals (i.e. a [page:DecalGeometry DecalGeometry] applied to a morphed Object
with a [page:BufferGeometry BufferGeometry] will use the original BufferGeometry, not the morphed/skinned one,
generating an incorrect result.
Using this function to create a shadow Object3D the DecalGeometry can be correctly generated).
[method:Number estimateBytesUsed]( [param:BufferGeometry geometry] )
geometry -- Instance of [page:BufferGeometry BufferGeometry] to estimate the memory use of.
Returns the amount of bytes used by all attributes to represent the geometry.
[method:InterleavedBufferAttribute interleaveAttributes]( [param:Array attributes] )
attributes -- Array of [page:BufferAttribute BufferAttribute] instances.
Interleaves a set of attributes and returns a new array of corresponding attributes that share
a single InterleavedBuffer instance. All attributes must have compatible types. If merge does not
succeed, the method returns null.
[method:BufferAttribute mergeAttributes]( [param:Array attributes] )
attributes -- Array of [page:BufferAttribute BufferAttribute] instances.
Merges a set of attributes into a single instance. All attributes must have compatible properties
and types, and [page:InterleavedBufferAttribute InterleavedBufferAttributes] are not supported. If merge does not succeed, the method
returns null.
[method:BufferGeometry mergeGeometries]( [param:Array geometries], [param:Boolean useGroups] )
geometries -- Array of [page:BufferGeometry BufferGeometry] instances.
useGroups -- Whether groups should be generated for the merged geometry or not.
Merges a set of geometries into a single instance. All geometries must have compatible attributes.
If merge does not succeed, the method returns null.
[method:BufferGeometry mergeGroups]( [param:BufferGeometry geometry] )
geometry -- Instance of [page:BufferGeometry BufferGeometry] to merge the groups of.
Merges the [page:BufferGeometry.groups groups] for the given geometry.
[method:BufferGeometry mergeVertices]( [param:BufferGeometry geometry], [param:Number tolerance] )
geometry -- Instance of [page:BufferGeometry BufferGeometry] to merge the vertices of.
tolerance -- The maximum allowable difference between vertex attributes to merge. Defaults to 1e-4.
Returns a new [page:BufferGeometry BufferGeometry] with vertices for which all similar vertex attributes
(within tolerance) are merged.
[method:BufferGeometry toCreasedNormals]( [param:BufferGeometry geometry], [param:Number creaseAngle] )
geometry -- The input geometry.
creaseAngle -- The crease angle in radians.
Modifies the supplied geometry if it is non-indexed, otherwise creates a new,
non-indexed geometry.
Returns the geometry with smooth normals everywhere except faces
that meet at an angle greater than the crease angle.
[method:BufferGeometry toTrianglesDrawMode]( [param:BufferGeometry geometry], [param:TrianglesDrawMode drawMode] )
geometry -- Instance of [page:BufferGeometry BufferGeometry].
drawMode -- The draw mode of the given geometry. Valid inputs are `THREE.TriangleStripDrawMode` and `THREE.TriangleFanDrawMode`.
Returns a new indexed geometry based on `THREE.TrianglesDrawMode` draw mode. This mode corresponds to the `gl.TRIANGLES` WebGL primitive.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/BufferGeometryUtils.js examples/jsm/utils/BufferGeometryUtils.js]

[name]
A ray that emits from an origin in a certain direction. This is used by
the [page:Raycaster] to assist with
[link:https://en.wikipedia.org/wiki/Ray_casting raycasting]. Raycasting is
used for mouse picking (working out what objects in the 3D space the mouse
is over) amongst other things.
Constructor
[name]( [param:Vector3 origin], [param:Vector3 direction] )
[page:Vector3 origin] - (optional) the origin of the [page:Ray]. Default
is a [page:Vector3] at (0, 0, 0).
[page:Vector3 direction] - [page:Vector3] The direction of the [page:Ray].
This must be normalized (with [page:Vector3.normalize]) for the methods to
operate properly. Default is a [page:Vector3] at (0, 0, -1).
Creates a new [name].
Properties
[property:Vector3 origin]
The origin of the [page:Ray]. Default is a [page:Vector3] at `(0, 0, 0)`.
[property:Vector3 direction]
The direction of the [page:Ray]. This must be normalized (with
[page:Vector3.normalize]) for the methods to operate properly. Default is
a [page:Vector3] at (0, 0, -1).
Methods
[method:this applyMatrix4]( [param:Matrix4 matrix4] )
[page:Matrix4 matrix4] - the [page:Matrix4] to apply to this
[page:Ray].
Transform this [page:Ray] by the [page:Matrix4].
[method:Vector3 at]( [param:Float t], [param:Vector3 target] )
[page:Float t] - the distance along the [page:Ray] to retrieve a position
for.
[page:Vector3 target] — the result will be copied into this Vector3.
Get a [page:Vector3] that is a given distance along this [page:Ray].
[method:Ray clone]()
Creates a new Ray with identical [page:.origin origin] and
[page:.direction direction] to this one.
[method:Vector3 closestPointToPoint]( [param:Vector3 point], [param:Vector3 target] )
[page:Vector3 point] - the point to get the closest approach to.
[page:Vector3 target] — the result will be copied into this Vector3.
Get the point along this [page:Ray] that is closest to the [page:Vector3]
provided.
[method:this copy]( [param:Ray ray] )
Copies the [page:.origin origin] and [page:.direction direction]
properties of [page:Ray ray] into this ray.
[method:Float distanceSqToPoint]( [param:Vector3 point] )
[page:Vector3 point] - the [page:Vector3] to compute a distance to.
Get the squared distance of the closest approach between the [page:Ray]
and the [page:Vector3].
[method:Float distanceSqToSegment]( [param:Vector3 v0], [param:Vector3 v1],
[param:Vector3 optionalPointOnRay], [param:Vector3 optionalPointOnSegment] )
[page:Vector3 v0] - the start of the line segment.
[page:Vector3 v1] - the end of the line segment.
optionalPointOnRay - (optional) if this is provided, it receives the point
on this [page:Ray] that is closest to the segment.
optionalPointOnSegment - (optional) if this is provided, it receives the
point on the line segment that is closest to this [page:Ray].
Get the squared distance between this [page:Ray] and a line segment.
[method:Float distanceToPlane]( [param:Plane plane] )
[page:Plane plane] - the [page:Plane] to get the distance to.
Get the distance from [page:.origin origin] to the [page:Plane], or `null`
if the [page:Ray] doesn't intersect the [page:Plane].
[method:Float distanceToPoint]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] The [page:Vector3] to compute a
distance to.
Get the distance of the closest approach between the [page:Ray] and the
[page:Vector3 point].
[method:Boolean equals]( [param:Ray ray] )
[page:Ray ray] - the [page:Ray] to compare to.
Returns true if this and the other [page:Ray ray] have equal [page:.origin origin]
and [page:.direction direction].
[method:Vector3 intersectBox]( [param:Box3 box], [param:Vector3 target] )
[page:Box3 box] - the [page:Box3] to intersect with.
[page:Vector3 target] — the result will be copied into this Vector3.
Intersect this [page:Ray] with a [page:Box3], returning the intersection
point or `null` if there is no intersection.
[method:Vector3 intersectPlane]( [param:Plane plane], [param:Vector3 target] )
[page:Plane plane] - the [page:Plane] to intersect with.
[page:Vector3 target] — the result will be copied into this Vector3.
Intersect this [page:Ray] with a [page:Plane], returning the intersection
point or `null` if there is no intersection.
[method:Vector3 intersectSphere]( [param:Sphere sphere], [param:Vector3 target] )
[page:Sphere sphere] - the [page:Sphere] to intersect with.
[page:Vector3 target] — the result will be copied into this Vector3.
Intersect this [page:Ray] with a [page:Sphere], returning the intersection
point or `null` if there is no intersection.
[method:Vector3 intersectTriangle]( [param:Vector3 a], [param:Vector3 b], [param:Vector3 c], [param:Boolean backfaceCulling], [param:Vector3 target] )
[page:Vector3 a], [page:Vector3 b], [page:Vector3 c] - The [page:Vector3]
points making up the triangle.
[page:Boolean backfaceCulling] - whether to use backface culling.
[page:Vector3 target] — the result will be copied into this Vector3.
Intersect this [page:Ray] with a triangle, returning the intersection
point or `null` if there is no intersection.
[method:Boolean intersectsBox]( [param:Box3 box] )
[page:Box3 box] - the [page:Box3] to intersect with.
Return true if this [page:Ray] intersects with the [page:Box3].
[method:Boolean intersectsPlane]( [param:Plane plane] )
[page:Plane plane] - the [page:Plane] to intersect with.
Return true if this [page:Ray] intersects with the [page:Plane].
[method:Boolean intersectsSphere]( [param:Sphere sphere] )
[page:Sphere sphere] - the [page:Sphere] to intersect with.
Return true if this [page:Ray] intersects with the [page:Sphere].
[method:this lookAt]( [param:Vector3 v] )
[page:Vector3 v] - The [page:Vector3] to look at.
Adjusts the direction of the ray to point at the vector in world
coordinates.
[method:this recast]( [param:Float t] )
[page:Float t] - The distance along the [page:Ray] to interpolate.
Shift the origin of this [page:Ray] along its direction by the distance
given.
[method:this set]( [param:Vector3 origin], [param:Vector3 direction] )
[page:Vector3 origin] - the [page:.origin origin] of the [page:Ray].
[page:Vector3 direction] - the [page:.direction direction] of the
[page:Ray]. This must be normalized (with [page:Vector3.normalize]) for
the methods to operate properly.
Sets this ray's [page:.origin origin] and [page:.direction direction]
properties by copying the values from the given objects.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Class representing a 4D [link:https://en.wikipedia.org/wiki/Vector_space vector].
A 4D vector is an ordered quadruplet of numbers (labeled x, y, z,
and w), which can be used to represent a number of things, such as:
A point in 4D space.
A direction and length in 4D space. In three.js the length will always
be the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean distance]
(straight-line distance) from `(0, 0, 0, 0)` to `(x, y, z, w)`
and the direction is also measured from `(0, 0, 0, 0)` towards `(x, y,
z, w)`.
Any arbitrary ordered quadruplet of numbers.
There are other things a 4D vector can be used to represent, however these
are the most common uses in *three.js*.
Iterating through a [name] instance will yield its components `(x, y, z,
w)` in the corresponding order.
Code Example
const a = new THREE.Vector4( 0, 1, 0, 0 );
//no arguments; will be initialised to (0, 0, 0, 1)
const b = new THREE.Vector4( );
const d = a.dot( b );
Constructor
[name]( [param:Float x], [param:Float y], [param:Float z], [param:Float w] )
[page:Float x] - the x value of this vector. Default is `0`.
[page:Float y] - the y value of this vector. Default is `0`.
[page:Float z] - the z value of this vector. Default is `0`.
[page:Float w] - the w value of this vector. Default is `1`.
Creates a new [name].
Properties
[property:Boolean isVector4]
Read-only flag to check if a given object is of type [name].
[property:Float x]
[property:Float y]
[property:Float z]
[property:Float w]
[property:Float width]
Alias for [page:.z z].
[property:Float height]
Alias for [page:.w w].
Methods
[method:this add]( [param:Vector4 v] )
Adds [page:Vector4 v] to this vector.
[method:this addScalar]( [param:Float s] )
Adds the scalar value s to this vector's [page:.x x], [page:.y y],
[page:.z z] and [page:.w w] values.
[method:this addScaledVector]( [param:Vector4 v], [param:Float s] )
Adds the multiple of [page:Vector4 v] and [page:Float s] to this vector.
[method:this addVectors]( [param:Vector4 a], [param:Vector4 b] )
Sets this vector to [page:Vector4 a] + [page:Vector4 b].
[method:this applyMatrix4]( [param:Matrix4 m] )
Multiplies this vector by 4 x 4 [page:Matrix4 m].
[method:this ceil]()
The [page:.x x], [page:.y y], [page:.z z] and [page:.w w] components of
this vector are rounded up to the nearest integer value.
[method:this clamp]( [param:Vector4 min], [param:Vector4 max] )
[page:Vector4 min] - the minimum [page:.x x], [page:.y y], [page:.z z] and
[page:.w w] values.
[page:Vector4 max] - the maximum [page:.x x], [page:.y y], [page:.z z] and
[page:.w w] values in the desired range
If this vector's x, y, z or w value is greater than the max vector's x, y,
z or w value, it is replaced by the corresponding value.
If this vector's x, y, z or w value is less than the min vector's x, y, z
or w value, it is replaced by the corresponding value.
[method:this clampLength]( [param:Float min], [param:Float max] )
[page:Float min] - the minimum value the length will be clamped to
[page:Float max] - the maximum value the length will be clamped to
If this vector's length is greater than the max value, it is replaced by
the max value.
If this vector's length is less than the min value, it is replaced by the
min value.
[method:this clampScalar]( [param:Float min], [param:Float max] )
[page:Float min] - the minimum value the components will be clamped to
[page:Float max] - the maximum value the components will be clamped to
If this vector's x, y, z or w values are greater than the max value, they
are replaced by the max value.
If this vector's x, y, z or w values are less than the min value, they are
replaced by the min value.
[method:Vector4 clone]()
Returns a new Vector4 with the same [page:.x x], [page:.y y], [page:.z z]
and [page:.w w] values as this one.
[method:this copy]( [param:Vector4 v] )
Copies the values of the passed Vector4's [page:.x x], [page:.y y],
[page:.z z] and [page:.w w] properties to this Vector4.
[method:this divideScalar]( [param:Float s] )
Divides this vector by scalar [page:Float s].
[method:Float dot]( [param:Vector4 v] )
Calculates the [link:https://en.wikipedia.org/wiki/Dot_product dot product]
of this vector and [page:Vector4 v].
[method:Boolean equals]( [param:Vector4 v] )
Returns `true` if the components of this vector and [page:Vector4 v] are
strictly equal; `false` otherwise.
[method:this floor]()
The components of this vector are rounded down to the nearest integer
value.
[method:this fromArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - the source array.
[page:Integer offset] - (optional) offset into the array. Default is `0`.
Sets this vector's [page:.x x] value to be `array[ offset + 0 ]`, [page:.y y]
value to be `array[ offset + 1 ]` [page:.z z] value to be `array[ offset + 2 ]`
and [page:.w w ] value to be `array[ offset + 3 ]`.
[method:this fromBufferAttribute]( [param:BufferAttribute attribute], [param:Integer index] )
[page:BufferAttribute attribute] - the source attribute.
[page:Integer index] - index in the attribute.
Sets this vector's [page:.x x], [page:.y y], [page:.z z] and [page:.w w]
values from the [page:BufferAttribute attribute].
[method:Float getComponent]( [param:Integer index] )
[page:Integer index] - `0`, `1`, `2` or `3`.
If index equals `0` returns the [page:.x x] value.
If index equals `1` returns the [page:.y y] value.
If index equals `2` returns the [page:.z z] value.
If index equals `3` returns the [page:.w w] value.
[method:Float length]()
Computes the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) from `(0, 0, 0, 0)` to `(x, y, z, w)`.
[method:Float manhattanLength]()
Computes the [link:http://en.wikipedia.org/wiki/Taxicab_geometry Manhattan length] of this vector.
[method:Float lengthSq]()
Computes the square of the
[link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) from `(0, 0, 0, 0)` to `(x, y, z, w)`. If you are
comparing the lengths of vectors, you should compare the length squared
instead as it is slightly more efficient to calculate.
[method:this lerp]( [param:Vector4 v], [param:Float alpha] )
[page:Vector4 v] - [page:Vector4] to interpolate towards.
[page:Float alpha] - interpolation factor, typically in the closed
interval `[0, 1]`.
Linearly interpolates between this vector and [page:Vector4 v], where
alpha is the percent distance along the line - `alpha = 0` will be this
vector, and `alpha = 1` will be [page:Vector4 v].
[method:this lerpVectors]( [param:Vector4 v1], [param:Vector4 v2], [param:Float alpha] )
[page:Vector4 v1] - the starting [page:Vector4].
[page:Vector4 v2] - [page:Vector4] to interpolate towards.
[page:Float alpha] - interpolation factor, typically in the closed
interval `[0, 1]`.
Sets this vector to be the vector linearly interpolated between
[page:Vector4 v1] and [page:Vector4 v2] where alpha is the percent
distance along the line connecting the two vectors - alpha = 0 will be
[page:Vector4 v1], and alpha = 1 will be [page:Vector4 v2].
[method:this negate]()
Inverts this vector - i.e. sets x = -x, y = -y, z = -z and w = -w.
[method:this normalize]()
Converts this vector to a [link:https://en.wikipedia.org/wiki/Unit_vector unit vector]
- that is, sets it equal to a vector with the same direction
as this one, but [page:.length length] 1.
[method:this max]( [param:Vector4 v] )
If this vector's x, y, z or w value is less than [page:Vector4 v]'s x, y,
z or w value, replace that value with the corresponding max value.
[method:this min]( [param:Vector4 v] )
If this vector's x, y, z or w value is greater than [page:Vector4 v]'s x,
y, z or w value, replace that value with the corresponding min value.
[method:this multiply]( [param:Vector4 v] )
Multiplies this vector by [page:Vector4 v].
[method:this multiplyScalar]( [param:Float s] )
Multiplies this vector by scalar [page:Float s].
[method:this round]()
The components of this vector are rounded to the nearest integer value.
[method:this roundToZero]()
The components of this vector are rounded towards zero (up if negative,
down if positive) to an integer value.
[method:this set]( [param:Float x], [param:Float y], [param:Float z], [param:Float w] )
Sets the [page:.x x], [page:.y y], [page:.z z] and [page:.w w] components
of this vector.
[method:this setAxisAngleFromQuaternion]( [param:Quaternion q] )
[page:Quaternion q] - a normalized [page:Quaternion]
Sets the [page:.x x], [page:.y y] and [page:.z z] components of this
vector to the quaternion's axis and [page:.w w] to the angle.
[method:this setAxisAngleFromRotationMatrix]( [param:Matrix4 m] )
[page:Matrix4 m] - a [page:Matrix4] of which the upper left 3x3 matrix is
a pure rotation matrix.
Sets the [page:.x x], [page:.y y] and [page:.z z] to the axis of rotation
and [page:.w w] to the angle.
[method:this setComponent]( [param:Integer index], [param:Float value] )
[page:Integer index] - `0`, `1`, `2` or `3`.
[page:Float value] - [page:Float]
If index equals `0` set [page:.x x] to [page:Float value].
If index equals `1` set [page:.y y] to [page:Float value].
If index equals `2` set [page:.z z] to [page:Float value].
If index equals `3` set [page:.w w] to [page:Float value].
[method:this setLength]( [param:Float l] )
Sets this vector to a vector with the same direction as this one, but
[page:.length length] [page:Float l].
[method:this setScalar]( [param:Float scalar] )
Sets the [page:.x x], [page:.y y], [page:.z z] and [page:.w w] values of
this vector both equal to [page:Float scalar].
[method:this setX]( [param:Float x] )
Replaces this vector's [page:.x x] value with [page:Float x].
[method:this setY]( [param:Float y] )
Replaces this vector's [page:.y y] value with [page:Float y].
[method:this setZ]( [param:Float z] )
Replaces this vector's [page:.z z] value with [page:Float z].
[method:this setW]( [param:Float w] )
Replaces this vector's [page:.w w] value with [page:Float w].
[method:this sub]( [param:Vector4 v] )
Subtracts [page:Vector4 v] from this vector.
[method:this subScalar]( [param:Float s] )
Subtracts [page:Float s] from this vector's [page:.x x], [page:.y y],
[page:.z z] and [page:.w w] components.
[method:this subVectors]( [param:Vector4 a], [param:Vector4 b] )
Sets this vector to [page:Vector4 a] - [page:Vector4 b].
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - (optional) array to store this vector to. If this is
not provided, a new array will be created.
[page:Integer offset] - (optional) optional offset into the array.
Returns an array [x, y, z, w], or copies x, y, z and w into the provided
[page:Array array].
[method:this random]()
Sets each component of this vector to a pseudo-random value between `0` and
`1`, excluding `1`.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Represents a third-order spherical harmonics (SH). Light probes use this
class to encode lighting information.
Constructor
[name]()
Creates a new instance of [name].
Properties
[property:Array coefficients]
An array holding the (9) SH coefficients. A single coefficient is
represented as an instance of [page:Vector3].
[property:Boolean isSphericalHarmonics3]
Read-only flag to check if a given object is of type [name].
Methods
[method:this add]( [param:SphericalHarmonics3 sh] )
[page:SphericalHarmonics3 sh] - The SH to add.
Adds the given SH to this instance.
[method:this addScaledSH]( [param:SphericalHarmonics3 sh], [param:Number scale] )
[page:SphericalHarmonics3 sh] - The SH to add.
[page:Number scale] - The scale factor.
A convenience method for performing [page:.add]() and [page:.scale]() at
once.
[method:SphericalHarmonics3 clone]()
Returns a new instance of [name] with equal coefficients.
[method:this copy]( [param:SphericalHarmonics3 sh] )
[page:SphericalHarmonics3 sh] - The SH to copy.
Copies the given SH to this instance.
[method:Boolean equals]( [param:SphericalHarmonics3 sh] )
[page:SphericalHarmonics3 sh] - The SH to compare with.
Returns true if the given SH and this instance have equal coefficients.
[method:this fromArray]( [param:Array array], [param:Number offset] )
[page:Array array] - The array holding the numbers of the SH
coefficients.
[page:Number offset] - (optional) The array offset.
Sets the coefficients of this instance from the given array.
[method:Vector3 getAt]( [param:Vector3 normal], [param:Vector3 target] )
[page:Vector3 normal] - The normal vector (assumed to be unit length).
[page:Vector3 target] - The result vector.
Returns the radiance in the direction of the given normal.
[method:Vector3 getIrradianceAt]( [param:Vector3 normal], [param:Vector3 target] )
[page:Vector3 normal] - The normal vector (assumed to be unit length).
[page:Vector3 target] - The result vector.
Returns the irradiance (radiance convolved with cosine lobe) in the
direction of the given normal.
[method:this lerp]( [param:SphericalHarmonics3 sh], [param:Number alpha] )
[page:SphericalHarmonics3 sh] - The SH to interpolate with.
[page:Number alpha] - The alpha factor.
Linear interpolates between the given SH and this instance by the given
alpha factor.
[method:this scale]( [param:Number scale] )
[page:Number scale] - The scale factor.
Scales this SH by the given scale factor.
[method:this set]( [param:Array coefficients] )
[page:Array coefficients] - An array of SH coefficients.
Sets the given SH coefficients to this instance.
[method:Array toArray]( [param:Array array], [param:Number offset] )
[page:Array array] - (optional) The target array.
[page:Number offset] - (optional) The array offset.
Returns an array with the coefficients, or copies them into the provided
array. The coefficients are represented as numbers.
[method:this zero]()
Sets all SH coefficients to `0`.
Static Methods
[method:undefined getBasisAt]( [param:Vector3 normal], [param:Array shBasis] )
[page:Vector3 normal] - The normal vector (assumed to be unit length).
[page:Array shBasis] - The resulting SH basis.
Computes the SH basis for the given normal vector.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Mesh] →
[name]
A mesh that has a [page:Skeleton] with [page:Bone bones] that can then be
used to animate the vertices of the geometry.
Code Example
const geometry = new THREE.CylinderGeometry( 5, 5, 5, 5, 15, 5, 30 );
// create the skin indices and skin weights manually
// (typically a loader would read this data from a 3D model for you)
const position = geometry.attributes.position;
const vertex = new THREE.Vector3();
const skinIndices = [];
const skinWeights = [];
for ( let i = 0; i < position.count; i ++ ) {
vertex.fromBufferAttribute( position, i );
// compute skinIndex and skinWeight based on some configuration data
const y = ( vertex.y + sizing.halfHeight );
const skinIndex = Math.floor( y / sizing.segmentHeight );
const skinWeight = ( y % sizing.segmentHeight ) / sizing.segmentHeight;
skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
}
geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );
// create skinned mesh and skeleton
const mesh = new THREE.SkinnedMesh( geometry, material );
const skeleton = new THREE.Skeleton( bones );
// see example from THREE.Skeleton
const rootBone = skeleton.bones[ 0 ];
mesh.add( rootBone );
// bind the skeleton to the mesh
mesh.bind( skeleton );
// move the bones and manipulate the model
skeleton.bones[ 0 ].rotation.x = -0.1;
skeleton.bones[ 1 ].rotation.x = 0.2;
Constructor
[name]( [param:BufferGeometry geometry], [param:Material material] )
[page:BufferGeometry geometry] - an instance of [page:BufferGeometry].
[page:Material material] - (optional) an instance of [page:Material].
Default is a new [page:MeshBasicMaterial].
Properties
See the base [page:Mesh] class for common properties.
[property:String bindMode]
Either `AttachedBindMode` or `DetachedBindMode`. `AttachedBindMode` means the skinned mesh
shares the same world space as the skeleton. This is not true when using `DetachedBindMode`
which is useful when sharing a skeleton across multiple skinned meshes.
Default is `AttachedBindMode`.
[property:Matrix4 bindMatrix]
The base matrix that is used for the bound bone transforms.
[property:Matrix4 bindMatrixInverse]
The base matrix that is used for resetting the bound bone transforms.
[property:Box3 boundingBox]
The bounding box of the [name]. Can be calculated with
[page:.computeBoundingBox](). Default is `null`.
[property:Sphere boundingSphere]
The bounding sphere of the [name]. Can be calculated with
[page:.computeBoundingSphere](). Default is `null`.
[property:Boolean isSkinnedMesh]
Read-only flag to check if a given object is of type [name].
[property:Skeleton skeleton]
[page:Skeleton] representing the bone hierarchy of the skinned mesh.
Methods
See the base [page:Mesh] class for common methods.
[method:undefined bind]( [param:Skeleton skeleton], [param:Matrix4 bindMatrix] )
[page:Skeleton skeleton] - [page:Skeleton] created from a [page:Bone Bones] tree.
[page:Matrix4 bindMatrix] - [page:Matrix4] that represents the base
transform of the skeleton.
Bind a skeleton to the skinned mesh. The bindMatrix gets saved to
.bindMatrix property and the .bindMatrixInverse gets calculated.
[method:SkinnedMesh clone]()
This method does currently not clone an instance of [name] correctly.
Please use [page:SkeletonUtils.clone]() in the meanwhile.
[method:undefined computeBoundingBox]()
Computes the bounding box of the skinned mesh, and updates the [page:.boundingBox] attribute.
The bounding box is not computed by the engine; it must be computed by your app.
If the skinned mesh is animated, the bounding box should be recomputed per frame.
[method:undefined computeBoundingSphere]()
Computes the bounding sphere of the skinned mesh, and updates the [page:.boundingSphere] attribute.
The bounding sphere is automatically computed by the engine when it is needed, e.g., for ray casting and view frustum culling.
If the skinned mesh is animated, the bounding sphere should be recomputed per frame.
[method:undefined normalizeSkinWeights]()
Normalizes the skin weights.
[method:undefined pose]()
This method sets the skinned mesh in the rest pose (resets the pose).
[method:Vector3 applyBoneTransform]( [param:Integer index], [param:Vector3 vector] )
Applies the bone transform associated with the given index to the given
position vector. Returns the updated vector.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

Material Constants
These constants define properties common to all material types, with the
exception of Texture Combine Operations which only apply to
[page:MeshBasicMaterial.combine MeshBasicMaterial],
[page:MeshLambertMaterial.combine MeshLambertMaterial] and
[page:MeshPhongMaterial.combine MeshPhongMaterial].
Side
THREE.FrontSide
THREE.BackSide
THREE.DoubleSide
Defines which side of faces will be rendered - front, back or both.
Default is [page:Constant FrontSide].
Blending Mode
THREE.NoBlending
THREE.NormalBlending
THREE.AdditiveBlending
THREE.SubtractiveBlending
THREE.MultiplyBlending
THREE.CustomBlending
These control the source and destination blending equations for the
material's RGB and Alpha sent to the WebGLRenderer for use by WebGL.
[page:Constant NormalBlending] is the default.
Note that [page:Constant CustomBlending] must be set to use
[page:CustomBlendingEquation Custom Blending Equations].
See the [example:webgl_materials_blending materials / blending]
example.
Depth Mode
THREE.NeverDepth
THREE.AlwaysDepth
THREE.EqualDepth
THREE.LessDepth
THREE.LessEqualDepth
THREE.GreaterEqualDepth
THREE.GreaterDepth
THREE.NotEqualDepth
Which depth function the material uses to compare incoming pixels Z-depth
against the current Z-depth buffer value. If the result of the comparison
is true, the pixel will be drawn.
[page:Materials NeverDepth] will never return true.
[page:Materials AlwaysDepth] will always return true.
[page:Materials EqualDepth] will return true if the incoming pixel Z-depth
is equal to the current buffer Z-depth.
[page:Materials LessDepth] will return true if the incoming pixel Z-depth
is less than the current buffer Z-depth.
[page:Materials LessEqualDepth] is the default and will return true if the
incoming pixel Z-depth is less than or equal to the current buffer
Z-depth.
[page:Materials GreaterEqualDepth] will return true if the incoming pixel
Z-depth is greater than or equal to the current buffer Z-depth.
[page:Materials GreaterDepth] will return true if the incoming pixel
Z-depth is greater than the current buffer Z-depth.
[page:Materials NotEqualDepth] will return true if the incoming pixel
Z-depth is not equal to the current buffer Z-depth.
Texture Combine Operations
THREE.MultiplyOperation
THREE.MixOperation
THREE.AddOperation
These define how the result of the surface's color is combined with the
environment map (if present), for [page:MeshBasicMaterial.combine MeshBasicMaterial],
[page:MeshLambertMaterial.combine MeshLambertMaterial]
and [page:MeshPhongMaterial.combine MeshPhongMaterial].
[page:Constant MultiplyOperation] is the default and multiplies the
environment map color with the surface color.
[page:Constant MixOperation] uses reflectivity to blend between the two
colors.
[page:Constant AddOperation] adds the two colors.
Stencil Functions
THREE.NeverStencilFunc
THREE.LessStencilFunc
THREE.EqualStencilFunc
THREE.LessEqualStencilFunc
THREE.GreaterStencilFunc
THREE.NotEqualStencilFunc
THREE.GreaterEqualStencilFunc
THREE.AlwaysStencilFunc
Which stencil function the material uses to determine whether or not to
perform a stencil operation.
[page:Materials NeverStencilFunc] will never return true.
[page:Materials LessStencilFunc] will return true if the stencil reference
value is less than the current stencil value.
[page:Materials EqualStencilFunc] will return true if the stencil
reference value is equal to the current stencil value.
[page:Materials LessEqualStencilFunc] will return true if the stencil
reference value is less than or equal to the current stencil value.
[page:Materials GreaterStencilFunc] will return true if the stencil
reference value is greater than the current stencil value.
[page:Materials NotEqualStencilFunc] will return true if the stencil
reference value is not equal to the current stencil value.
[page:Materials GreaterEqualStencilFunc] will return true if the stencil
reference value is greater than or equal to the current stencil value.
[page:Materials AlwaysStencilFunc] will always return true.
Stencil Operations
THREE.ZeroStencilOp
THREE.KeepStencilOp
THREE.ReplaceStencilOp
THREE.IncrementStencilOp
THREE.DecrementStencilOp
THREE.IncrementWrapStencilOp
THREE.DecrementWrapStencilOp
THREE.InvertStencilOp
Which stencil operation the material will perform on the stencil buffer
pixel if the provided stencil function passes.
[page:Materials ZeroStencilOp] will set the stencil value to `0`.
[page:Materials KeepStencilOp] will not change the current stencil
value.
[page:Materials ReplaceStencilOp] will replace the stencil value with the
specified stencil reference value.
[page:Materials IncrementStencilOp] will increment the current stencil
value by `1`.
[page:Materials DecrementStencilOp] will decrement the current stencil
value by `1`.
[page:Materials IncrementWrapStencilOp] will increment the current stencil
value by `1`. If the value increments past `255` it will be set to `0`.
[page:Materials DecrementWrapStencilOp] will increment the current stencil
value by `1`. If the value decrements below `0` it will be set to
`255`.
[page:Materials InvertStencilOp] will perform a bitwise inversion of the
current stencil value.
Normal map type
THREE.TangentSpaceNormalMap
THREE.ObjectSpaceNormalMap
Defines the type of the normal map. For TangentSpaceNormalMap, the
information is relative to the underlying surface. For
ObjectSpaceNormalMap, the information is relative to the object
orientation. Default is [page:Constant TangentSpaceNormalMap].
GLSL Version
THREE.GLSL1
THREE.GLSL3
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/constants.js src/constants.js]

[name]
A class representing a 3x3
[link:https://en.wikipedia.org/wiki/Matrix_(mathematics) matrix].
Code Example
const m = new Matrix3();
A Note on Row-Major and Column-Major Ordering
The constructor and [page:set]() method take arguments in
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order row-major]
order, while internally they are stored in the [page:.elements elements]
array in column-major order.
This means that calling
m.set( 11, 12, 13,
21, 22, 23,
31, 32, 33 );
will result in the [page:.elements elements] array containing:
m.elements = [ 11, 21, 31,
12, 22, 32,
13, 23, 33 ];
and internally all calculations are performed using column-major ordering.
However, as the actual ordering makes no difference mathematically and
most people are used to thinking about matrices in row-major order, the
three.js documentation shows matrices in row-major order. Just bear in
mind that if you are reading the source code, you'll have to take the
[link:https://en.wikipedia.org/wiki/Transpose transpose] of any matrices
outlined here to make sense of the calculations.
Constructor
[name]( [param:Number n11], [param:Number n12], [param:Number n13],
[param:Number n21], [param:Number n22], [param:Number n23],
[param:Number n31], [param:Number n32], [param:Number n33] )
Creates a 3x3 matrix with the given arguments in row-major order. If no arguments are provided, the constructor initializes
the [name] to the 3x3 [link:https://en.wikipedia.org/wiki/Identity_matrix identity matrix].
Properties
[property:Array elements]
A [link:https://en.wikipedia.org/wiki/Row-_and_column-major_order column-major] list of matrix values.
Methods
[method:Matrix3 clone]()
Creates a new Matrix3 and with identical elements to this one.
[method:this copy]( [param:Matrix3 m] )
Copies the elements of matrix [page:Matrix3 m] into this matrix.
[method:Float determinant]()
Computes and returns the [link:https://en.wikipedia.org/wiki/Determinant determinant] of this matrix.
[method:Boolean equals]( [param:Matrix3 m] )
Return true if this matrix and [page:Matrix3 m] are equal.
[method:this extractBasis]( [param:Vector3 xAxis], [param:Vector3 yAxis], [param:Vector3 zAxis] )
Extracts the [link:https://en.wikipedia.org/wiki/Basis_(linear_algebra) basis]
of this matrix into the three axis vectors provided. If this matrix
is:
[
a
b
c
d
e
f
g
h
i
]
then the [page:Vector3 xAxis], [page:Vector3 yAxis], [page:Vector3 zAxis]
will be set to:
xAxis
=
[
a
d
g
]
,
yAxis
=
[
b
e
h
]
, and
zAxis
=
[
c
f
i
]
[method:this fromArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - the array to read the elements from.
[page:Integer offset] - (optional) index of first element in the array.
Default is `0`.
Sets the elements of this matrix based on an array in
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order column-major] format.
[method:this invert]()
Inverts this matrix, using the
[link:https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution analytic method].
You can not invert with a determinant of zero. If you
attempt this, the method produces a zero matrix instead.
[method:this getNormalMatrix]( [param:Matrix4 m] )
[page:Matrix4 m] - [page:Matrix4]
Sets this matrix as the upper left 3x3 of the
[link:https://en.wikipedia.org/wiki/Normal_matrix normal matrix] of the
passed [page:Matrix4 matrix4].
The normal matrix is the
[link:https://en.wikipedia.org/wiki/Invertible_matrix inverse]
[link:https://en.wikipedia.org/wiki/Transpose transpose] of the matrix
[page:Matrix4 m].
[method:this identity]()
Resets this matrix to the 3x3 identity matrix:
[
1
0
0
0
1
0
0
0
1
]
[method:this makeRotation]( [param:Float theta] )
[page:Float theta] — Rotation angle in radians. Positive values rotate
counterclockwise.
Sets this matrix as a 2D rotational transformation by [page:Float theta]
radians. The resulting matrix will be:
[
cos
θ
-sin
θ
0
sin
θ
cos
θ
0
0
0
1
]
[method:this makeScale]( [param:Float x], [param:Float y] )
[page:Float x] - the amount to scale in the X axis.
[page:Float y] - the amount to scale in the Y axis.
Sets this matrix as a 2D scale transform:
[
x
0
0
0
y
0
0
0
1
]
[method:this makeTranslation]( [param:Vector2 v] )
[method:this makeTranslation]( [param:Float x], [param:Float y] )
[page:Vector2 v] a translation transform from vector.
or
[page:Float x] - the amount to translate in the X axis.
[page:Float y] - the amount to translate in the Y axis.
Sets this matrix as a 2D translation transform:
[
1
0
x
0
1
y
0
0
1
]
[method:this multiply]( [param:Matrix3 m] )
Post-multiplies this matrix by [page:Matrix3 m].
[method:this multiplyMatrices]( [param:Matrix3 a], [param:Matrix3 b] )
Sets this matrix to [page:Matrix3 a] x [page:Matrix3 b].
[method:this multiplyScalar]( [param:Float s] )
Multiplies every component of the matrix by the scalar value *s*.
[method:this rotate]( [param:Float theta] )
Rotates this matrix by the given angle (in radians).
[method:this scale]( [param:Float sx], [param:Float sy] )
Scales this matrix with the given scalar values.
[method:this set]( [param:Float n11], [param:Float n12], [param:Float n13], [param:Float n21], [param:Float n22], [param:Float n23], [param:Float n31], [param:Float n32], [param:Float n33] )
Sets the 3x3 matrix values to the given
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order row-major]
sequence of values:
[
n11
n12
n13
n21
n22
n23
n31
n32
n33
]
[method:this premultiply]( [param:Matrix3 m] )
Pre-multiplies this matrix by [page:Matrix3 m].
[method:this setFromMatrix4]( [param:Matrix4 m] )
Set this matrix to the upper 3x3 matrix of the Matrix4 [page:Matrix4 m].
[method:this setUvTransform]( [param:Float tx], [param:Float ty], [param:Float sx], [param:Float sy], [param:Float rotation], [param:Float cx], [param:Float cy] )
[page:Float tx] - offset x
[page:Float ty] - offset y
[page:Float sx] - repeat x
[page:Float sy] - repeat y
[page:Float rotation] - rotation, in radians. Positive values rotate
counterclockwise
[page:Float cx] - center x of rotation
[page:Float cy] - center y of rotation
Sets the UV transform matrix from offset, repeat, rotation, and center.
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - (optional) array to store the resulting vector in. If
not given a new array will be created.
[page:Integer offset] - (optional) offset in the array at which to put the
result.
Writes the elements of this matrix to an array in
[link:https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order column-major] format.
[method:this translate]( [param:Float tx], [param:Float ty] )
Translates this matrix by the given scalar values.
[method:this transpose]()
[link:https://en.wikipedia.org/wiki/Transpose Transposes] this matrix in
place.
[method:this transposeIntoArray]( [param:Array array] )
[page:Array array] - array to store the resulting vector in.
[link:https://en.wikipedia.org/wiki/Transpose Transposes] this matrix into
the supplied array, and returns itself unchanged.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
A material rendered with custom shaders. A shader is a small program
written in
[link:https://www.khronos.org/files/opengles_shading_language.pdf GLSL]
that runs on the GPU. You may want to use a custom shader if you need to:
implement an effect not included with any of the built-in [page:Material materials]
combine many objects into a single [page:BufferGeometry] in order to
improve performance
There are the following notes to bear in mind when using a `ShaderMaterial`:
A `ShaderMaterial` will only be rendered properly by
[page:WebGLRenderer], since the GLSL code in the
[link:https://en.wikipedia.org/wiki/Shader#Vertex_shaders vertexShader]
and [link:https://en.wikipedia.org/wiki/Shader#Pixel_shaders fragmentShader]
properties must be compiled and run on the GPU using WebGL.
As of THREE r72, directly assigning attributes in a ShaderMaterial is no
longer supported. A [page:BufferGeometry] instance must be used instead,
using [page:BufferAttribute] instances to define custom attributes.
As of THREE r77, [page:WebGLRenderTarget] or
[page:WebGLCubeRenderTarget] instances are no longer supposed to be used
as uniforms. Their [page:Texture texture] property must be used instead.
Built in attributes and uniforms are passed to the shaders along with
your code. If you don't want the [page:WebGLProgram] to add anything to
your shader code, you can use [page:RawShaderMaterial] instead of this
class.
You can use the directive #pragma unroll_loop_start and #pragma
unroll_loop_end in order to unroll a `for` loop in GLSL by the shader
preprocessor. The directive has to be placed right above the loop. The
loop formatting has to correspond to a defined standard.
The loop has to be
[link:https://en.wikipedia.org/wiki/Normalized_loop normalized].
The loop variable has to be *i*.
The value `UNROLLED_LOOP_INDEX` will be replaced with the explicitly
value of *i* for the given iteration and can be used in preprocessor
statements.
#pragma unroll_loop_start
for ( int i = 0; i < 10; i ++ ) {
// ...
}
#pragma unroll_loop_end
Code Example
const material = new THREE.ShaderMaterial( {
uniforms: {
time: { value: 1.0 },
resolution: { value: new THREE.Vector2() }
},
vertexShader: document.getElementById( 'vertexShader' ).textContent,
fragmentShader: document.getElementById( 'fragmentShader' ).textContent
} );
Examples
[example:webgl_buffergeometry_custom_attributes_particles webgl / buffergeometry / custom / attributes / particles]
[example:webgl_buffergeometry_selective_draw webgl / buffergeometry / selective / draw]
[example:webgl_custom_attributes webgl / custom / attributes]
[example:webgl_custom_attributes_lines webgl / custom / attributes / lines]
[example:webgl_custom_attributes_points webgl / custom / attributes / points]
[example:webgl_custom_attributes_points2 webgl / custom / attributes / points2]
[example:webgl_custom_attributes_points3 webgl / custom / attributes / points3]
[example:webgl_depth_texture webgl / depth / texture]
[example:webgl_gpgpu_birds webgl / gpgpu / birds]
[example:webgl_gpgpu_protoplanet webgl / gpgpu / protoplanet]
[example:webgl_gpgpu_water webgl / gpgpu / water]
[example:webgl_interactive_points webgl / interactive / points]
[example:webgl_video_kinect webgl / video / kinect]
[example:webgl_lights_hemisphere webgl / lights / hemisphere]
[example:webgl_marchingcubes webgl / marchingcubes]
[example:webgl_materials_envmaps webgl / materials / envmaps]
[example:webgl_materials_lightmap webgl / materials / lightmap]
[example:webgl_materials_wireframe webgl / materials / wireframe]
[example:webgl_modifier_tessellation webgl / modifier / tessellation]
[example:webgl_postprocessing_dof2 webgl / postprocessing / dof2]
[example:webgl_postprocessing_godrays webgl / postprocessing / godrays]
Vertex shaders and fragment shaders
You can specify two different types of shaders for each material:
The vertex shader runs first; it receives `attributes`, calculates /
manipulates the position of each individual vertex, and passes
additional data (`varying`s) to the fragment shader.
The fragment ( or pixel ) shader runs second; it sets the color of
each individual "fragment" (pixel) rendered to the screen.
There are three types of variables in shaders: uniforms, attributes, and
varyings:
`Uniforms` are variables that have the same value for all vertices -
lighting, fog, and shadow maps are examples of data that would be
stored in uniforms. Uniforms can be accessed by both the vertex shader
and the fragment shader.
`Attributes` are variables associated with each vertex---for instance,
the vertex position, face normal, and vertex color are all examples of
data that would be stored in attributes. Attributes can `only` be
accessed within the vertex shader.
`Varyings` are variables that are passed from the vertex shader to the
fragment shader. For each fragment, the value of each varying will be
smoothly interpolated from the values of adjacent vertices.
Note that `within` the shader itself, uniforms and attributes act like
constants; you can only modify their values by passing different values
to the buffers from your JavaScript code.
Built-in attributes and uniforms
The [page:WebGLRenderer] provides many attributes and uniforms to
shaders by default; definitions of these variables are prepended to your
`fragmentShader` and `vertexShader` code by the [page:WebGLProgram] when
the shader is compiled; you don't need to declare them yourself. See
[page:WebGLProgram] for details of these variables.
Some of these uniforms or attributes (e.g. those pertaining lighting,
fog, etc.) require properties to be set on the material in order for
[page:WebGLRenderer] to copy the appropriate values to the GPU - make
sure to set these flags if you want to use these features in your own
shader.
If you don't want [page:WebGLProgram] to add anything to your shader
code, you can use [page:RawShaderMaterial] instead of this class.
Custom attributes and uniforms
Both custom attributes and uniforms must be declared in your GLSL shader
code (within `vertexShader` and/or `fragmentShader`). Custom uniforms
must be defined in `both` the `uniforms` property of your
`ShaderMaterial`, whereas any custom attributes must be defined via
[page:BufferAttribute] instances. Note that `varying`s only need to be
declared within the shader code (not within the material).
To declare a custom attribute, please reference the
[page:BufferGeometry] page for an overview, and the
[page:BufferAttribute] page for a detailed look at the `BufferAttribute`
API.
When creating your attributes, each typed array that you create to hold
your attribute's data must be a multiple of your data type's size. For
example, if your attribute is a [page:Vector3 THREE.Vector3] type, and
you have 3000 vertices in your [page:BufferGeometry], your typed array
value must be created with a length of 3000 * 3, or 9000 (one value
per-component). A table of each data type's size is shown below for
reference:
Attribute sizes
GLSL type
JavaScript type
Size
float
[page:Number]
1
vec2
[page:Vector2 THREE.Vector2]
2
vec3
[page:Vector3 THREE.Vector3]
3
vec3
[page:Color THREE.Color]
3
vec4
[page:Vector4 THREE.Vector4]
4
Note that attribute buffers are `not` refreshed automatically when their
values change. To update custom attributes, set the `needsUpdate` flag
to true on the [page:BufferAttribute] of the geometry (see
[page:BufferGeometry] for further details).
To declare a custom [page:Uniform], use the `uniforms` property:
uniforms: {
time: { value: 1.0 },
resolution: { value: new THREE.Vector2() }
}
You're recommended to update custom [page:Uniform] values depending on
[page:Object3D object] and [page:Camera camera] in
[page:Object3D.onBeforeRender] because [page:Material] can be shared
among [page:Mesh meshes], [page:Matrix4 matrixWorld] of [page:Scene] and
[page:Camera] are updated in [page:WebGLRenderer.render], and some
effects render a [page:Scene scene] with their own private [page:Camera cameras].
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
Properties
See the base [page:Material] class for common properties.
[property:Boolean clipping]
Defines whether this material supports clipping; true to let the renderer
pass the clippingPlanes uniform. Default is false.
[property:Object defaultAttributeValues]
When the rendered geometry doesn't include these attributes but the
material does, these default values will be passed to the shaders. This
avoids errors when buffer data is missing.
this.defaultAttributeValues = {
'color': [ 1, 1, 1 ],
'uv': [ 0, 0 ],
'uv1': [ 0, 0 ]
};
[property:Object defines]
Defines custom constants using `#define` directives within the GLSL code
for both the vertex shader and the fragment shader; each key/value pair
yields another directive:
defines: {
FOO: 15,
BAR: true
}
yields the lines
#define FOO 15
#define BAR true
in the GLSL code.
[property:Object extensions]
An object with the following properties:
this.extensions = {
clipCullDistance: false, // set to use vertex shader clipping
multiDraw: false // set to use vertex shader multi_draw / enable gl_DrawID
};
[property:Boolean fog]
Define whether the material color is affected by global fog settings; true
to pass fog uniforms to the shader. Default is false.
[property:String fragmentShader]
Fragment shader GLSL code. This is the actual code for the shader. In the
example above, the `vertexShader` and `fragmentShader` code is extracted
from the DOM; it could be passed as a string directly or loaded via AJAX
instead.
[property:String glslVersion]
Defines the GLSL version of custom shader code. Valid values are
`THREE.GLSL1` or `THREE.GLSL3`. Default is `null`.
[property:String index0AttributeName]
If set, this calls
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindAttribLocation gl.bindAttribLocation]
to bind a generic vertex index to an attribute variable. Default is undefined.
[property:Boolean isShaderMaterial]
Read-only flag to check if a given object is of type [name].
[property:Boolean lights]
Defines whether this material uses lighting; true to pass uniform data
related to lighting to this shader. Default is false.
[property:Float linewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
[property:Boolean flatShading]
Define whether the material is rendered with flat shading.
Default is false.
[property:Object uniforms]
An object of the form:
{
"uniform1": { value: 1.0 },
"uniform2": { value: 2 }
}
specifying the uniforms to be passed to the shader code; keys are uniform
names, values are definitions of the form
{
value: 1.0
}
where `value` is the value of the uniform. Names must match the name of
the uniform, as defined in the GLSL code. Note that uniforms are refreshed
on every frame, so updating the value of the uniform will immediately
update the value available to the GLSL code.
[property:Boolean uniformsNeedUpdate]
Can be used to force a uniform update while changing uniforms in
[page:Object3D.onBeforeRender](). Default is `false`.
[property:Boolean vertexColors]
Defines whether vertex coloring is used. Default is `false`.
[property:String vertexShader]
Vertex shader GLSL code. This is the actual code for the shader. In the
example above, the `vertexShader` and `fragmentShader` code is extracted
from the DOM; it could be passed as a string directly or loaded via AJAX
instead.
[property:Boolean wireframe]
Render geometry as wireframe (using GL_LINES instead of GL_TRIANGLES).
Default is false (i.e. render as flat polygons).
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
[method:ShaderMaterial clone]()
Generates a shallow copy of this material. Note that the vertexShader and
fragmentShader are copied `by reference`, as are the definitions of the
`attributes`; this means that clones of the material will share the same
compiled [page:WebGLProgram]. However, the `uniforms` are copied `by
value`, which allows you to have different sets of uniforms for different
copies of the material.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Used to implement post-processing effects in three.js. The class manages a chain of post-processing passes
to produce the final visual result. Post-processing passes are executed in order of their addition/insertion.
The last pass is automatically rendered to screen.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
Examples
[example:webgl_postprocessing postprocessing]
[example:webgl_postprocessing_advanced postprocessing advanced]
[example:webgl_postprocessing_backgrounds postprocessing backgrounds]
[example:webgl_postprocessing_crossfade postprocessing crossfade]
[example:webgl_postprocessing_dof postprocessing depth-of-field]
[example:webgl_postprocessing_dof2 postprocessing depth-of-field 2]
[example:webgl_postprocessing_fxaa postprocessing fxaa]
[example:webgl_postprocessing_glitch postprocessing glitch]
[example:webgl_postprocessing_godrays postprocessing godrays]
[example:webgl_postprocessing_gtao postprocessing gtao]
[example:webgl_postprocessing_masking postprocessing masking]
[example:webgl_postprocessing_material_ao postprocessing material ao]
[example:webgl_postprocessing_outline postprocessing outline]
[example:webgl_postprocessing_pixel postprocessing pixelate]
[example:webgl_postprocessing_procedural postprocessing procedural]
[example:webgl_postprocessing_rgb_halftone postprocessing rgb halftone]
[example:webgl_postprocessing_sao postprocessing sao]
[example:webgl_postprocessing_smaa postprocessing smaa]
[example:webgl_postprocessing_sobel postprocessing sobel]
[example:webgl_postprocessing_ssaa postprocessing ssaa]
[example:webgl_postprocessing_ssao postprocessing ssao]
[example:webgl_postprocessing_taa postprocessing taa]
[example:webgl_postprocessing_unreal_bloom postprocessing unreal bloom]
[example:webgl_postprocessing_unreal_bloom_selective postprocessing unreal bloom selective]
Constructor
[name]( [param:WebGLRenderer renderer], [param:WebGLRenderTarget renderTarget] )
[page:WebGLRenderer renderer] -- The renderer used to render the scene.
[page:WebGLRenderTarget renderTarget] -- (optional) A preconfigured render target internally used by [name].
Properties
[property:Array passes]
An array representing the (ordered) chain of post-processing passes.
[property:WebGLRenderTarget readBuffer]
A reference to the internal read buffer. Passes usually read the previous render result from this buffer.
[property:WebGLRenderer renderer]
A reference to the internal renderer.
[property:Boolean renderToScreen]
Whether the final pass is rendered to the screen (default framebuffer) or not.
[property:WebGLRenderTarget writeBuffer]
A reference to the internal write buffer. Passes usually write their result into this buffer.
Methods
[method:undefined addPass]( [param:Pass pass] )
pass -- The pass to add to the pass chain.
Adds the given pass to the pass chain.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.
[method:undefined insertPass]( [param:Pass pass], [param:Integer index] )
pass -- The pass to insert into the pass chain.
index -- Defines the position in the pass chain where the pass should be inserted.
Inserts the given pass into the pass chain at the given index.
[method:Boolean isLastEnabledPass]( [param:Integer passIndex] )
passIndex -- The pass to check.
Returns true if the pass for the given index is the last enabled pass in the pass chain.
Used by [name] to determine when a pass should be rendered to screen.
[method:undefined removePass]( [param:Pass pass] )
pass -- The pass to remove from the pass chain.
Removes the given pass from the pass chain.
[method:undefined render]( [param:Float deltaTime] )
deltaTime -- The delta time value.
Executes all enabled post-processing passes in order to produce the final frame.
[method:undefined reset]( [param:WebGLRenderTarget renderTarget] )
[page:WebGLRenderTarget renderTarget] -- (optional) A preconfigured render target internally used by [name]..
Resets the internal state of the [name].
[method:undefined setPixelRatio]( [param:Float pixelRatio] )
pixelRatio -- The device pixel ratio.
Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output.
Thus, the semantic of the method is similar to [page:WebGLRenderer.setPixelRatio]().
[method:undefined setSize]( [param:Integer width], [param:Integer height] )
width -- The width of the [name].
height -- The height of the [name].
Resizes the internal render buffers and passes to (width, height) with device pixel ratio taken into account.
Thus, the semantic of the method is similar to [page:WebGLRenderer.setSize]().
[method:undefined swapBuffers]()
Swaps the internal read/write buffers.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/EffectComposer.js examples/jsm/postprocessing/EffectComposer.js]

[name]
A point's [link:https://en.wikipedia.org/wiki/Spherical_coordinate_system spherical coordinates].
Constructor
[name]( [param:Float radius], [param:Float phi], [param:Float theta] )
[page:Float radius] - the radius, or the
[link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean distance]
(straight-line distance) from the point to the origin. Default is
`1.0`.
[page:Float phi] - polar angle in radians from the y (up) axis. Default is
`0`.
[page:Float theta] - equator angle in radians around the y (up) axis.
Default is `0`.
The poles (phi) are at the positive and negative y axis. The equator
(theta) starts at positive z.
Properties
[property:Float radius]
[property:Float phi]
[property:Float theta]
Methods
[method:Spherical clone]()
Returns a new spherical with the same [page:.radius radius], [page:.phi phi]
and [page:.theta theta] properties as this one.
[method:this copy]( [param:Spherical s] )
Copies the values of the passed Spherical's [page:.radius radius],
[page:.phi phi] and [page:.theta theta] properties to this spherical.
[method:this makeSafe]()
Restricts the polar angle [page:.phi phi] to be between 0.000001 and pi -
0.000001.
[method:this set]( [param:Float radius], [param:Float phi], [param:Float theta] )
Sets values of this spherical's [page:.radius radius], [page:.phi phi] and
[page:.theta theta] properties.
[method:this setFromVector3]( [param:Vector3 vec3] )
Sets values of this spherical's [page:.radius radius], [page:.phi phi] and
[page:.theta theta] properties from the [page:Vector3 Vector3].
[method:this setFromCartesianCoords]( [param:Float x], [param:Float y], [param:Float z] )
Sets values of this spherical's [page:.radius radius], [page:.phi phi] and
[page:.theta theta] properties from Cartesian coordinates.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Provides utility functions for managing uniforms.
Methods
[method:Object clone]( [param:Object src] )
src -- An object representing uniform definitions.
Clones the given uniform definitions by performing a deep-copy. That means
if the [page:Uniform.value value] of a uniform refers to an object like a
[page:Vector3] or [page:Texture], the cloned uniform will refer to a new
object reference.
[method:Object merge]( [param:Array uniforms] )
uniforms -- An array of objects containing uniform definitions.
Merges the given uniform definitions into a single object. Since the
method internally uses [page:.clone](), it performs a deep-copy when
producing the merged uniform definitions.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] →
[name]
A curve representing a 3d line segment.
Constructor
[name]( [param:Vector3 v1], [param:Vector3 v2] )
[page:Vector3 v1] – The start point.
[page:Vector3 v2] - The end point.
Properties
See the base [page:Curve] class for common properties.
[property:Vector3 v1]
The start point.
[property:Vector3 v2]
The end point.
Methods
See the base [page:Curve] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Buffered scene graph property that allows weighted accumulation; used
internally.
Constructor
[name]( [param:PropertyBinding binding], [param:String typeName], [param:Number valueSize] )
-- binding
-- typeName
-- valueSize
Properties
[property:PropertyBinding binding]
[property:TypedArray buffer]
Buffer with size [page:PropertyMixer valueSize] * 4.
This has the layout: [ incoming | accu0 | accu1 | orig ]
Interpolators can use .buffer as their .result and the data then goes to
'incoming'. 'accu0' and 'accu1' are used frame-interleaved for the
cumulative result and are compared to detect changes. 'orig' stores the
original state of the property.
[property:Number cumulativeWeight]
Default is `0`.
[property:Number cumulativeWeightAdditive]
Default is `0`.
[property:Number valueSize]
[property:Number referenceCount]
Default is `0`.
[property:Number useCount]
Default is `0`.
Methods
[method:undefined accumulate]( [param:Number accuIndex], [param:Number weight] )
Accumulate data in [page:PropertyMixer.buffer buffer][accuIndex]
'incoming' region into 'accu[i]'.
If weight is `0` this does nothing.
[method:undefined accumulateAdditive]( [param:Number weight] )
Accumulate data in the 'incoming' region into 'add'.
If weight is `0` this does nothing.
[method:undefined apply]( [param:Number accuIndex] )
Apply the state of [page:PropertyMixer.buffer buffer] 'accu[i]' to the
binding when accus differ.
[method:undefined saveOriginalState]( )
Remember the state of the bound property and copy it to both accus.
[method:undefined restoreOriginalState]( )
Apply the state previously taken via 'saveOriginalState' to the binding.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading an [page:Image]. This is used internally by the
[page:CubeTextureLoader], [page:ObjectLoader] and [page:TextureLoader].
Code Example
// instantiate a loader
const loader = new THREE.ImageLoader();
// load a image resource
loader.load(
// resource URL
'textures/skyboxsun25degtest.png',
// onLoad callback
function ( image ) {
// use the image, e.g. draw part of it on a canvas
const canvas = document.createElement( 'canvas' );
const context = canvas.getContext( '2d' );
context.drawImage( image, 100, 100 );
},
// onProgress callback currently not supported
undefined,
// onError callback
function () {
console.error( 'An error happened.' );
}
);
Please note three.js r84 dropped support for ImageLoader progress events.
For an ImageLoader that supports progress events, see
[link:https://github.com/mrdoob/three.js/issues/10439#issuecomment-275785639 this thread].
Examples
[example:webgl_loader_obj WebGL / loader / obj]
[example:webgl_shaders_ocean WebGL / shaders / ocean]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:HTMLImageElement load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] — Will be called when load completes. The argument
will be the loaded [page:Image image].
[page:Function onProgress] (optional) — This callback function is
currently not supported.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and return the [page:Image image] object that will
contain the data.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:KeyframeTrack] →
[name]
A Track of boolean keyframe values.
Constructor
[name]( [param:String name], [param:Array times], [param:Array values] )
[page:String name] - (required) identifier for the KeyframeTrack.
[page:Array times] - (required) array of keyframe times.
[page:Array values] - values for the keyframes at the times specified.
Properties
See [page:KeyframeTrack] for inherited properties.
[property:Constant DefaultInterpolation]
The default interpolation type to use, [page:Animation InterpolateDiscrete].
[property:Array ValueBufferType]
A normal Array (no Float32Array in this case, unlike `ValueBufferType` of
[page:KeyframeTrack]).
[property:String ValueTypeName]
String 'bool'.
Methods
See [page:KeyframeTrack] for inherited methods.
[method:undefined InterpolantFactoryMethodLinear ]()
The value of this method here is 'undefined', as it does not make sense
for discrete properties.
[method:undefined InterpolantFactoryMethodSmooth ]()
The value of this method here is 'undefined', as it does not make sense
for discrete properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Dual [page:PerspectiveCamera PerspectiveCamera]s used for effects such as
[link:https://en.wikipedia.org/wiki/Anaglyph_3D 3D Anaglyph] or
[link:https://en.wikipedia.org/wiki/parallax_barrier Parallax Barrier].
Examples
[example:webgl_effects_anaglyph effects / anaglyph ]
[example:webgl_effects_parallaxbarrier effects / parallaxbarrier ]
[example:webgl_effects_stereo effects / stereo ]
Constructor
[name]( )
Properties
[property:Float aspect]
Default is `1`.
[property:Float eyeSep]
Default is `0.064`.
[property:PerspectiveCamera cameraL]
Left camera. This is added to [page:Layers layer 1] - objects to be
rendered by the left camera must also be added to this layer.
[property:PerspectiveCamera cameraR]
Right camera.This is added to [page:Layers layer 2] - objects to be
rendered by the right camera must also be added to this layer.
Methods
[method:undefined update]( [param:PerspectiveCamera camera] )
Update the stereo cameras based on the camera passed in.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] →
[name]
Create a smooth 3d
quadratic bezier curve
, defined by a startpoint, endpoint and a single control point.
Code Example
const curve = new THREE.QuadraticBezierCurve3(
new THREE.Vector3( -10, 0, 0 ),
new THREE.Vector3( 20, 15, 0 ),
new THREE.Vector3( 10, 0, 0 )
);
const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
Constructor
[name]( [param:Vector3 v0], [param:Vector3 v1], [param:Vector3 v2] )
[page:Vector3 v0] – The starting point
[page:Vector3 v1] – The middle control point
[page:Vector3 v2] – The ending point
Properties
See the base [page:Curve] class for common properties.
[property:Vector3 v0]
The startpoint.
[property:Vector3 v1]
The control point.
[property:Vector3 v2]
The endpoint.
Methods
See the base [page:Curve] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] → [page:MeshStandardMaterial] →
[name]
An extension of the [page:MeshStandardMaterial], providing more advanced
physically-based rendering properties:
Anisotropy:
Ability to represent the anisotropic property of materials
as observable with brushed metals.
Clearcoat:
Some materials — like car paints, carbon fiber, and
wet surfaces — require a clear, reflective layer on top of another layer
that may be irregular or rough. Clearcoat approximates this effect,
without the need for a separate transparent surface.
Iridescence:
Allows to render the effect where hue varies
depending on the viewing angle and illumination angle. This can be seen on
soap bubbles, oil films, or on the wings of many insects.
Physically-based transparency:
One limitation of
[page:Material.opacity .opacity] is that highly transparent materials
are less reflective. Physically-based [page:.transmission] provides a
more realistic option for thin, transparent surfaces like glass.
Advanced reflectivity:
More flexible reflectivity for
non-metallic materials.
Sheen:
Can be used for representing cloth and fabric materials.
As a result of these complex shading features, MeshPhysicalMaterial has a
higher performance cost, per pixel, than other three.js materials. Most
effects are disabled by default, and add cost as they are enabled. For
best results, always specify an [page:.envMap environment map] when using
this material.
Examples
[example:webgl_loader_gltf_anisotropy loader / gltf / anisotropy]
[example:webgl_materials_physical_clearcoat materials / physical / clearcoat]
[example:webgl_loader_gltf_iridescence loader / gltf / iridescence]
[example:webgl_loader_gltf_sheen loader / gltf / sheen]
[example:webgl_materials_physical_transmission materials / physical / transmission]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material] and
[page:MeshStandardMaterial]) can be passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] and [page:MeshStandardMaterial] classes for
common properties.
[property:Float anisotropy]
The anisotropy strength. Default is `0.0`.
[property:Texture anisotropyMap]
Red and green channels represent the anisotropy direction in `[-1, 1]` tangent,
bitangent space, to be rotated by [page:.anisotropyRotation]. The blue channel
contains strength as `[0, 1]` to be multiplied by [page:.anisotropy]. Default is `null`.
[property:Float anisotropyRotation]
The rotation of the anisotropy in tangent, bitangent space, measured in radians
counter-clockwise from the tangent. When [page:.anisotropyMap] is present, this
property provides additional rotation to the vectors in the texture. Default is `0.0`.
[property:Color attenuationColor]
The color that white light turns into due to absorption when reaching the
attenuation distance. Default is `white` (0xffffff).
[property:Float attenuationDistance]
Density of the medium given as the average distance that light travels in
the medium before interacting with a particle. The value is given in world
space units, and must be greater than zero. Default is `Infinity`.
[property:Float clearcoat]
Represents the intensity of the clear coat layer, from `0.0` to `1.0`. Use
clear coat related properties to enable multilayer materials that have a
thin translucent layer over the base layer. Default is `0.0`.
[property:Texture clearcoatMap]
The red channel of this texture is multiplied against [page:.clearcoat],
for per-pixel control over a coating's intensity. Default is `null`.
[property:Texture clearcoatNormalMap]
Can be used to enable independent normals for the clear coat layer.
Default is `null`.
[property:Vector2 clearcoatNormalScale]
How much [page:.clearcoatNormalMap] affects the clear coat layer, from
`(0,0)` to `(1,1)`. Default is `(1,1)`.
[property:Float clearcoatRoughness]
Roughness of the clear coat layer, from `0.0` to `1.0`. Default is `0.0`.
[property:Texture clearcoatRoughnessMap]
The green channel of this texture is multiplied against
[page:.clearcoatRoughness], for per-pixel control over a coating's
roughness. Default is `null`.
[property:Object defines]
An object of the form:
{
'STANDARD': '',
'PHYSICAL': '',
};
This is used by the [page:WebGLRenderer] for selecting shaders.
[property:Float ior]
Index-of-refraction for non-metallic materials, from `1.0` to `2.333`.
Default is `1.5`.
[property:Float reflectivity]
Degree of reflectivity, from `0.0` to `1.0`. Default is `0.5`, which
corresponds to an index-of-refraction of 1.5.
This models the reflectivity of non-metallic materials. It has no effect
when [page:MeshStandardMaterial.metalness metalness] is `1.0`
[property:Float iridescence]
The intensity of the [link:https://en.wikipedia.org/wiki/Iridescence iridescence] layer, simulating RGB color shift based on the angle between the surface and the viewer, from `0.0` to `1.0`. Default is `0.0`.
[property:Texture iridescenceMap]
The red channel of this texture is multiplied against
[page:.iridescence], for per-pixel control over iridescence.
Default is `null`.
[property:Float iridescenceIOR]
Strength of the iridescence RGB color shift effect, represented by an index-of-refraction. Between `1.0` to `2.333`.
Default is `1.3`.
[property:Array iridescenceThicknessRange]
Array of exactly 2 elements, specifying minimum and maximum thickness of the iridescence layer.
Thickness of iridescence layer has an equivalent effect of the one [page:.thickness] has on [page:.ior].
Default is `[100, 400]`.
If [page:.iridescenceThicknessMap] is not defined, iridescence thickness will use only the second element of the given array.
[property:Texture iridescenceThicknessMap]
A texture that defines the thickness of the iridescence layer, stored in the green channel.
Minimum and maximum values of thickness are defined by [page:.iridescenceThicknessRange] array:
`0.0` in the green channel will result in thickness equal to first element of the array.
`1.0` in the green channel will result in thickness equal to second element of the array.
Values in-between will linearly interpolate between the elements of the array.
Default is `null`.
[property:Float sheen]
The intensity of the sheen layer, from `0.0` to `1.0`. Default is `0.0`.
[property:Float sheenRoughness]
Roughness of the sheen layer, from `0.0` to `1.0`. Default is `1.0`.
[property:Texture sheenRoughnessMap]
The alpha channel of this texture is multiplied against
[page:.sheenRoughness], for per-pixel control over sheen roughness.
Default is `null`.
[property:Color sheenColor]
The sheen tint. Default is `0x000000`, black.
[property:Texture sheenColorMap]
The RGB channels of this texture are multiplied against
[page:.sheenColor], for per-pixel control over sheen tint. Default is
`null`.
[property:Float specularIntensity]
A float that scales the amount of specular reflection for non-metals only.
When set to zero, the model is effectively Lambertian. From `0.0` to
`1.0`. Default is `1.0`.
[property:Texture specularIntensityMap]
The alpha channel of this texture is multiplied against
[page:.specularIntensity], for per-pixel control over specular intensity.
Default is `null`.
[property:Color specularColor]
A [page:Color] that tints the specular reflection at normal incidence for
non-metals only. Default is `0xffffff`, white.
[property:Texture specularColorMap]
The RGB channels of this texture are multiplied against
[page:.specularColor], for per-pixel control over specular color. Default
is `null`.
[property:Float thickness]
The thickness of the volume beneath the surface. The value is given in the
coordinate space of the mesh. If the value is `0` the material is
thin-walled. Otherwise the material is a volume boundary. Default is `0`.
[property:Texture thicknessMap]
A texture that defines the thickness, stored in the green channel. This will
be multiplied by [page:.thickness]. Default is `null`.
[property:Float transmission]
Degree of transmission (or optical transparency), from `0.0` to `1.0`.
Default is `0.0`.
Thin, transparent or semitransparent, plastic or glass materials remain
largely reflective even if they are fully transmissive. The transmission
property can be used to model these materials.
When transmission is non-zero, [page:Material.opacity opacity] should be
set to `1`.
[property:Texture transmissionMap]
The red channel of this texture is multiplied against
[page:.transmission], for per-pixel control over optical transparency.
Default is `null`.
Methods
See the base [page:Material] and [page:MeshStandardMaterial] classes for
common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] → [page:PolyhedronGeometry] →
[name]
A class for generating an icosahedron geometry.
Constructor
[name]([param:Float radius], [param:Integer detail])
radius — Default is `1`.
detail — Default is `0`. Setting this to a value greater than `0` adds more
vertices making it no longer an icosahedron. When detail is greater than
1, it's effectively a sphere.
Properties
See the base [page:PolyhedronGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:PolyhedronGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:WebGLRenderTarget] →
[name]
This type of render target represents an array of textures.
Examples
[example:webgl2_rendertarget_texture2darray WebGL 2 / render target / array]
Constructor
[name]( [param:Number width], [param:Number height], [param:Number depth], [param:Object options] )
[page:Number width] - the width of the render target, in pixels. Default is `1`.
[page:Number height] - the height of the render target, in pixels. Default is `1`.
[page:Number depth] - the depth/layer count of the render target. Default is `1`.
[page:Object options] - optional object that holds texture parameters for an
auto-generated target texture and depthBuffer/stencilBuffer booleans. See [page:WebGLRenderTarget] for details.
Creates a new [name].
Properties
See [page:WebGLRenderTarget] for inherited properties.
[property:number depth]
The depth of the render target.
[property:DataArrayTexture texture]
The texture property is overwritten with an instance of
[page:DataArrayTexture].
Methods
See [page:WebGLRenderTarget] for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Texture] →
[name]
Creates a texture based on data in compressed form, for example from a
[link:https://en.wikipedia.org/wiki/DirectDraw_Surface DDS] file.
For use with the [page:CompressedTextureLoader CompressedTextureLoader].
Constructor
[name]( [param:Array mipmaps], [param:Number width], [param:Number height],
[param:Constant format], [param:Constant type], [param:Constant mapping],
[param:Constant wrapS], [param:Constant wrapT], [param:Constant magFilter],
[param:Constant minFilter], [param:Number anisotropy], [param:Constant colorSpace] )
[page:Array mipmaps] -- The mipmaps array should contain objects with
data, width and height. The mipmaps should be of the correct format and
type.
[page:Number width] -- The width of the biggest mipmap.
[page:Number height] -- The height of the biggest mipmap.
[page:Constant format] -- The format used in the mipmaps. See
[page:Textures ST3C Compressed Texture Formats], [page:Textures PVRTC Compressed Texture Formats]
and [page:Textures ETC Compressed Texture Format] for other choices.
[page:Constant type] -- Default is [page:Textures THREE.UnsignedByteType].
See [page:Textures type constants] for other choices.
[page:Constant mapping] -- How the image is applied to the object. An
object type of [page:Textures THREE.UVMapping]. See [page:Textures mapping constants] for other choices.
[page:Constant wrapS] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant wrapT] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant magFilter] -- How the texture is sampled when a texel
covers more than one pixel. The default is [page:Textures THREE.LinearFilter].
See [page:Textures magnification filter constants]
for other choices.
[page:Constant minFilter] -- How the texture is sampled when a texel
covers less than one pixel. The default is [page:Textures THREE.LinearMipmapLinearFilter].
See [page:Textures minification filter constants] for other choices.
[page:Number anisotropy] -- The number of samples taken along the axis
through the pixel that has the highest density of texels. By default, this
value is `1`. A higher value gives a less blurry result than a basic mipmap,
at the cost of more texture samples being used. Use
renderer.getMaxAnisotropy() to find the maximum valid anisotropy value for
the GPU; this value is usually a power of 2.
[page:Constant colorSpace] -- The default is [page:Textures THREE.NoColorSpace].
See [page:Textures color space constants] for other
choices.
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean flipY]
False by default. Flipping textures does not work for compressed textures.
[property:Boolean generateMipmaps]
False by default. Mipmaps can't be generated for compressed textures
[property:Object image]
Overridden with a object containing width and height.
[property:Boolean isCompressedTexture]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A convex hull class. Implements the Quickhull algorithm by: Dirk Gregorius. March 2014, Game Developers Conference: [link:http://media.steampowered.com/apps/valve/2014/DirkGregorius_ImplementingQuickHull.pdf Implementing QuickHull].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { ConvexHull } from 'three/addons/math/ConvexHull.js';
Constructor
[name]()
Creates a new instance of [name].
Properties
[property:VertexList assigned]
This [page:VertexList vertex list] holds all vertices that are assigned to a face. Default is an empty vertex list.
[property:Array faces]
The generated faces of the convex hull. Default is an empty array.
[property:Array newFaces]
This array holds the faces that are generated within a single iteration. Default is an empty array.
[property:Float tolerance]
The epsilon value that is used for internal comparative operations. The calculation of this value depends on the size of the geometry. Default is -1.
[property:VertexList unassigned]
This [page:VertexList vertex list] holds all vertices that are not assigned to a face. Default is an empty vertex list.
[property:Array vertices]
The internal representation of the given geometry data (an array of [page:VertexNode vertices]).
Methods
[method:HalfEdge addAdjoiningFace]( [param:VertexNode eyeVertex], [param:HalfEdge horizonEdge] )
[page:VertexNode eyeVertex] - The vertex that is added to the hull.
[page:HalfEdge horizonEdge] - A single edge of the horizon.
Creates a face with the vertices 'eyeVertex.point', 'horizonEdge.tail' and 'horizonEdge.head' in CCW order.
All the half edges are created in CCW order thus the face is always pointing outside the hull
[method:this addNewFaces]( [param:VertexNode eyeVertex], [param:HalfEdge horizonEdge] )
[page:VertexNode eyeVertex] - The vertex that is added to the hull.
[page:HalfEdge horizon] - An array of half-edges that form the horizon.
Adds 'horizon.length' faces to the hull, each face will be linked with the horizon opposite face and the face on the left/right.
[method:this addVertexToFace]( [param:VertexNode vertex], [param:Face face]	)
[page:VertexNodeNode vertex] - The vertex to add.
[page:Face face] - The target face.
Adds a vertex to the 'assigned' list of vertices and assigns it to the given face.
[method:this addVertexToHull]( [param:VertexNode eyeVertex] )
[page:VertexNode eyeVertex] - The vertex that is added to the hull.
Adds a vertex to the hull with the following algorithm
Compute the 'horizon' which is a chain of half edges. For an edge to belong to this group it must be the edge connecting a face that can see 'eyeVertex' and a face which cannot see 'eyeVertex'.
All the faces that can see 'eyeVertex' have its visible vertices removed from the assigned vertex list.
A new set of faces is created with each edge of the 'horizon' and 'eyeVertex'. Each face is connected with the opposite horizon face and the face on the left/right.
The vertices removed from all the visible faces are assigned to the new faces if possible.
[method:this cleanup]()
Cleans up internal properties after computing the convex hull.
[method:this compute]()
Starts the execution of the quick hull algorithm.
[method:Object computeExtremes]()
Computes the extremes values (min/max vectors) which will be used to compute the initial hull.
[method:this computeHorizon]( [param:Vector3 eyePoint], [param:HalfEdge crossEdge], [param:Face face], [param:Array horizon]	)
[page:Vector3 eyePoint] - The 3D-coordinates of a point.
[page:HalfEdge crossEdge] - The edge used to jump to the current face.
[page:Face face] - The current face being tested.
[page:Array horizon] - The edges that form part of the horizon in CCW order.
Computes a chain of half edges in CCW order called the 'horizon'. For an edge to be part of the horizon it must join a face that can see 'eyePoint' and a face that cannot see 'eyePoint'.
[method:this computeInitialHull]()
Computes the initial simplex assigning to its faces all the points that are candidates to form part of the hull.
[method:this containsPoint]( [param:Vector3 point] )
[page:Vector3 point] - A point in 3D space.
Returns `true` if the given point is inside this convex hull.
[method:this deleteFaceVertices]( [param:Face face], [param:Face absorbingFace]	)
[page:Face face] - The given face.
[page:Face absorbingFace] - An optional face that tries to absorb the vertices of the first face.
Removes all the visible vertices that 'face' is able to see.
If 'absorbingFace' doesn't exist, then all the removed vertices will be added to the 'unassigned' vertex list.
If 'absorbingFace' exists, then this method will assign all the vertices of 'face' that can see 'absorbingFace'.
If a vertex cannot see 'absorbingFace', it's added to the 'unassigned' vertex list.
[method:Vector3 intersectRay]( [param:Ray ray], [param:Vector3 target] )
[page:Ray ray] - The given ray.
[page:Vector3 target] - The target vector representing the intersection point.
Performs a ray intersection test with this convext hull. If no intersection is found, `null` is returned.
[method:Boolean intersectsRay]( [param:Ray ray] )
[page:Ray ray] - The given ray.
Returns `true` if the given ray intersects with this convex hull.
[method:this makeEmpty]()
Makes this convex hull empty.
[method:VertexNode nextVertexToAdd]()
Finds the next vertex to create faces with the current hull.
Let the initial face be the first face existing in the 'assigned' vertex list.
If a face doesn't exist then return since there're no vertices left.
Otherwise for each vertex that face sees find the one furthest away from it.
[method:this reindexFaces]()
Removes inactive (e.g. deleted) faces from the internal face list.
[method:VertexNode removeAllVerticesFromFace]( [param:Face face]	)
[page:Face face] - The given face.
Removes all the visible vertices that a given face is able to see which are stored in the 'assigned' vertex list.
[method:this removeVertexFromFace]( [param:VertexNode vertex], [param:Face face]	)
[page:VertexNode vertex] - The vertex to remove.
[page:Face face] - The target face.
Removes a vertex from the 'assigned' list of vertices and from the given face. It also makes sure that the link from 'face' to the first vertex it sees in 'assigned' is linked correctly after the removal.
[method:this resolveUnassignedPoints]( [param:Array newFaces]	)
[page:Face newFaces] - An array of new faces.
Reassigns as many vertices as possible from the unassigned list to the new faces.
[method:this setFromObject]( [param:Object3D object] )
[page:Object3D object] - [page:Object3D] to compute the convex hull of.
Computes the convex hull of an [page:Object3D] (including its children),accounting for the world transforms of both the object and its childrens.
[method:this setFromPoints]( [param:Array points] )
[page:Array points] - Array of [page:Vector3 Vector3s] that the resulting convex hull will contain.
Computes to convex hull for the given array of points.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/ConvexHull.js examples/jsm/math/ConvexHull.js]

[page:Object3D] →
[name]
The [name] represents a virtual
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioListener listener] of the all positional and non-positional audio effects in the
scene.
A three.js application usually creates a single instance of [name]. It is
a mandatory constructor parameter for audios entities like [page:Audio Audio] and [page:PositionalAudio PositionalAudio].
In most cases, the listener object is a child of the camera. So the 3D
transformation of the camera represents the 3D transformation of the
listener.
Code Example
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create a global audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
sound.setBuffer( buffer );
sound.setLoop(true);
sound.setVolume(0.5);
sound.play();
});
Examples
[example:webaudio_sandbox webaudio / sandbox ]
[example:webaudio_timing webaudio / timing ]
[example:webaudio_visualizer webaudio / visualizer ]
Constructor
[name]( )
Create a new AudioListener.
Properties
[property:AudioContext context]
The [link:https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext] of the [page:AudioListener listener] given in the
constructor.
[property:GainNode gain]
A [link:https://developer.mozilla.org/en-US/docs/Web/API/GainNode GainNode] created using
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createGain AudioContext.createGain]().
[property:AudioNode filter]
Default is `null`.
[property:Number timeDelta]
Time delta value for audio entities. Use in context of
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/linearRampToValueAtTime AudioParam.linearRampToValueAtTimeDefault](). Default is .
Methods
[method:GainNode getInput]()
Return the [page:AudioListener.gain gainNode].
[method:this removeFilter]()
Set the [page:AudioListener.filter filter] property to `null`.
[method:AudioNode getFilter]()
Returns the value of the [page:AudioListener.filter filter] property.
[method:this setFilter]( [param:AudioNode value] )
Set the [page:AudioListener.filter filter] property to `value`.
[method:Float getMasterVolume]()
Return the volume.
[method:this setMasterVolume]( [param:Number value] )
Set the volume.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
The PolarGridHelper is an object to define polar grids. Grids are
two-dimensional arrays of lines.
Code Example
const radius = 10;
const sectors = 16;
const rings = 8;
const divisions = 64;
const helper = new THREE.PolarGridHelper( radius, sectors, rings, divisions );
scene.add( helper );
Examples
[example:webgl_helpers WebGL / helpers]
Constructor
[name]( [param:Number radius], [param:Number sectors], [param:Number rings], [param:Number divisions], [param:Color color1], [param:Color color2] )
radius -- The radius of the polar grid. This can be any positive number.
Default is `10`.
sectors -- The number of sectors the grid will be divided into. This can
be any positive integer. Default is `16`.
rings -- The number of rings. This can be any positive integer. Default is
8.
divisions -- The number of line segments used for each circle. This can be
any positive integer that is 3 or greater. Default is `64`.
color1 -- The first color used for grid elements. This can be a
[page:Color], a hexadecimal value and an CSS-Color name. Default is
0x444444
color2 -- The second color used for grid elements. This can be a
[page:Color], a hexadecimal value and an CSS-Color name. Default is
0x888888
Creates a new [name] of radius 'radius' with 'sectors' number of sectors
and 'rings' number of rings, where each circle is smoothed into
'divisions' number of line segments. Colors are optional.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading a [page:Material] in JSON format. This uses the
[page:FileLoader] internally for loading files.
Code Example
// instantiate a loader
const loader = new THREE.MaterialLoader();
// load a resource
loader.load(
// resource URL
'path/to/material.json',
// onLoad callback
function ( material ) {
object.material = material;
},
// onProgress callback
function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
// onError callback
function ( err ) {
console.log( 'An error happened' );
}
);
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
[property:Object textures]
Object holding any textures used by the material. See [page:.setTextures].
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] — Will be called when load completes. The argument
will be the loaded [page:Material].
[page:Function onProgress] (optional) — Will be called while load
progresses. The argument will be the ProgressEvent instance, which
contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url.
[method:Material parse]( [param:Object json] )
[page:Object json] — The json object containing the parameters of the
Material.
Parse a `JSON` structure and create a new [page:Material] of the type
[page:String json.type] with parameters defined in the json object.
[method:this setTextures]( [param:Object textures] )
[page:Object textures] — object containing any textures used by the
material.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
Helper object to visualize a [page:Box3].
Code Example
const box = new THREE.Box3();
box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );
const helper = new THREE.Box3Helper( box, 0xffff00 );
scene.add( helper );
Constructor
[name]( [param:Box3 box], [param:Color color] )
[page:Box3 box] -- the Box3 to show.
[page:Color color] -- (optional) the box's color. Default is 0xffff00.
Creates a new wireframe box that represents the passed Box3.
Properties
See the base [page:LineSegments] class for common properties.
[property:Box3 box]
The Box3 being visualized.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined updateMatrixWorld]( [param:Boolean force] )
This overrides the method in the base [page:Object3D] class so that it
also updates the wireframe box to the extent of the [page:Box3Helper.box .box] property.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

Buffer Attribute Usage Constants
The usage constants can be used to provide a hint to the API regarding how
the geometry buffer attribute will be used in order to optimize
performance.
Code Example
const geometry = new THREE.BufferGeometry();
const positionAttribute = new THREE.BufferAttribute( array, 3 , false );
positionAttribute.setUsage( THREE.DynamicDrawUsage );
geometry.setAttribute( 'position', positionAttribute );
Examples
[example:webgl_buffergeometry_drawrange materials / buffergeometry / drawrange ]
Geometry Usage
THREE.StaticDrawUsage
THREE.DynamicDrawUsage
THREE.StreamDrawUsage
THREE.StaticReadUsage
THREE.DynamicReadUsage
THREE.StreamReadUsage
THREE.StaticCopyUsage
THREE.DynamicCopyUsage
THREE.StreamCopyUsage
For more detailed information on each of these constants see
[link:https://www.khronos.org/opengl/wiki/Buffer_Object#Buffer_Object_Usage this OpenGL documentation].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/constants.js src/constants.js]

[page:Material] →
[name]
A material that maps the normal vectors to RGB colors.
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
Properties
See the base [page:Material] class for common properties.
[property:Texture bumpMap]
The texture to create a bump map. The black and white values map to the
perceived depth in relation to the lights. Bump doesn't actually affect
the geometry of the object, only the lighting. If a normal map is defined
this will be ignored.
[property:Float bumpScale]
How much the bump map affects the material. Typical ranges are 0-1.
Default is `1`.
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Boolean flatShading]
Define whether the material is rendered with flat shading. Default is
false.
[property:Boolean fog]
Whether the material is affected by fog. Default is `false`.
[property:Texture normalMap]
The texture to create a normal map. The RGB values affect the surface
normal for each pixel fragment and change the way the color is lit. Normal
maps do not change the actual shape of the surface, only the lighting. In
case the material has a normal map authored using the left handed
convention, the y component of normalScale should be negated to compensate
for the different handedness.
[property:Integer normalMapType]
The type of normal map.
Options are [page:constant THREE.TangentSpaceNormalMap] (default), and
[page:constant THREE.ObjectSpaceNormalMap].
[property:Vector2 normalScale]
How much the normal map affects the material. Typical ranges are 0-1.
Default is a [page:Vector2] set to (1,1).
[property:Boolean wireframe]
Render geometry as wireframe. Default is false (i.e. render as smooth
shaded).
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:InterleavedBuffer] →
[name]
An instanced version of [page:InterleavedBuffer].
Constructor
[name]( [param:TypedArray array], [param:Integer itemSize], [param:Number meshPerAttribute] )
Properties
See [page:InterleavedBuffer] for inherited properties.
[property:Number meshPerAttribute]
Default is `1`.
Methods
See [page:InterleavedBuffer] for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Implementation of a [link:http://en.wikipedia.org/wiki/Quaternion quaternion].
Quaternions are used in three.js to represent
[link:https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation rotations].
Iterating through a [name] instance will yield its components (x, y, z, w)
in the corresponding order.
Note that three.js expects Quaternions to be normalized.
Code Example
const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
const vector = new THREE.Vector3( 1, 0, 0 );
vector.applyQuaternion( quaternion );
Constructor
[name]( [param:Float x], [param:Float y], [param:Float z], [param:Float w] )
[page:Float x] - x coordinate
[page:Float y] - y coordinate
[page:Float z] - z coordinate
[page:Float w] - w coordinate
Properties
[property:Boolean isQuaternion]
Read-only flag to check if a given object is of type [name].
[property:Float x]
[property:Float y]
[property:Float z]
[property:Float w]
Methods
[method:Float angleTo]( [param:Quaternion q] )
Returns the angle between this quaternion and quaternion [page:Quaternion q] in radians.
[method:Quaternion clone]()
Creates a new Quaternion with identical [page:.x x], [page:.y y], [page:.z z]
and [page:.w w] properties to this one.
[method:this conjugate]()
Returns the rotational conjugate of this quaternion. The conjugate of a
quaternion represents the same rotation in the opposite direction about
the rotational axis.
[method:this copy]( [param:Quaternion q] )
Copies the [page:.x x], [page:.y y], [page:.z z] and [page:.w w]
properties of [page:Quaternion q] into this quaternion.
[method:Boolean equals]( [param:Quaternion v] )
[page:Quaternion v] - Quaternion that this quaternion will be compared
to.
Compares the [page:.x x], [page:.y y], [page:.z z] and [page:.w w]
properties of [page:Quaternion v] to the equivalent properties of this
quaternion to determine if they represent the same rotation.
[method:Float dot]( [param:Quaternion v] )
Calculates the [link:https://en.wikipedia.org/wiki/Dot_product dot product]
of quaternions [page:Quaternion v] and this one.
[method:this fromArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - array of format (x, y, z, w) used to construct the
quaternion.
[page:Integer offset] - (optional) an offset into the array.
Sets this quaternion's [page:.x x], [page:.y y], [page:.z z] and [page:.w w]
properties from an array.
[method:this identity]()
Sets this quaternion to the identity quaternion; that is, to the
quaternion that represents "no rotation".
[method:this invert]()
Inverts this quaternion - calculates the [page:.conjugate conjugate]. The
quaternion is assumed to have unit length.
[method:Float length]()
Computes the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) of this quaternion, considered as
a 4 dimensional vector.
[method:Float lengthSq]()
Computes the squared
[link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean length]
(straight-line length) of this quaternion, considered as a 4 dimensional
vector. This can be useful if you are comparing the lengths of two
quaternions, as this is a slightly more efficient calculation than
[page:.length length]().
[method:this normalize]()
[link:https://en.wikipedia.org/wiki/Normalized_vector Normalizes] this
quaternion - that is, calculated the quaternion that performs the same
rotation as this one, but has [page:.length length] equal to `1`.
[method:this multiply]( [param:Quaternion q] )
Multiplies this quaternion by [page:Quaternion q].
[method:this multiplyQuaternions]( [param:Quaternion a], [param:Quaternion b] )
Sets this quaternion to [page:Quaternion a] x [page:Quaternion b].
Adapted from the method outlined
[link:http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.html here].
[method:this premultiply]( [param:Quaternion q] )
Pre-multiplies this quaternion by [page:Quaternion q].
[method:this random]()
Sets this quaternion to a uniformly random, normalized quaternion.
[method:this rotateTowards]( [param:Quaternion q], [param:Float step] )
[page:Quaternion q] - The target quaternion.
[page:Float step] - The angular step in radians.
Rotates this quaternion by a given angular step to the defined quaternion
*q*. The method ensures that the final quaternion will not overshoot *q*.
[method:this slerp]( [param:Quaternion qb], [param:Float t] )
[page:Quaternion qb] - The other quaternion rotation
[page:Float t] - interpolation factor in the closed interval `[0, 1]`.
Handles the spherical linear interpolation between quaternions.
[page:Float t] represents the amount of rotation between this quaternion
(where [page:Float t] is 0) and [page:Quaternion qb] (where [page:Float t]
is 1). This quaternion is set to the result. Also see the static version
of the `slerp` below.
// rotate a mesh towards a target quaternion
mesh.quaternion.slerp( endQuaternion, 0.01 );
[method:this slerpQuaternions]( [param:Quaternion qa], [param:Quaternion qb], [param:Float t] )
Performs a spherical linear interpolation between the given quaternions
and stores the result in this quaternion.
[method:this set]( [param:Float x], [param:Float y], [param:Float z], [param:Float w] )
Sets [page:.x x], [page:.y y], [page:.z z], [page:.w w] properties of this
quaternion.
[method:this setFromAxisAngle]( [param:Vector3 axis], [param:Float angle] )
Sets this quaternion from rotation specified by [page:Vector3 axis] and
[page:Float angle].
Adapted from the method
[link:http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.html here].
`Axis` is assumed to be normalized, `angle` is in radians.
[method:this setFromEuler]( [param:Euler euler] )
Sets this quaternion from the rotation specified by [page:Euler] angle.
[method:this setFromRotationMatrix]( [param:Matrix4 m] )
[page:Matrix4 m] - a [page:Matrix4] of which the upper 3x3 of matrix is a
pure [link:https://en.wikipedia.org/wiki/Rotation_matrix rotation matrix]
(i.e. unscaled).
Sets this quaternion from rotation component of [page:Matrix4 m].
Adapted from the method
[link:http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.html here].
[method:this setFromUnitVectors]( [param:Vector3 vFrom], [param:Vector3 vTo] )
Sets this quaternion to the rotation required to rotate direction vector
[page:Vector3 vFrom] to direction vector [page:Vector3 vTo].
Adapted from the method
[link:http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors here].
[page:Vector3 vFrom] and [page:Vector3 vTo] are assumed to be normalized.
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - An optional array to store the quaternion. If not
specified, a new array will be created.
[page:Integer offset] - (optional) if specified, the result will be copied
into this [page:Array].
Returns the numerical elements of this quaternion in an array of format
[x, y, z, w].
[method:Array toJSON]()
This methods defines the serialization result of [name]. Returns the
numerical elements of this quaternion in an array of format [x, y, z, w].
[method:this fromBufferAttribute]( [param:BufferAttribute attribute], [param:Integer index] )
[page:BufferAttribute attribute] - the source attribute.
[page:Integer index] - index in the attribute.
Sets [page:.x x], [page:.y y], [page:.z z], [page:.w w] properties of this
quaternion from the [page:BufferAttribute attribute].
Static Methods
[method:undefined slerpFlat]( [param:Array dst], [param:Integer dstOffset],
[param:Array src0], [param:Integer srcOffset0], [param:Array src1],
[param:Integer srcOffset1], [param:Float t] )
[page:Array dst] - The output array.
[page:Integer dstOffset] - An offset into the output array.
[page:Array src0] - The source array of the starting quaternion.
[page:Integer srcOffset0] - An offset into the array `src0`.
[page:Array src1] - The source array of the target quaternion.
[page:Integer srcOffset1] - An offset into the array `src1`.
[page:Float t] - Normalized interpolation factor (between `0` and `1`).
This SLERP implementation assumes the quaternion data are managed in flat
arrays.
[method:Array multiplyQuaternionsFlat]( [param:Array dst], [param:Integer dstOffset],
[param:Array src0], [param:Integer srcOffset0], [param:Array src1], [param:Integer srcOffset1] )
[page:Array dst] - The output array.
[page:Integer dstOffset] - An offset into the output array.
[page:Array src0] - The source array of the starting quaternion.
[page:Integer srcOffset0] - An offset into the array `src0`.
[page:Array src1] - The source array of the target quaternion.
[page:Integer srcOffset1] - An offset into the array `src1`.
This multiplication implementation assumes the quaternion data are managed
in flat arrays.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
Create a non-positional ( global ) audio object.
This uses the
[link:https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API Web Audio API].
Code Example
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create a global audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
sound.setBuffer( buffer );
sound.setLoop( true );
sound.setVolume( 0.5 );
sound.play();
});
Examples
[example:webaudio_sandbox webaudio / sandbox ]
[example:webaudio_visualizer webaudio / visualizer ]
Constructor
[name]( [param:AudioListener listener] )
listener — (required) [page:AudioListener AudioListener] instance.
Properties
[property:Boolean autoplay]
Whether to start playback automatically. Default is `false`.
[property:AudioContext context]
The [link:https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext] of the [page:AudioListener listener] given in the
constructor.
[property:Number detune]
Modify pitch, measured in cents. +/- 100 is a semitone. +/- 1200 is an
octave. Default is `0`.
[property:Array filters]
Represents an array of
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNodes]. Can be used to apply a variety of low-order filters to create
more complex sound effects. In most cases, the array contains instances of
[link:https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode BiquadFilterNodes]. Filters are set via [page:Audio.setFilter] or
[page:Audio.setFilters].
[property:GainNode gain]
A [link:https://developer.mozilla.org/en-US/docs/Web/API/GainNode GainNode] created using
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createGain AudioContext.createGain]().
[property:Boolean hasPlaybackControl]
Whether playback can be controlled using the [page:Audio.play play](),
[page:Audio.pause pause]() etc. methods. Default is `true`.
[property:Boolean isPlaying]
Whether the audio is currently playing.
[property:AudioListener listener]
A reference to the listener object of this audio.
[property:Number playbackRate]
Speed of playback. Default is `1`.
[property:Number offset]
An offset to the time within the audio buffer that playback should begin.
Same as the `offset` parameter of
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start AudioBufferSourceNode.start](). Default is `0`.
[property:Number duration]
Overrides the duration of the audio. Same as the `duration` parameter of
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start AudioBufferSourceNode.start](). Default is `undefined` to play the whole
buffer.
[property:AudioNode source]
An
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode AudioBufferSourceNode] created using
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createBufferSource AudioContext.createBufferSource]().
[property:String sourceType]
Type of the audio source. Default is string 'empty'.
[property:String type]
String denoting the type, set to 'Audio'.
Methods
[method:this connect]()
Connect to the [page:Audio.source]. This is used internally on
initialisation and when setting / removing filters.
[method:this disconnect]()
Disconnect from the [page:Audio.source]. This is used internally when
setting / removing filters.
[method:Float getDetune]()
Returns the detuning of oscillation in cents.
[method:BiquadFilterNode getFilter]()
Returns the first element of the [page:Audio.filters filters] array.
[method:Array getFilters]()
Returns the [page:Audio.filters filters] array.
[method:Boolean getLoop]()
Return the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop source.loop] (whether playback should loop).
[method:GainNode getOutput]()
Return the [page:Audio.gain gainNode].
[method:Float getPlaybackRate]()
Return the value of [page:Audio.playbackRate playbackRate].
[method:Float getVolume]( value )
Return the current volume.
[method:this play]( delay )
If [page:Audio.hasPlaybackControl hasPlaybackControl] is true, starts
playback.
[method:this pause]()
If [page:Audio.hasPlaybackControl hasPlaybackControl] is true, pauses
playback.
[method:undefined onEnded]()
Called automatically when playback finished.
[method:this setBuffer]( audioBuffer )
Setup the [page:Audio.source source] to the audioBuffer, and sets
[page:Audio.sourceType sourceType] to 'buffer'.
If [page:Audio.autoplay autoplay], also starts playback.
[method:this setDetune]( [param:Float value] )
Defines the detuning of oscillation in cents.
[method:this setFilter]( filter )
Applies a single filter node to the audio.
[method:this setFilters]( [param:Array value] )
value - arrays of filters.
Applies an array of filter nodes to the audio.
[method:this setLoop]( [param:Boolean value] )
Set
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop source.loop] to `value` (whether playback should loop).
[method:this setLoopStart]( [param:Float value] )
Set
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopStart source.loopStart] to `value`.
[method:this setLoopEnd]( [param:Float value] )
Set
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopEnd source.loopEnd] to `value`.
[method:this setMediaElementSource]( mediaElement )
Applies the given object of type
[link:https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement HTMLMediaElement] as the source of this audio.
Also sets [page:Audio.hasPlaybackControl hasPlaybackControl] to false.
[method:this setMediaStreamSource]( mediaStream )
Applies the given object of type
[link:https://developer.mozilla.org/en-US/docs/Web/API/MediaStream MediaStream] as the source of this audio.
Also sets [page:Audio.hasPlaybackControl hasPlaybackControl] to false.
[method:this setNodeSource]( audioNode )
Setup the [page:Audio.source source] to the audioBuffer, and sets
[page:Audio.sourceType sourceType] to 'audioNode'.
Also sets [page:Audio.hasPlaybackControl hasPlaybackControl] to false.
[method:this setPlaybackRate]( [param:Float value] )
If [page:Audio.hasPlaybackControl hasPlaybackControl] is enabled, set the
[page:Audio.playbackRate playbackRate] to `value`.
[method:this setVolume]( [param:Float value] )
Set the volume.
[method:this stop]()
If [page:Audio.hasPlaybackControl hasPlaybackControl] is enabled, stops
playback.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
A sprite is a plane that always faces towards the camera, generally with a
partially transparent texture applied.
Sprites do not cast shadows, setting
castShadow = true
will
have no effect.
Code Example
const map = new THREE.TextureLoader().load( 'sprite.png' );
const material = new THREE.SpriteMaterial( { map: map } );
const sprite = new THREE.Sprite( material );
scene.add( sprite );
Constructor
[name]( [param:Material material] )
[page:Material material] - (optional) an instance of
[page:SpriteMaterial]. Default is a white [page:SpriteMaterial].
Creates a new [name].
Properties
See the base [page:Object3D] class for common properties.
[property:Boolean isSprite]
Read-only flag to check if a given object is of type [name].
[property:SpriteMaterial material]
An instance of [page:SpriteMaterial], defining the object's appearance.
Default is a white [page:SpriteMaterial].
[property:Vector2 center]
The sprite's anchor point, and the point around which the sprite rotates.
A value of (0.5, 0.5) corresponds to the midpoint of the sprite. A value
of (0, 0) corresponds to the lower left corner of the sprite. The default
is (0.5, 0.5).
Methods
See the base [page:Object3D] class for common methods.
[method:Sprite clone]()
Returns a clone of this Sprite object and any descendants.
[method:this copy]( [param:Sprite sprite] )
Copies the properties of the passed sprite to this one.
[method:undefined raycast]( [param:Raycaster raycaster], [param:Array intersects] )
Get intersections between a casted ray and this sprite.
[page:Raycaster.intersectObject]() will call this method. The raycaster
must be initialized by calling [page:Raycaster.setFromCamera]() before
raycasting against sprites.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
Class for loading a [page:Texture texture]. This uses the
[page:ImageLoader] internally for loading files.
Code Example
const texture = new THREE.TextureLoader().load('textures/land_ocean_ice_cloud_2048.jpg' );
// immediately use the texture for material creation
const material = new THREE.MeshBasicMaterial( { map:texture } );
Code Example with Callbacks
// instantiate a loader
const loader = new THREE.TextureLoader();
// load a resource
loader.load(
// resource URL
'textures/land_ocean_ice_cloud_2048.jpg',
// onLoad callback
function ( texture ) {
// in this example we create the material when the texture is loaded
const material = new THREE.MeshBasicMaterial( {
map: texture
} );
},
// onProgress callback currently not supported
undefined,
// onError callback
function ( err ) {
console.error( 'An error happened.' );
}
);
Please note three.js r84 dropped support for TextureLoader progress
events. For a TextureLoader that supports progress events, see
[link:https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145 this thread].
Examples
[example:webgl_geometry_cube geometry / cube]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:Texture load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] (optional) — Will be called when load completes.
The argument will be the loaded [page:Texture texture].
[page:Function onProgress] (optional) — This callback function is
currently not supported.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from the given URL and pass the fully loaded [page:Texture texture]
to onLoad. The method also returns a new texture object which can
directly be used for material creation. If you do it this way, the texture
may pop up in your scene once the respective loading process is finished.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
An object with several math utility functions.
Functions
[method:Float clamp]( [param:Float value], [param:Float min], [param:Float max] )
[page:Float value] — Value to be clamped.
[page:Float min] — Minimum value.
[page:Float max] — Maximum value.
Clamps the [page:Float value] to be between [page:Float min] and
[page:Float max].
[method:Float degToRad]( [param:Float degrees] )
Converts degrees to radians.
[method:Integer euclideanModulo]( [param:Integer n], [param:Integer m] )
[page:Integer n], [page:Integer m] - Integers
Computes the Euclidean modulo of [page:Integer m] % [page:Integer n], that
is:
( ( n % m ) + m ) % m
[method:UUID generateUUID]( )
Generate a
[link:https://en.wikipedia.org/wiki/Universally_unique_identifier UUID]
(universally unique identifier).
[method:Boolean isPowerOfTwo]( [param:Number n] )
Return `true` if [page:Number n] is a power of 2.
[method:Float inverseLerp]( [param:Float x], [param:Float y], [param:Float value] )
[page:Float x] - Start point.
[page:Float y] - End point.
[page:Float value] - A value between start and end.
Returns the percentage in the closed interval `[0, 1]` of the given value
between the start and end point.
[method:Float lerp]( [param:Float x], [param:Float y], [param:Float t] )
[page:Float x] - Start point.
[page:Float y] - End point.
[page:Float t] - interpolation factor in the closed interval `[0, 1]`.
Returns a value [link:https://en.wikipedia.org/wiki/Linear_interpolation linearly interpolated]
from two known points based on the given interval -
[page:Float t] = 0 will return [page:Float x] and [page:Float t] = 1 will
return [page:Float y].
[method:Float damp]( [param:Float x], [param:Float y], [param:Float lambda], [param:Float dt] )
[page:Float x] - Current point.
[page:Float y] - Target point.
[page:Float lambda] - A higher lambda value will make the movement more
sudden, and a lower value will make the movement more gradual.
[page:Float dt] - Delta time in seconds.
Smoothly interpolate a number from [page:Float x] toward [page:Float y] in
a spring-like manner using the [page:Float dt] to maintain frame rate
independent movement. For details, see
[link:http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/ Frame rate independent damping using lerp].
[method:Float mapLinear]( [param:Float x], [param:Float a1], [param:Float a2], [param:Float b1], [param:Float b2] )
[page:Float x] — Value to be mapped.
[page:Float a1] — Minimum value for range A.
[page:Float a2] — Maximum value for range A.
[page:Float b1] — Minimum value for range B.
[page:Float b2] — Maximum value for range B.
Linear mapping of [page:Float x] from range [[page:Float a1], [page:Float a2]] to range [[page:Float b1], [page:Float b2]].
[method:Float pingpong]( [param:Float x], [param:Float length] )
[page:Float x] — The value to pingpong.
[page:Float length] — The positive value the function will pingpong to.
Default is `1`.
Returns a value that alternates between `0` and [param:Float length].
[method:Integer ceilPowerOfTwo]( [param:Number n] )
Returns the smallest power of 2 that is greater than or equal to
[page:Number n].
[method:Integer floorPowerOfTwo]( [param:Number n] )
Returns the largest power of `2` that is less than or equal to [page:Number n].
[method:Float radToDeg]( [param:Float radians] )
Converts radians to degrees.
[method:Float randFloat]( [param:Float low], [param:Float high] )
Random float in the interval [[page:Float low], [page:Float high]].
[method:Float randFloatSpread]( [param:Float range] )
Random float in the interval [- [page:Float range] / 2, [page:Float range]
/ 2].
[method:Integer randInt]( [param:Integer low], [param:Integer high] )
Random integer in the interval [[page:Float low], [page:Float high]].
[method:Float seededRandom]( [param:Integer seed] )
Deterministic pseudo-random float in the interval `[0, 1]`. The integer
[page:Integer seed] is optional.
[method:Float smoothstep]( [param:Float x], [param:Float min], [param:Float max] )
[page:Float x] - The value to evaluate based on its position between min
and max.
[page:Float min] - Any x value below min will be `0`.
[page:Float max] - Any x value above max will be `1`.
Returns a value between 0-1 that represents the percentage that x has
moved between min and max, but smoothed or slowed down the closer X is to
the min and max.
See [link:http://en.wikipedia.org/wiki/Smoothstep Smoothstep] for details.
[method:Float smootherstep]( [param:Float x], [param:Float min], [param:Float max] )
[page:Float x] - The value to evaluate based on its position between min
and max.
[page:Float min] - Any x value below min will be `0`.
[page:Float max] - Any x value above max will be `1`.
Returns a value between 0-1. A
[link:https://en.wikipedia.org/wiki/Smoothstep#Variations variation on smoothstep]
that has zero 1st and 2nd order derivatives at x=0 and x=1.
[method:undefined setQuaternionFromProperEuler]( [param:Quaternion q], [param:Float a], [param:Float b], [param:Float c], [param:String order] )
[page:Quaternion q] - the quaternion to be set
[page:Float a] - the rotation applied to the first axis, in radians
[page:Float b] - the rotation applied to the second axis, in radians
[page:Float c] - the rotation applied to the third axis, in radians
[page:String order] - a string specifying the axes order: 'XYX', 'XZX',
'YXY', 'YZY', 'ZXZ', or 'ZYZ'
Sets quaternion [page:Quaternion q] from the
[link:http://en.wikipedia.org/wiki/Euler_angles intrinsic Proper Euler Angles]
defined by angles [page:Float a], [page:Float b], and [page:Float c],
and order [page:String order].
Rotations are applied to the axes in the order specified by [page:String order]:
rotation by angle [page:Float a] is applied first, then by angle
[page:Float b], then by angle [page:Float c]. Angles are in radians.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] →
[name]
Creates a visual aid for a [page:RectAreaLight].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
Code Example
const light = new THREE.RectAreaLight( 0xffffbb, 1.0, 5, 5 );
const helper = new RectAreaLightHelper( light );
light.add( helper ); // helper must be added as a child of the light
Constructor
[name]( [param:RectAreaLight light], [param:Hex color] )
[page:RectAreaLight light] -- The light being visualized.
[page:Hex color] -- (optional) if this is not the set the helper will take the color of the light.
Properties
See the base [page:Object3D] class for common properties.
[property:RectAreaLight light]
Reference to the RectAreaLight being visualized.
[property:hex color]
The color parameter passed in the constructor. Default is `undefined`. If this is changed, the helper's color will update
the next time [page:.update update] is called.
Methods
See the base [page:Line] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/RectAreaLightHelper.js examples/jsm/helpers/RectAreaLightHelper.js]

[page:Material] →
[name]
A material for non-shiny surfaces, without specular highlights.
The material uses a non-physically based
[link:https://en.wikipedia.org/wiki/Lambertian_reflectance Lambertian]
model for calculating reflectance. This can simulate some surfaces (such
as untreated wood or stone) well, but cannot simulate shiny surfaces with
specular highlights (such as varnished wood). [name] uses per-fragment
shading.
Due to the simplicity of the reflectance and illumination models,
performance will be greater when using this material over the
[page:MeshPhongMaterial], [page:MeshStandardMaterial] or
[page:MeshPhysicalMaterial], at the cost of some graphical accuracy.
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Texture aoMap]
The red channel of this texture is used as the ambient occlusion map.
Default is null. The aoMap requires a second set of UVs.
[property:Float aoMapIntensity]
Intensity of the ambient occlusion effect. Default is `1`. Zero is no
occlusion effect.
[property:Texture bumpMap]
The texture to create a bump map. The black and white values map to the
perceived depth in relation to the lights. Bump doesn't actually affect
the geometry of the object, only the lighting. If a normal map is defined
this will be ignored.
[property:Float bumpScale]
How much the bump map affects the material. Typical ranges are 0-1.
Default is 1.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Integer combine]
How to combine the result of the surface's color with the environment map,
if any.
Options are [page:Materials THREE.MultiplyOperation] (default),
[page:Materials THREE.MixOperation], [page:Materials THREE.AddOperation].
If mix is chosen, the [page:.reflectivity] is used to blend between the
two colors.
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Color emissive]
Emissive (light) color of the material, essentially a solid color
unaffected by other lighting. Default is black.
[property:Texture emissiveMap]
Set emissive (glow) map. Default is null. The emissive map color is
modulated by the emissive color and the emissive intensity. If you have an
emissive map, be sure to set the emissive color to something other than
black.
[property:Float emissiveIntensity]
Intensity of the emissive light. Modulates the emissive color. Default is
1.
[property:Texture envMap]
The environment map. Default is null.
[property:Euler envMapRotation]
The rotation of the environment map in radians. Default is `(0,0,0)`.
[property:Boolean flatShading]
Define whether the material is rendered with flat shading. Default is
false.
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Texture lightMap]
The light map. Default is null. The lightMap requires a second set of UVs.
[property:Float lightMapIntensity]
Intensity of the baked light. Default is `1`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null.
[property:Texture normalMap]
The texture to create a normal map. The RGB values affect the surface
normal for each pixel fragment and change the way the color is lit. Normal
maps do not change the actual shape of the surface, only the lighting. In
case the material has a normal map authored using the left handed
convention, the y component of normalScale should be negated to compensate
for the different handedness.
[property:Integer normalMapType]
The type of normal map.
Options are [page:constant THREE.TangentSpaceNormalMap] (default), and
[page:constant THREE.ObjectSpaceNormalMap].
[property:Vector2 normalScale]
How much the normal map affects the material. Typical ranges are 0-1.
Default is a [page:Vector2] set to (1,1).
[property:Float reflectivity]
How much the environment map affects the surface; also see
[page:.combine].
[property:Float refractionRatio]
The index of refraction (IOR) of air (approximately 1) divided by the
index of refraction of the material. It is used with environment mapping
modes [page:Textures THREE.CubeRefractionMapping] and [page:Textures THREE.EquirectangularRefractionMapping].
The refraction ratio should not
exceed `1`. Default is `0.98`.
[property:Texture specularMap]
Specular map used by the material. Default is null.
[property:Boolean wireframe]
Render geometry as wireframe. Default is `false` (i.e. render as flat
polygons).
[property:String wireframeLinecap]
Define appearance of line ends. Possible values are "butt", "round" and
"square". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:String wireframeLinejoin]
Define appearance of line joints. Possible values are "round", "bevel" and
"miter". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading a `.pdb` resource.
The [link:http://en.wikipedia.org/wiki/Protein_Data_Bank_(file_format) Protein Data Bank] file format is a textual file describing the three-dimensional structures of molecules.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';
Code Example
// instantiate a loader
const loader = new PDBLoader();
// load a PDB resource
loader.load(
// resource URL
'models/pdb/caffeine.pdb',
// called when the resource is loaded
function ( pdb ) {
const geometryAtoms = pdb.geometryAtoms;
const geometryBonds = pdb.geometryBonds;
const json = pdb.json;
console.log( 'This molecule has ' + json.atoms.length + ' atoms' );
},
// called when loading is in progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_pdb]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.pdb` file.
[page:Function onLoad] — (optional) A function to be called after loading is successfully completed. The function receives the object having the following properties. [page:BufferGeometry geometryAtoms], [page:BufferGeometry geometryBonds] and the [page:Object JSON] structure.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains [page:Integer total] and [page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.
Begin loading from url and call onLoad with the parsed response content.
[method:Object parse]( [param:String text] )
[page:String text] — The textual `pdb` structure to parse.
Parse a `pdb` text and return a `JSON` structure.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/PDBLoader.js examples/jsm/loaders/PDBLoader.js]

[page:BufferGeometry] → [page:PolyhedronGeometry]
[name]
A class for generating a dodecahedron geometries.
Constructor
[name]([param:Float radius], [param:Integer detail])
radius — Radius of the dodecahedron. Default is `1`.
detail — Default is `0`. Setting this to a value greater than `0` adds
vertices making it no longer a dodecahedron.
Properties
See the base [page:PolyhedronGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:PolyhedronGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A Physics handler for
`MMD`
resources.
[name] calculates Physics for model loaded by [page:MMDLoader] with [link:https://github.com/kripken/ammo.js/ ammo.js] (Bullet-based JavaScript Physics engine).
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { MMDPhysics } from 'three/addons/animation/MMDPhysics.js';
Code Example
let physics;
// Load MMD resources and instantiate MMDPhysics
new MMDLoader().load(
'models/mmd/miku.pmd',
function ( mesh ) {
physics = new MMDPhysics( mesh )
scene.add( mesh );
}
);
function render() {
const delta = clock.getDelta();
animate( delta );
// update bones
if ( physics !== undefined ) physics.update( delta );
renderer.render( scene, camera );
}
Examples
[example:webgl_loader_mmd]
[example:webgl_loader_mmd_audio]
Constructor
[name]( [param:SkinnedMesh mesh], [param:Array rigidBodyParams], [param:Array constraintParams], [param:Object params] )
[page:SkinnedMesh mesh] — [page:SkinnedMesh] for which [name] calculates Physics.
[page:Array rigidBodyParams] — An array of [page:Object] specifying Rigid Body parameters.
[page:Array constraintParams] — (optional) An array of [page:Object] specifying Constraint parameters.
[page:Object params] — (optional)
[page:Number unitStep] - Default is 1 / 65.
[page:Integer maxStepNum] - Default is 3.
[page:Vector3 gravity] - Default is ( 0, - 9.8 * 10, 0 )
Creates a new [name].
Properties
[property:Array mesh]
[page:SkinnedMesh] passed to the constructor.
Methods
[method:MMDPhysicsHelper createHelper]()
Return [page:MMDPhysicsHelper]. You can visualize Rigid bodies by adding the helper to scene.
[method:this reset]()
Resets Rigid bodies transform to current bone's.
[method:this setGravity]( [param:Vector3 gravity] )
[page:Vector3 gravity] — Direction and volume of gravity.
Set gravity.
[method:this update]( [param:Number delta] )
[page:Number delta] — Time in second.
Advance Physics calculation and updates bones.
[method:this warmup]( [param:Integer cycles] )
[page:Number delta] — Time in second.
Warm up Rigid bodies. Calculates cycles steps.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/animation/MMDPhysics.js examples/jsm/animation/MMDPhysics.js]

[name]
A global instance of the [page:LoadingManager LoadingManager], used by
most loaders when no custom manager has been specified.
This will be sufficient for most purposes, however there may be times when
you desire separate loading managers for say, textures and models.
Code Example
You can optionally set the [page:LoadingManager.onStart onStart],
[page:LoadingManager.onLoad onLoad], [page:LoadingManager.onProgress onProgress],
[page:LoadingManager.onStart onError] functions for the
manager. These will then apply to any loaders using the
DefaultLoadingManager.
Note that these shouldn't be confused with the similarly named functions
of individual loaders, as they are intended for displaying information
about the overall status of loading, rather than dealing with the data
that has been loaded.
THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
THREE.DefaultLoadingManager.onLoad = function ( ) {
console.log( 'Loading Complete!');
};
THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
THREE.DefaultLoadingManager.onError = function ( url ) {
console.log( 'There was an error loading ' + url );
};
Properties
See the [page:LoadingManager LoadingManager] page for details of
properties.
Methods
See the [page:LoadingManager LoadingManager] page for details of methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/loaders/LoadingManager.js src/loaders/LoadingManager.js]

[name]
Represents a section bounded by a specific amount of half-edges. The current implementation
assumes that a face always consist of three edges.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { Face } from 'three/addons/math/ConvexHull.js';
Constructor
[name]()
Creates a new instance of [name].
Properties
[property:Vector3 normal]
The normal vector of the face. Default is a [page:Vector3] at (0, 0, 0).
[property:Vector3 midpoint]
The midpoint or centroid of the face. Default is a [page:Vector3] at (0, 0, 0).
[property:Float area]
The area of the face. Default is 0.
[property:Float constant]
Signed distance from face to the origin. Default is 0.
[property:VertexNode outside]
Reference to a vertex in a vertex list this face can see. Default is null.
[property:Integer mark]
Marks if a face is visible or deleted. Default is 'Visible'.
[property:HalfEdge edge]
Reference to the base edge of a face. To retrieve all edges, you can use the 'next' reference of the current edge. Default is null.
Methods
[method:Face create]( [param:VertexNode a], [param:VertexNode b], [param:VertexNode c] )
[page:VertexNode a] - First vertex of the face.
[page:VertexNode b] - Second vertex of the face.
[page:VertexNode c] - Third vertex of the face.
Creates a face.
[method:HalfEdge getEdge]( [param:Integer i] )
[page:Integer i] - The index of the edge.
Returns an edge by the given index.
[method:this compute] ()
Computes all properties of the face.
[method:Float distanceToPoint]( [param:Vector3 point] )
[page:Vector3 point] - Any point in 3D space.
Returns the signed distance from a given point to the plane representation of this face.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/ConvexHull.js examples/jsm/math/ConvexHull.js]

[page:BufferGeometry] → [page:LatheGeometry] →
[name]
[name] is a geometry class for a capsule with given radii and height. It
is constructed using a lathe.
Code Example
const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const capsule = new THREE.Mesh( geometry, material ); scene.add( capsule );
Constructor
[name]([param:Float radius], [param:Float length], [param:Integer capSegments], [param:Integer radialSegments])
radius — Radius of the capsule. Optional; defaults to `1`.
length — Length of the middle section. Optional; defaults to `1`.
capSegments — Number of curve segments used to build the caps. Optional;
defaults to `4`.
radialSegments — Number of segmented faces around the circumference of the
capsule. Optional; defaults to `8`.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Camera] →
[name]
Camera that uses
[link:https://en.wikipedia.org/wiki/Perspective_(graphical) perspective projection].
This projection mode is designed to mimic the way the human eye sees. It
is the most common projection mode used for rendering a 3D scene.
Code Example
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
scene.add( camera );
Examples
[example:webgl_animation_skinning_blending animation / skinning / blending]
[example:webgl_animation_skinning_morph animation / skinning / morph ]
[example:webgl_effects_stereo effects / stereo ]
[example:webgl_interactive_cubes interactive / cubes ]
[example:webgl_loader_collada_skinning loader / collada / skinning ]
Constructor
[name]( [param:Number fov], [param:Number aspect], [param:Number near], [param:Number far] )
fov — Camera frustum vertical field of view.
aspect — Camera frustum aspect ratio.
near — Camera frustum near plane.
far — Camera frustum far plane.
Together these define the camera's
[link:https://en.wikipedia.org/wiki/Viewing_frustum viewing frustum].
Properties
See the base [page:Camera] class for common properties.
Note that after making changes to most of these properties you will have
to call [page:PerspectiveCamera.updateProjectionMatrix .updateProjectionMatrix] for the changes to take effect.
[property:Float aspect]
Camera frustum aspect ratio, usually the canvas width / canvas height.
Default is `1` (square canvas).
[property:Float far]
Camera frustum far plane. Default is `2000`.
Must be greater than the current value of [page:.near near] plane.
[property:Float filmGauge]
Film size used for the larger axis. Default is `35` (millimeters). This
parameter does not influence the projection matrix unless .filmOffset is
set to a nonzero value.
[property:Float filmOffset]
Horizontal off-center offset in the same unit as `.filmGauge`. Default is
`0`.
[property:Float focus]
Object distance used for stereoscopy and depth-of-field effects. This
parameter does not influence the projection matrix unless a
[page:StereoCamera] is being used. Default is `10`.
[property:Float fov]
Camera frustum vertical field of view, from bottom to top of view, in
degrees. Default is `50`.
[property:Boolean isPerspectiveCamera]
Read-only flag to check if a given object is of type [name].
[property:Float near]
Camera frustum near plane. Default is `0.1`.
The valid range is greater than `0` and less than the current value of the
[page:.far far] plane. Note that, unlike for the
[page:OrthographicCamera], `0` is
not
a valid value for a
PerspectiveCamera's near plane.
[property:Object view]
Frustum window specification or null. This is set using the
[page:PerspectiveCamera.setViewOffset .setViewOffset] method and cleared
using [page:PerspectiveCamera.clearViewOffset .clearViewOffset].
[property:number zoom]
Gets or sets the zoom factor of the camera. Default is `1`.
Methods
See the base [page:Camera] class for common methods.
[method:undefined clearViewOffset]()
Removes any offset set by the [page:PerspectiveCamera.setViewOffset .setViewOffset] method.
[method:Float getEffectiveFOV]()
Returns the current vertical field of view angle in degrees considering .zoom.
[method:Float getFilmHeight]()
Returns the height of the image on the film. If .aspect is less than or
equal to one (portrait format), the result equals .filmGauge.
[method:Float getFilmWidth]()
Returns the width of the image on the film. If .aspect is greater than or
equal to one (landscape format), the result equals .filmGauge.
[method:Float getFocalLength]()
Returns the focal length of the current .fov in respect to .filmGauge.
[method:undefined setFocalLength]( [param:Float focalLength] )
Sets the FOV by focal length in respect to the current
[page:PerspectiveCamera.filmGauge .filmGauge].
By default, the focal length is specified for a 35mm (full frame) camera.
[method:undefined getViewBounds]( [param:Float distance], [param:Vector2 minTarget], [param:Vector2 maxTarget] )
Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
[method:Vector2 getViewSize]( [param:Float distance], [param:Vector2 target] )
Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
Copies the result into the target Vector2, where x is width and y is height.
[method:undefined setViewOffset]( [param:Float fullWidth], [param:Float fullHeight], [param:Float x], [param:Float y], [param:Float width], [param:Float height] )
fullWidth — full width of multiview setup
fullHeight — full height of multiview setup
x — horizontal offset of subcamera
y — vertical offset of subcamera
width — width of subcamera
height — height of subcamera
Sets an offset in a larger frustum. This is useful for multi-window or
multi-monitor/multi-machine setups.
For example, if you have 3x2 monitors and each monitor is 1920x1080 and
the monitors are in grid like this:
+---+---+---+
| A | B | C |
+---+---+---+
| D | E | F |
+---+---+---+
then for each monitor you would call it like this:
const w = 1920;
const h = 1080;
const fullWidth = w * 3;
const fullHeight = h * 2;
// A
camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
// B
camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
// C
camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
// D
camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
// E
camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
// F
camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
Note there is no reason monitors have to be the same size or in a grid.
[method:undefined updateProjectionMatrix]()
Updates the camera projection matrix. Must be called after any change of
parameters.
[method:Object toJSON]([param:Object meta])
meta -- object containing metadata such as textures or images in objects'
descendants.
Convert the camera to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A two dimensional surface that extends infinitely in 3d space, represented
in [link:http://mathworld.wolfram.com/HessianNormalForm.html Hessian normal form]
by a unit length normal vector and a constant.
Constructor
[name]( [param:Vector3 normal], [param:Float constant] )
[page:Vector3 normal] - (optional) a unit length [page:Vector3] defining
the normal of the plane. Default is `(1, 0, 0)`.
[page:Float constant] - (optional) the signed distance from the origin to
the plane. Default is `0`.
Properties
[property:Boolean isPlane]
Read-only flag to check if a given object is of type [name].
[property:Vector3 normal]
[property:Float constant]
Methods
[method:this applyMatrix4]( [param:Matrix4 matrix], [param:Matrix3 optionalNormalMatrix] )
[page:Matrix4 matrix] - the [Page:Matrix4] to apply.
[page:Matrix3 optionalNormalMatrix] - (optional) pre-computed normal
[Page:Matrix3] of the Matrix4 being applied.
Apply a Matrix4 to the plane. The matrix must be an affine, homogeneous
transform.
If supplying an [page:Matrix3 optionalNormalMatrix], it can be created
like so:
const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
[method:Plane clone]()
Returns a new plane with the same [page:.normal normal] and
[page:.constant constant] as this one.
[method:Vector3 coplanarPoint]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns a [page:Vector3] coplanar to the plane, by calculating the
projection of the normal vector at the origin onto the plane.
[method:this copy]( [param:Plane plane] )
Copies the values of the passed plane's [page:.normal normal] and
[page:.constant constant] properties to this plane.
[method:Float distanceToPoint]( [param:Vector3 point] )
Returns the signed distance from the [page:Vector3 point] to the plane.
[method:Float distanceToSphere]( [param:Sphere sphere] )
Returns the signed distance from the [page:Sphere sphere] to the plane.
[method:Boolean equals]( [param:Plane plane] )
Checks to see if two planes are equal (their [page:.normal normal] and
[page:.constant constant] properties match).
[method:Vector3 intersectLine]( [param:Line3 line], [param:Vector3 target] )
[page:Line3 line] - the [page:Line3] to check for intersection.
[page:Vector3 target] — the result will be copied into this Vector3.
Returns the intersection point of the passed line and the plane. Returns
null if the line does not intersect. Returns the line's starting point if
the line is coplanar with the plane.
[method:Boolean intersectsBox]( [param:Box3 box] )
[page:Box3 box] - the [page:Box3] to check for intersection.
Determines whether or not this plane intersects [page:Box3 box].
[method:Boolean intersectsLine]( [param:Line3 line] )
[page:Line3 line] - the [page:Line3] to check for intersection.
Tests whether a line segment intersects with (passes through) the plane.
[method:Boolean intersectsSphere]( [param:Sphere sphere] )
[page:Sphere sphere] - the [page:Sphere] to check for intersection.
Determines whether or not this plane intersects [page:Sphere sphere].
[method:this negate]()
Negates both the normal vector and the constant.
[method:this normalize]()
Normalizes the [page:.normal normal] vector, and adjusts the
[page:.constant constant] value accordingly.
[method:Vector3 projectPoint]( [param:Vector3 point], [param:Vector3 target] )
[page:Vector3 point] - the [page:Vector3] to project onto the plane.
[page:Vector3 target] — the result will be copied into this Vector3.
Projects a [page:Vector3 point] onto the plane.
[method:this set]( [param:Vector3 normal], [param:Float constant] )
[page:Vector3 normal] - a unit length [page:Vector3] defining the normal
of the plane.
[page:Float constant] - the signed distance from the origin to the plane.
Default is `0`.
Sets this plane's [page:.normal normal] and [page:.constant constant]
properties by copying the values from the given normal.
[method:this setComponents]( [param:Float x], [param:Float y], [param:Float z], [param:Float w] )
[page:Float x] - x value of the unit length normal vector.
[page:Float y] - y value of the unit length normal vector.
[page:Float z] - z value of the unit length normal vector.
[page:Float w] - the value of the plane's [page:.constant constant]
property.
Set the individual components that define the plane.
[method:this setFromCoplanarPoints]( [param:Vector3 a], [param:Vector3 b], [param:Vector3 c] )
[page:Vector3 a] - first point on the plane.
[page:Vector3 b] - second point on the plane.
[page:Vector3 c] - third point on the plane.
Defines the plane based on the 3 provided points. The winding order is
assumed to be counter-clockwise, and determines the direction of the
[page:.normal normal].
[method:this setFromNormalAndCoplanarPoint]( [param:Vector3 normal], [param:Vector3 point] )
[page:Vector3 normal] - a unit length [page:Vector3] defining the normal
of the plane.
[page:Vector3 point] - [page:Vector3]
Sets the plane's properties as defined by a [page:Vector3 normal] and an
arbitrary coplanar [page:Vector3 point].
[method:this translate]( [param:Vector3 offset] )
[page:Vector3 offset] - the amount to move the plane by.
Translates the plane by the distance defined by the [page:Vector3 offset]
vector. Note that this only affects the plane constant and will not affect
the normal vector.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A sphere defined by a center and radius.
Constructor
[name]( [param:Vector3 center], [param:Float radius] )
[page:Vector3 center] - center of the sphere. Default is a [page:Vector3]
at `(0, 0, 0)`.
[page:Float radius] - radius of the sphere. Default is `-1`.
Creates a new [name].
Properties
[property:Vector3 center]
A [page:Vector3] defining the center of the sphere. Default is `(0, 0,
0)`.
[property:Boolean isSphere]
Read-only flag to check if a given object is of type [name].
[property:Float radius]
The radius of the sphere. Default is -1.
Methods
[method:this applyMatrix4]( [param:Matrix4 matrix] )
[page:Matrix4 matrix] - the [Page:Matrix4] to apply
Transforms this sphere with the provided [page:Matrix4].
[method:Vector3 clampPoint]( [param:Vector3 point], [param:Vector3 target] )
[page:Vector3 point] - [page:Vector3] The point to clamp.
[page:Vector3 target] — the result will be copied into this Vector3.
Clamps a point within the sphere. If the point is outside the sphere, it
will clamp it to the closest point on the edge of the sphere. Points
already inside the sphere will not be affected.
[method:Sphere clone]()
Returns a new sphere with the same [page:.center center] and [page:.radius radius] as this one.
[method:Boolean containsPoint]( [param:Vector3 point] )
[page:Vector3 point] - the [page:Vector3] to be checked
Checks to see if the sphere contains the provided [page:Vector3 point]
inclusive of the surface of the sphere.
[method:this copy]( [param:Sphere sphere] )
Copies the values of the passed sphere's [page:.center center] and
[page:.radius radius] properties to this sphere.
[method:Float distanceToPoint]( [param:Vector3 point] )
Returns the closest distance from the boundary of the sphere to the
[page:Vector3 point]. If the sphere contains the point, the distance will
be negative.
[method:this expandByPoint]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] that should be included in the
sphere.
Expands the boundaries of this sphere to include [page:Vector3 point].
[method:Boolean isEmpty]()
Checks to see if the sphere is empty (the radius set to a negative
number).
Spheres with a radius of `0` contain only their center point and are not
considered to be empty.
[method:this makeEmpty]()
Makes the sphere empty by setting [page:.center center] to (0, 0, 0) and
[page:.radius radius] to -1.
[method:Boolean equals]( [param:Sphere sphere] )
Checks to see if the two spheres' centers and radii are equal.
[method:Box3 getBoundingBox]( [param:Box3 target] )
[page:Box3 target] — the result will be copied into this Box3.
Returns a[link:https://en.wikipedia.org/wiki/Minimum_bounding_box Minimum Bounding Box]
for the sphere.
[method:Boolean intersectsBox]( [param:Box3 box] )
[page:Box3 box] - [page:Box3] to check for intersection against.
Determines whether or not this sphere intersects a given [page:Box3 box].
[method:Boolean intersectsPlane]( [param:Plane plane] )
[page:Plane plane] - Plane to check for intersection against.
Determines whether or not this sphere intersects a given [page:Plane plane].
[method:Boolean intersectsSphere]( [param:Sphere sphere] )
[page:Sphere sphere] - Sphere to check for intersection against.
Checks to see if two spheres intersect.
[method:this set]( [param:Vector3 center], [param:Float radius] )
[page:Vector3 center] - center of the sphere.
[page:Float radius] - radius of the sphere.
Sets the [page:.center center] and [page:.radius radius] properties of
this sphere.
Please note that this method only copies the values from the given center.
[method:this setFromPoints]( [param:Array points], [param:Vector3 optionalCenter] )
[page:Array points] - an [page:Array] of [page:Vector3] positions.
[page:Vector3 optionalCenter] - Optional [page:Vector3] position for the
sphere's center.
Computes the minimum bounding sphere for an array of [page:Array points].
If [page:Vector3 optionalCenter]is given, it is used as the sphere's
center. Otherwise, the center of the axis-aligned bounding box
encompassing [page:Array points] is calculated.
[method:this translate]( [param:Vector3 offset] )
Translate the sphere's center by the provided offset [page:Vector3].
[method:this union]( [param:Sphere sphere] )
[page:Sphere sphere] - Bounding sphere that will be unioned with this
sphere.
Expands this sphere to enclose both the original sphere and the given
sphere.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
Abstract base class to load generic binary textures formats (rgbe, hdr,
...). This uses the [page:FileLoader] internally for loading files, and
creates a new [page:DataTexture].
Examples
See the
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/RGBELoader.js RGBELoader]
for an example of a derived class.
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:DataTexture load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] (optional) — Will be called when load completes.
The argument will be the loaded texture.
[page:Function onProgress] (optional) — Will be called while load
progresses.The argument will be the ProgressEvent instance, which contains
.[page:Boolean lengthComputable], .[page:Integer total] and .[page:Integer
loaded]. If the server does not set the Content-Length header;
.[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and pass the loaded texture to onLoad. The method
also returns a new texture object which can directly be used for material
creation.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
The default material used by [page:Points].
Code Example
const vertices = [];
for ( let i = 0; i < 10000; i ++ ) {
const x = THREE.MathUtils.randFloatSpread( 2000 );
const y = THREE.MathUtils.randFloatSpread( 2000 );
const z = THREE.MathUtils.randFloatSpread( 2000 );
vertices.push( x, y, z );
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
const material = new THREE.PointsMaterial( { color: 0x888888 } );
const points = new THREE.Points( geometry, material );
scene.add( points );
Examples
[example:misc_controls_fly misc / controls / fly]
[example:webgl_buffergeometry_drawrange WebGL / BufferGeometry / drawrange]
[example:webgl_buffergeometry_points WebGL / BufferGeometry / points]
[example:webgl_buffergeometry_points_interleaved WebGL / BufferGeometry / points / interleaved]
[example:webgl_camera WebGL / camera ]
[example:webgl_geometry_convex WebGL / geometry / convex]
[example:webgl_geometry_shapes WebGL / geometry / shapes]
[example:webgl_interactive_raycasting_points WebGL / interactive / raycasting / points]
[example:webgl_multiple_elements_text WebGL / multiple / elements / text]
[example:webgl_points_billboards WebGL / points / billboards]
[example:webgl_points_dynamic WebGL / points / dynamic]
[example:webgl_points_sprites WebGL / points / sprites]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Texture map]
Sets the color of the points using data from a [page:Texture]. May
optionally include an alpha channel, typically combined with
[page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
[property:Number size]
Defines the size of the points in pixels. Default is `1.0`.
Will be capped if it exceeds the hardware dependent parameter
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter gl.ALIASED_POINT_SIZE_RANGE].
[property:Boolean sizeAttenuation]
Specify whether points' size is attenuated by the camera depth.
(Perspective camera only.) Default is true.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] → [page:CurvePath] →
[name]
A 2D path representation. The class provides methods for creating paths
and contours of 2D shapes similar to the 2D Canvas API.
Code Example
const path = new THREE.Path();
path.lineTo( 0, 0.8 );
path.quadraticCurveTo( 0, 1, 0.2, 1 );
path.lineTo( 1, 1 );
const points = path.getPoints();
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
const line = new THREE.Line( geometry, material );
scene.add( line );
Constructor
[name]( [param:Array points] )
points -- (optional) array of [page:Vector2 Vector2s].
Creates a Path from the points. The first point defines the offset, then
successive points are added to the [page:CurvePath.curves curves] array as
[page:LineCurve LineCurves].
If no points are specified, an empty path is created and the
[page:.currentPoint] is set to the origin.
Properties
See the base [page:CurvePath] class for common properties.
[property:Vector2 currentPoint]
The current offset of the path. Any new [page:Curve] added will start
here.
Methods
See the base [page:CurvePath] class for common methods.
[method:this absarc]( [param:Float x], [param:Float y], [param:Float radius], [param:Float startAngle], [param:Float endAngle], [param:Boolean clockwise] )
x, y -- The absolute center of the arc.
radius -- The radius of the arc.
startAngle -- The start angle in radians.
endAngle -- The end angle in radians.
clockwise -- Sweep the arc clockwise. Defaults to `false`.
Adds an absolutely positioned [page:EllipseCurve EllipseCurve] to the
path.
[method:this absellipse]( [param:Float x], [param:Float y], [param:Float xRadius], [param:Float yRadius], [param:Float startAngle], [param:Float endAngle], [param:Boolean clockwise], [param:Float rotation] )
x, y -- The absolute center of the ellipse.
xRadius -- The radius of the ellipse in the x axis.
yRadius -- The radius of the ellipse in the y axis.
startAngle -- The start angle in radians.
endAngle -- The end angle in radians.
clockwise -- Sweep the ellipse clockwise. Defaults to false.
rotation -- The rotation angle of the ellipse in radians, counterclockwise
from the positive X axis. Optional, defaults to `0`.
Adds an absolutely positioned [page:EllipseCurve EllipseCurve] to the
path.
[method:this arc]( [param:Float x], [param:Float y], [param:Float radius], [param:Float startAngle], [param:Float endAngle], [param:Boolean clockwise] )
x, y -- The center of the arc offset from the last call.
radius -- The radius of the arc.
startAngle -- The start angle in radians.
endAngle -- The end angle in radians.
clockwise -- Sweep the arc clockwise. Defaults to `false`.
Adds an [page:EllipseCurve EllipseCurve] to the path, positioned relative
to [page:.currentPoint].
[method:this bezierCurveTo]( [param:Float cp1X], [param:Float cp1Y], [param:Float cp2X], [param:Float cp2Y], [param:Float x], [param:Float y] )
This creates a bezier curve from [page:.currentPoint] with (cp1X, cp1Y)
and (cp2X, cp2Y) as control points and updates [page:.currentPoint] to x
and y.
[method:this ellipse]( [param:Float x], [param:Float y], [param:Float xRadius], [param:Float yRadius], [param:Float startAngle], [param:Float endAngle], [param:Boolean clockwise], [param:Float rotation] )
x, y -- The center of the ellipse offset from the last call.
xRadius -- The radius of the ellipse in the x axis.
yRadius -- The radius of the ellipse in the y axis.
startAngle -- The start angle in radians.
endAngle -- The end angle in radians.
clockwise -- Sweep the ellipse clockwise. Defaults to `false`.
rotation -- The rotation angle of the ellipse in radians, counterclockwise
from the positive X axis. Optional, defaults to `0`.
Adds an [page:EllipseCurve EllipseCurve] to the path, positioned relative
to [page:.currentPoint].
[method:this lineTo]( [param:Float x], [param:Float y] )
Connects a [page:LineCurve] from [page:.currentPoint] to x, y onto the
path.
[method:this moveTo]( [param:Float x], [param:Float y] )
Move the [page:.currentPoint] to x, y.
[method:this quadraticCurveTo]( [param:Float cpX], [param:Float cpY], [param:Float x], [param:Float y] )
Creates a quadratic curve from [page:.currentPoint] with cpX and cpY as
control point and updates [page:.currentPoint] to x and y.
[method:this setFromPoints]( [param:Array vector2s] )
points -- array of [page:Vector2 Vector2s].
Points are added to the [page:CurvePath.curves curves] array as
[page:LineCurve LineCurves].
[method:this splineThru] ( [param:Array points] )
points - An array of [page:Vector2 Vector2s]
Connects a new [page:SplineCurve] onto the path.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Interpolant] →
[name]
Code Example
const interpolant = new THREE.[name](
new Float32Array( 2 ),
new Float32Array( 2 ),
1,
new Float32Array( 1 )
);
interpolant.evaluate( 0.5 );
Constructor
[name]( parameterPositions, sampleValues, sampleSize, resultBuffer )
parameterPositions -- array of positions
sampleValues -- array of samples
sampleSize -- number of samples
resultBuffer -- buffer to store the interpolation results.
Properties
[property:null parameterPositions]
[property:null resultBuffer]
[property:null sampleValues]
[property:Object settings]
[property:null valueSize]
Methods
[method:Array evaluate]( [param:Number t] )
Evaluate the interpolant at position *t*.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
A bone which is part of a [page:Skeleton]. The skeleton in turn is used by
the [page:SkinnedMesh]. Bones are almost identical to a blank
[page:Object3D].
Code Example
const root = new THREE.Bone();
const child = new THREE.Bone();
root.add( child );
child.position.y = 5;
Constructor
[name]( )
Creates a new [name].
Properties
See the base [page:Object3D] class for common properties.
[property:Boolean isBone]
Read-only flag to check if a given object is of type [name].
[property:String type]
Set to 'Bone', this can be used to find all Bones in a scene.
Methods
See the base [page:Object3D] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A geometric line segment represented by a start and end point.
Constructor
[name]( [param:Vector3 start], [param:Vector3 end] )
[page:Vector3 start] - Start of the line segment. Default is `(0, 0,
0)`.
[page:Vector3 end] - End of the line segment. Default is `(0, 0, 0)`.
Creates a new [name].
Properties
[property:Vector3 start]
[page:Vector3] representing the start point of the line.
[property:Vector3 end]
[page:Vector3] representing the end point of the line.
Methods
[method:this applyMatrix4]( [param:Matrix4 matrix] )
Applies a matrix transform to the line segment.
[method:Vector3 at]( [param:Float t], [param:Vector3 target] )
[page:Float t] - Use values 0-1 to return a position along the line
segment.
[page:Vector3 target] — the result will be copied into this Vector3.
Returns a vector at a certain position along the line. When [page:Float t]
= 0, it returns the start vector, and when [page:Float t] = 1 it returns
the end vector.
[method:Line3 clone]()
Returns a new [page:Line3] with the same [page:.start start] and
[page:.end end] vectors as this one.
[method:Vector3 closestPointToPoint]( [param:Vector3 point], [param:Boolean clampToLine], [param:Vector3 target] )
[page:Vector3 point] - return the closest point on the line to this
point.
[page:Boolean clampToLine] - whether to clamp the returned value to the
line segment.
[page:Vector3 target] — the result will be copied into this Vector3.
Returns the closets point on the line. If [page:Boolean clampToLine] is
true, then the returned value will be clamped to the line segment.
[method:Float closestPointToPointParameter]( [param:Vector3 point], [param:Boolean clampToLine] )
[page:Vector3 point] - the point for which to return a point parameter.
[page:Boolean clampToLine] - Whether to clamp the result to the range `[0,
1]`.
Returns a point parameter based on the closest point as projected on the
line segment. If [page:Boolean clampToLine] is true, then the returned
value will be between `0` and `1`.
[method:this copy]( [param:Line3 line] )
Copies the passed line's [page:.start start] and [page:.end end] vectors
to this line.
[method:Vector3 delta]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns the delta vector of the line segment ( [page:.end end] vector
minus the [page:.start start] vector).
[method:Float distance]()
Returns the [link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean distance]
(straight-line distance) between the line's
[page:.start start] and [page:.end end] points.
[method:Float distanceSq]()
Returns the square of the
[link:https://en.wikipedia.org/wiki/Euclidean_distance Euclidean distance]
(straight-line distance) between the line's [page:.start start] and
[page:.end end] vectors.
[method:Boolean equals]( [param:Line3 line] )
[page:Line3 line] - [page:Line3] to compare with this one.
Returns true if both line's [page:.start start] and [page:.end end] points
are equal.
[method:Vector3 getCenter]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns the center of the line segment.
[method:this set]( [param:Vector3 start], [param:Vector3 end] )
[page:Vector3 start] - set the [page:.start start point] of the line.
[page:Vector3 end] - set the [page:.end end point] of the line.
Sets the start and end values by copying the provided vectors.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
Creates a visual aid consisting of a spherical [page:Mesh] for a
[page:HemisphereLight HemisphereLight].
Code Example
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
const helper = new THREE.HemisphereLightHelper( light, 5 );
scene.add( helper );
Constructor
[name]( [param:HemisphereLight light], [param:Number sphereSize],
[param:Hex color] )
[page:HemisphereLight light] -- The light being visualized.
[page:Number size] -- The size of the mesh used to visualize the light.
[page:Hex color] -- (optional) if this is not the set the helper will take
the color of the light.
Properties
See the base [page:Object3D] class for common properties.
[property:HemisphereLight light]
Reference to the HemisphereLight being visualized.
[property:Object matrix]
Reference to the hemisphereLight's [page:Object3D.matrixWorld matrixWorld].
[property:Object matrixAutoUpdate]
See [page:Object3D.matrixAutoUpdate]. Set to `false` here as the helper is
using the hemisphereLight's [page:Object3D.matrixWorld matrixWorld].
[property:hex color]
The color parameter passed in the constructor. Default is `undefined`. If
this is changed, the helper's color will update the next time
[page:.update update] is called.
Methods
See the base [page:Object3D] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:undefined update]()
Updates the helper to match the position and direction of the
[page:.light].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Audio] →
[name]
Create a positional audio object.
This uses the
[link:https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API Web Audio API].
Code Example
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio( listener );
// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/song.ogg', function( buffer ) {
sound.setBuffer( buffer );
sound.setRefDistance( 20 );
sound.play();
});
// create an object for the sound to play from
const sphere = new THREE.SphereGeometry( 20, 32, 16 );
const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
const mesh = new THREE.Mesh( sphere, material );
scene.add( mesh );
// finally add the sound to the mesh
mesh.add( sound );
Examples
[example:webaudio_orientation webaudio / orientation ]
[example:webaudio_sandbox webaudio / sandbox ]
[example:webaudio_timing webaudio / timing ]
Constructor
[name]( [param:AudioListener listener] )
listener — (required) [page:AudioListener AudioListener] instance.
Properties
See the [page:Audio Audio] class for inherited properties.
[property:PannerNode panner]
The PositionalAudio's
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode PannerNode].
Methods
See the [page:Audio Audio] class for inherited methods.
[method:PannerNode getOutput]()
Returns the [page:PositionalAudio.panner panner].
[method:Float getRefDistance]()
Returns the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance panner.refDistance].
[method:this setRefDistance]( [param:Float value] )
Sets the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance panner.refDistance].
[method:Float getRolloffFactor]()
Returns the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/rolloffFactor panner.rolloffFactor].
[method:this setRolloffFactor]( [param:Float value] )
Sets the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/rolloffFactor panner.rolloffFactor].
[method:String getDistanceModel]()
Returns the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distanceModel panner.distanceModel].
[method:this setDistanceModel]( [param:String value] )
Sets the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distanceModel panner.distanceModel].
[method:Float getMaxDistance]()
Returns the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/maxDistance panner.maxDistance].
[method:this setMaxDistance]( [param:Float value] )
Sets the value of
[link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/maxDistance panner.maxDistance].
[method:this setDirectionalCone]( [param:Float coneInnerAngle], [param:Float coneOuterAngle], [param:Float coneOuterGain] )
This method can be used in order to transform an omnidirectional sound
into a [link:https://developer.mozilla.org/en-US/docs/Web/API/PannerNode directional sound].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A doubly linked list of vertices.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { VertexList } from 'three/addons/math/ConvexHull.js';
Constructor
[name]()
Creates a new instance of [name].
Properties
[property:VertexNode head]
Reference to the first vertex of the linked list. Default is null.
[property:VertexNode tail]
Reference to the last vertex of the linked list. Default is null.
Methods
[method:VertexNode first]()
Returns the head reference.
[method:VertexNode last]()
Returns the tail reference.
[method:this clear]()
Clears the linked list.
[method:this insertBefore]( [param:Vertex target], [param:Vertex vertex] )
[page:Vertex target] - The target vertex. It's assumed that this vertex belongs to the linked list.
[page:Vertex vertex] - The vertex to insert.
Inserts a vertex
before
a target vertex.
[method:this insertAfter]( [param:Vertex target], [param:Vertex vertex] )
[page:Vertex target] - The target vertex. It's assumed that this vertex belongs to the linked list.
[page:Vertex vertex] - The vertex to insert.
Inserts a vertex
after
a target vertex.
[method:this append]( [param:Vertex vertex] )
[page:Vertex vertex] - The vertex to append.
Appends a vertex to the end of the linked list.
[method:this appendChain]( [param:Vertex vertex] )
[page:Vertex vertex] - The head vertex of a chain of vertices.
Appends a chain of vertices where the given vertex is the head.
[method:this remove]( [param:Vertex vertex] )
[page:Vertex vertex] - The vertex to remove.
Removes a vertex from the linked list.
[method:this removeSubList]( [param:Vertex a], [param:Vertex b] )
[page:Vertex a] - The head of the sublist.
[page:Vertex b] - The tail of the sublist.
Removes a sublist of vertices from the linked list.
[method:Boolean isEmpty]()
Returns true if the linked list is empty.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/ConvexHull.js examples/jsm/math/ConvexHull.js]

[page:Material] →
[name]
A material for drawing geometry by depth. Depth is based off of the camera
near and far plane. White is nearest, black is farthest.
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Constant depthPacking]
Type for depth packing. Default is [page:Textures BasicDepthPacking].
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Boolean fog]
Whether the material is affected by fog. Default is `false`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null.
[property:Boolean wireframe]
Render geometry as wireframe. Default is false (i.e. render as smooth
shaded).
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for `glTF 2.0` resources.
[link:https://www.khronos.org/gltf glTF] (GL Transmission Format) is an
[link:https://github.com/KhronosGroup/glTF/tree/master/specification/2.0 open format specification]
for efficient delivery and loading of 3D content. Assets may be provided either in JSON (.gltf)
or binary (.glb) format. External files store textures (.jpg, .png) and additional binary
data (.bin). A glTF asset may deliver one or more scenes, including meshes, materials,
textures, skins, skeletons, morph targets, animations, lights, and/or cameras.
[name] uses [page:ImageBitmapLoader] whenever possible. Be advised that image bitmaps are not automatically GC-collected when they are no longer referenced,
and they require special handling during the disposal process. More information in the [link:https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects How to dispose of objects] guide.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
Extensions
GLTFLoader supports the following
[link:https://github.com/KhronosGroup/glTF/tree/master/extensions/ glTF 2.0 extensions]:
KHR_draco_mesh_compression
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
KHR_mesh_quantization
KHR_lights_punctual
KHR_texture_basisu
KHR_texture_transform
EXT_texture_webp
EXT_meshopt_compression
EXT_mesh_gpu_instancing
The following glTF 2.0 extension is supported by an external user plugin
[link:https://github.com/takahirox/three-gltf-extensions KHR_materials_variants]
1
[link:https://github.com/takahirox/three-gltf-extensions MSFT_texture_dds]
1
You can also manually process the extension after loading in your application. See [link:https://threejs.org/examples/#webgl_loader_gltf_variants Three.js glTF materials variants example].
Code Example
// Instantiate a loader
const loader = new GLTFLoader();
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
// Load a glTF resource
loader.load(
// resource URL
'models/gltf/duck/duck.gltf',
// called when the resource is loaded
function ( gltf ) {
scene.add( gltf.scene );
gltf.animations; // Array<THREE.AnimationClip>
gltf.scene; // THREE.Group
gltf.scenes; // Array<THREE.Group>
gltf.cameras; // Array<THREE.Camera>
gltf.asset; // Object
},
// called while loading is progressing
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_gltf]
Textures
When loading textures externally (e.g., using [page:TextureLoader]) and applying them to a glTF model,
textures must be configured. Textures referenced from the glTF model are configured automatically by
GLTFLoader.
// If texture is used for color information (.map, .emissiveMap, .specularMap, ...), set color space
texture.colorSpace = THREE.SRGBColorSpace;
// UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
texture.flipY = false;
Custom extensions
Metadata from unknown extensions is preserved as “.userData.gltfExtensions” on Object3D, Scene, and Material instances,
or attached to the response “gltf” object. Example:
loader.load('foo.gltf', function ( gltf ) {
const scene = gltf.scene;
const mesh = scene.children[ 3 ];
const fooExtension = mesh.userData.gltfExtensions.EXT_foo;
gltf.parser.getDependency( 'bufferView', fooExtension.bufferView )
.then( function ( fooBuffer ) { ... } );
} );
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.gltf` or `.glb` file.
[page:Function onLoad] — A function to be called after the loading is successfully completed. The function receives the loaded JSON response returned from [page:Function parse].
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading from url and call the callback function with the parsed response content.
[method:this setDRACOLoader]( [param:DRACOLoader dracoLoader] )
[page:DRACOLoader dracoLoader] — Instance of THREE.DRACOLoader, to be used for decoding assets compressed with the KHR_draco_mesh_compression extension.
Refer to this [link:https://github.com/mrdoob/three.js/tree/dev/examples/jsm/libs/draco#readme readme] for the details of Draco and its decoder.
[method:this setKTX2Loader]( [param:KTX2Loader ktx2Loader] )
[page:KTX2Loader ktx2Loader] — Instance of THREE.KTX2Loader, to be used for loading KTX2 compressed textures.
[method:undefined parse]( [param:ArrayBuffer data], [param:String path], [param:Function onLoad], [param:Function onError] )
[page:ArrayBuffer data] — glTF asset to parse, as an `ArrayBuffer`, `JSON` string or object.
[page:String path] — The base path from which to find subsequent glTF resources such as textures and .bin data files.
[page:Function onLoad] — A function to be called when parse completes.
[page:Function onError] — (optional) A function to be called if an error occurs during parsing. The function receives error as an argument.
Parse a glTF-based `ArrayBuffer`, `JSON` string or object and fire [page:Function onLoad] callback when complete. The argument to [page:Function onLoad] will be an [page:Object] that contains loaded parts: .[page:Group scene], .[page:Array scenes], .[page:Array cameras], .[page:Array animations], and .[page:Object asset].
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/GLTFLoader.js examples/jsm/loaders/GLTFLoader.js]

[name]
Abstract base class for materials.
Materials describe the appearance of [page:Object objects]. They are
defined in a (mostly) renderer-independent way, so you don't have to
rewrite materials if you decide to use a different renderer.
The following properties and methods are inherited by all other material
types (although they may have different defaults).
Constructor
[name]()
This creates a generic material.
Properties
[property:Boolean alphaHash]
Enables alpha hashed transparency, an alternative to [page:.transparent] or [page:.alphaTest].
The material will not be rendered if opacity is lower than a random threshold.
Randomization introduces some grain or noise, but approximates alpha blending without
the associated problems of sorting. Using TAARenderPass can reduce the resulting noise.
[property:Float alphaTest]
Sets the alpha value to be used when running an alpha test. The material
will not be rendered if the opacity is lower than this value. Default is
`0`.
[property:Boolean alphaToCoverage]
Enables alpha to coverage. Can only be used with MSAA-enabled contexts
(meaning when the renderer was created with *antialias* parameter set to
`true`). Enabling this will smooth aliasing on clip plane edges and alphaTest-clipped edges.
Default is `false`.
[property:Float blendAlpha]
Represents the alpha value of the constant blend color. Default is `0`.
This property has only an effect when using custom blending with [page:CustomBlendingEquation ConstantAlpha] or [page:CustomBlendingEquation OneMinusConstantAlpha].
[property:Color blendColor]
Represent the RGB values of the constant blend color. Default is `0x000000`.
This property has only an effect when using custom blending with [page:CustomBlendingEquation ConstantColor] or [page:CustomBlendingEquation OneMinusConstantColor].
[property:Integer blendDst]
Blending destination. Default is [page:CustomBlendingEquation OneMinusSrcAlphaFactor].
See the destination factors [page:CustomBlendingEquation constants] for all possible values.
The material's [page:Constant blending] must be set to [page:Materials CustomBlending]
for this to have any effect.
[property:Integer blendDstAlpha]
The transparency of the [page:.blendDst]. Uses [page:.blendDst] value if
null. Default is `null`.
[property:Integer blendEquation]
Blending equation to use when applying blending. Default is
[page:CustomBlendingEquation AddEquation]. See the blending equation
[page:CustomBlendingEquation constants] for all possible values.
The material's [page:Constant blending] must be set to [page:Materials CustomBlending]
for this to have any effect.
[property:Integer blendEquationAlpha]
The transparency of the [page:.blendEquation]. Uses [page:.blendEquation]
value if null. Default is `null`.
[property:Blending blending]
Which blending to use when displaying objects with this material.
This must be set to [page:Materials CustomBlending] to use custom
[page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].
See the blending mode [page:Materials constants] for all possible values.
Default is [page:Materials NormalBlending].
[property:Integer blendSrc]
Blending source. Default is [page:CustomBlendingEquation SrcAlphaFactor].
See the source factors [page:CustomBlendingEquation constants] for all
possible values.
The material's [page:Constant blending] must be set to [page:Materials CustomBlending]
for this to have any effect.
[property:Integer blendSrcAlpha]
The transparency of the [page:.blendSrc]. Uses [page:.blendSrc] value if
null. Default is `null`.
[property:Boolean clipIntersection]
Changes the behavior of clipping planes so that only their intersection is
clipped, rather than their union. Default is `false`.
[property:Array clippingPlanes]
User-defined clipping planes specified as THREE.Plane objects in world
space. These planes apply to the objects this material is attached to.
Points in space whose signed distance to the plane is negative are clipped
(not rendered). This requires [page:WebGLRenderer.localClippingEnabled] to
be `true`. See the [example:webgl_clipping_intersection WebGL / clipping /intersection] example. Default is `null`.
[property:Boolean clipShadows]
Defines whether to clip shadows according to the clipping planes specified
on this material. Default is `false`.
[property:Boolean colorWrite]
Whether to render the material's color. This can be used in conjunction
with a mesh's [page:Integer renderOrder] property to create invisible
objects that occlude other objects. Default is `true`.
[property:Object defines]
Custom defines to be injected into the shader. These are passed in form of
an object literal, with key/value pairs. `{ MY_CUSTOM_DEFINE: '' , PI2:
Math.PI * 2 }`. The pairs are defined in both vertex and fragment shaders.
Default is `undefined`.
[property:Integer depthFunc]
Which depth function to use. Default is [page:Materials LessEqualDepth].
See the depth mode [page:Materials constants] for all possible values.
[property:Boolean depthTest]
Whether to have depth test enabled when rendering this material. Default
is `true`. When the depth test is disabled, the depth write will also be
implicitly disabled.
[property:Boolean depthWrite]
Whether rendering this material has any effect on the depth buffer.
Default is `true`.
When drawing 2D overlays it can be useful to disable the depth writing in
order to layer several things together without creating z-index artifacts.
[property:Boolean forceSinglePass]
Whether double-sided, transparent objects should be rendered with a single
pass or not. Default is `false`.
The engine renders double-sided, transparent objects with two draw calls
(back faces first, then front faces) to mitigate transparency artifacts.
There are scenarios however where this approach produces no quality gains
but still doubles draw calls e.g. when rendering flat vegetation like
grass sprites. In these cases, set the `forceSinglePass` flag to `true` to
disable the two pass rendering to avoid performance issues.
[property:Boolean isMaterial]
Read-only flag to check if a given object is of type [name].
[property:Boolean stencilWrite]
Whether stencil operations are performed against the stencil buffer. In
order to perform writes or comparisons against the stencil buffer this
value must be `true`. Default is `false`.
[property:Integer stencilWriteMask]
The bit mask to use when writing to the stencil buffer. Default is `0xFF`.
[property:Integer stencilFunc]
The stencil comparison function to use. Default is [page:Materials AlwaysStencilFunc].
See stencil function [page:Materials constants] for
all possible values.
[property:Integer stencilRef]
The value to use when performing stencil comparisons or stencil
operations. Default is `0`.
[property:Integer stencilFuncMask]
The bit mask to use when comparing against the stencil buffer. Default is
`0xFF`.
[property:Integer stencilFail]
Which stencil operation to perform when the comparison function returns
false. Default is [page:Materials KeepStencilOp]. See the stencil
operations [page:Materials constants] for all possible values.
[property:Integer stencilZFail]
Which stencil operation to perform when the comparison function returns
true but the depth test fails. Default is [page:Materials KeepStencilOp].
See the stencil operations [page:Materials constants] for all possible
values.
[property:Integer stencilZPass]
Which stencil operation to perform when the comparison function returns
true and the depth test passes. Default is [page:Materials KeepStencilOp].
See the stencil operations [page:Materials constants] for all possible
values.
[property:Integer id]
Unique number for this material instance.
[property:String name]
Optional name of the object (doesn't need to be unique). Default is an
empty string.
[property:Boolean needsUpdate]
Specifies that the material needs to be recompiled.
[property:Float opacity]
Float in the range of `0.0` - `1.0` indicating how transparent the
material is. A value of `0.0` indicates fully transparent, `1.0` is fully
opaque.
If the material's [page:Boolean transparent] property is not set to
`true`, the material will remain fully opaque and this value will only
affect its color.
Default is `1.0`.
[property:Boolean polygonOffset]
Whether to use polygon offset. Default is `false`. This corresponds to the
`GL_POLYGON_OFFSET_FILL` WebGL feature.
[property:Integer polygonOffsetFactor]
Sets the polygon offset factor. Default is `0`.
[property:Integer polygonOffsetUnits]
Sets the polygon offset units. Default is `0`.
[property:String precision]
Override the renderer's default precision for this material. Can be
`"highp"`, `"mediump"` or `"lowp"`. Default is `null`.
[property:Boolean premultipliedAlpha]
Whether to premultiply the alpha (transparency) value. See
[Example:webgl_materials_physical_transmission WebGL / Materials / Physical / Transmission]
for an example of the difference. Default is `false`.
[property:Boolean dithering]
Whether to apply dithering to the color to remove the appearance of
banding. Default is `false`.
[property:Integer shadowSide]
Defines which side of faces cast shadows. When set, can be [page:Materials THREE.FrontSide],
[page:Materials THREE.BackSide], or [page:Materials THREE.DoubleSide].
Default is `null`.
If `null`, the side casting shadows is determined as follows:
[page:Material.side]
Side casting shadows
THREE.FrontSide
back side
THREE.BackSide
front side
THREE.DoubleSide
both sides
[property:Integer side]
Defines which side of faces will be rendered - front, back or both.
Default is [page:Materials THREE.FrontSide]. Other options are
[page:Materials THREE.BackSide] or [page:Materials THREE.DoubleSide].
[property:Boolean toneMapped]
Defines whether this material is tone mapped according to the renderer's
[page:WebGLRenderer.toneMapping toneMapping] setting. It is ignored when rendering to a render target or using post processing.
Default is `true`.
[property:Boolean transparent]
Defines whether this material is transparent. This has an effect on
rendering as transparent objects need special treatment and are rendered
after non-transparent objects.
When set to true, the extent to which the material is transparent is
controlled by setting its [page:Float opacity] property.
Default is `false`.
[property:String type]
Value is the string 'Material'. This shouldn't be changed, and can be used
to find all objects of this type in a scene.
[property:String uuid]
[link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID] of
this material instance. This gets automatically assigned, so this
shouldn't be edited.
[property:Integer version]
This starts at `0` and counts how many times [page:Material.needsUpdate .needsUpdate] is set to `true`.
[property:Boolean vertexColors]
Defines whether vertex coloring is used. Default is `false`. The engine
supports RGB and RGBA vertex colors depending on whether a three (RGB) or
four (RGBA) component color buffer attribute is used.
[property:Boolean visible]
Defines whether this material is visible. Default is `true`.
[property:Object userData]
An object that can be used to store custom data about the Material. It
should not hold references to functions as these will not be cloned.
Default is an empty object `{}`.
Methods
[page:EventDispatcher EventDispatcher] methods are available on this
class.
[method:Material clone]( )
Return a new material with the same parameters as this material.
[method:this copy]( [param:material material] )
Copy the parameters from the passed material into this material.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Material textures must be be disposed of by the dispose() method of
[page:Texture Texture].
[method:undefined onBeforeCompile]( [param:Shader shader], [param:WebGLRenderer renderer] )
An optional callback that is executed immediately before the shader
program is compiled. This function is called with the shader source code
as a parameter. Useful for the modification of built-in materials.
Unlike properties, the callback is not supported by [page:Material.clone .clone](),
[page:Material.copy .copy]() and [page:Material.toJSON .toJSON]().
[method:String customProgramCacheKey]()
In case onBeforeCompile is used, this callback can be used to identify
values of settings used in onBeforeCompile, so three.js can reuse a cached
shader or recompile the shader for this material as needed.
For example, if onBeforeCompile contains a conditional statement like:
if ( black ) {
shader.fragmentShader = shader.fragmentShader.replace('gl_FragColor = vec4(1)',
'gl_FragColor = vec4(0)')
}
then customProgramCacheKey should be set like this:
material.customProgramCacheKey = function() {
return black ? '1' : '0';
}
Unlike properties, the callback is not supported by [page:Material.clone .clone](),
[page:Material.copy .copy]() and [page:Material.toJSON .toJSON]().
[method:undefined setValues]( [param:Object values] )
values -- a container with parameters.
Sets the properties based on the `values`.
[method:Object toJSON]( [param:Object meta] )
meta -- object containing metadata such as textures or images for the
material.
Convert the material to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:KeyframeTrack] →
[name]
A Track of numeric keyframe values.
Constructor
[name]( [param:String name], [param:Array times], [param:Array values] )
[page:String name] - (required) identifier for the KeyframeTrack.
[page:Array times] - (required) array of keyframe times.
[page:Array values] - values for the keyframes at the times specified.
[page:Constant interpolation] - the type of interpolation to use. See
[page:Animation Animation Constants] for possible values. Default is
[page:Animation InterpolateLinear].
Properties
See [page:KeyframeTrack] for inherited properties.
[property:String ValueTypeName]
String 'number'.
Methods
See [page:KeyframeTrack] for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A group of objects that receives a shared animation state.
For an overview of the different elements of the three.js animation system
see the "Animation System" article in the "Next Steps" section of the
manual.
Usage:
Add objects you would otherwise pass as 'root' to the constructor or the
[page:AnimationMixer.clipAction clipAction] method of [page:AnimationMixer AnimationMixer] and instead pass this object as 'root'.
Note that objects of this class appear as one object to the mixer, so
cache control of the individual objects must be done on the group.
Limitations
The animated properties must be compatible among all objects in the
group.
A single property can either be controlled through a target group or
directly, but not both.
Constructor
[name]( [param:Object obj1], [param:Object obj2], [param:Object obj3], ...)
[page:Object obj] - an arbitrary number of meshes that share the same
animation state.
Properties
[property:Boolean isAnimationObjectGroup]
Read-only flag to check if a given object is of type [name].
[property:Object stats]
An object that contains some informations of this `AnimationObjectGroup`
(total number, number in use, number of bindings per object)
[property:String uuid]
The [link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID]
of this `AnimationObjectGroup`. It gets automatically assigned and
shouldn't be edited.
Methods
[method:undefined add]( [param:Object obj1], [param:Object obj2], [param:Object obj3], ... )
Adds an arbitrary number of objects to this `AnimationObjectGroup`.
[method:undefined remove]( [param:Object obj1], [param:Object obj2], [param:Object obj3], ... )
Removes an arbitrary number of objects from this `AnimationObjectGroup`.
[method:undefined uncache]( [param:Object obj1], [param:Object obj2], [param:Object obj3], ... )
Deallocates all memory resources for the passed objects of this
`AnimationObjectGroup`.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Mesh] →
[name]
This displays a helper object consisting of a spherical [page:Mesh] for
visualizing a [page:PointLight].
Code Example
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
pointLight.position.set( 10, 10, 10 );
scene.add( pointLight );
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );
Examples
[example:webgl_helpers WebGL / helpers]
Constructor
[name]( [param:PointLight light], [param:Float sphereSize], [param:Hex color] )
[page:PointLight light] -- The light to be visualized.
[page:Float sphereSize] -- (optional) The size of the sphere helper.
Default is `1`.
[page:Hex color] -- (optional) if this is not the set the helper will take
the color of the light.
Properties
See the base [page:Mesh] class for common properties.
[property:PointLight light]
The [page:PointLight] that is being visualized.
[property:Object matrix]
Reference to the pointLight's [page:Object3D.matrixWorld matrixWorld].
[property:Object matrixAutoUpdate]
See [page:Object3D.matrixAutoUpdate]. Set to `false` here as the helper is
using the pointLight's [page:Object3D.matrixWorld matrixWorld].
[property:hex color]
The color parameter passed in the constructor. Default is `undefined`. If
this is changed, the helper's color will update the next time
[page:.update update] is called.
Methods
See the base [page:Mesh] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:undefined update]()
Updates the helper to match the position of the [page:.light].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
A material for drawing geometries in a simple shaded (flat or wireframe)
way.
This material is not affected by lights.
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Texture aoMap]
The red channel of this texture is used as the ambient occlusion map.
Default is null. The aoMap requires a second set of UVs.
[property:Float aoMapIntensity]
Intensity of the ambient occlusion effect. Default is `1`. Zero is no
occlusion effect.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Integer combine]
How to combine the result of the surface's color with the environment map,
if any.
Options are [page:Materials THREE.MultiplyOperation] (default),
[page:Materials THREE.MixOperation], [page:Materials THREE.AddOperation].
If mix is chosen, the [page:.reflectivity] is used to blend between the
two colors.
[property:Texture envMap]
The environment map. Default is null.
[property:Euler envMapRotation]
The rotation of the environment map in radians. Default is `(0,0,0)`.
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Texture lightMap]
The light map. Default is null. The lightMap requires a second set of UVs.
[property:Float lightMapIntensity]
Intensity of the baked light. Default is `1`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest]. Default is null.
[property:Float reflectivity]
How much the environment map affects the surface; also see
[page:.combine]. The default value is `1` and the valid range is between `0`
(no reflections) and `1` (full reflections).
[property:Float refractionRatio]
The index of refraction (IOR) of air (approximately 1) divided by the
index of refraction of the material. It is used with environment mapping
modes [page:Textures THREE.CubeRefractionMapping] and [page:Textures THREE.EquirectangularRefractionMapping].
The refraction ratio should not exceed `1`. Default is `0.98`.
[property:Texture specularMap]
Specular map used by the material. Default is null.
[property:Boolean wireframe]
Render geometry as wireframe. Default is `false` (i.e. render as flat
polygons).
[property:String wireframeLinecap]
Define appearance of line ends. Possible values are "butt", "round" and
"square". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:String wireframeLinejoin]
Define appearance of line joints. Possible values are "round", "bevel" and
"miter". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Texture] →
[name]
Creates a texture directly from raw data, width and height.
Constructor
[name]( data, width, height, format, type, mapping, wrapS, wrapT,
magFilter, minFilter, anisotropy, colorSpace )
The data argument must be an
[link:https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView ArrayBufferView].
Further parameters correspond to the properties
inherited from [page:Texture], where both magFilter and minFilter default
to THREE.NearestFilter.
The interpretation of the data depends on type and format: If the type is
THREE.UnsignedByteType, a Uint8Array will be useful for addressing the
texel data. If the format is THREE.RGBAFormat, data needs four values for
one texel; Red, Green, Blue and Alpha (typically the opacity).
For the packed types, THREE.UnsignedShort4444Type and
THREE.UnsignedShort5551Type all color components of one texel can be
addressed as bitfields within an integer element of a Uint16Array.
In order to use the types THREE.FloatType and THREE.HalfFloatType, the
WebGL implementation must support the respective extensions
OES_texture_float and OES_texture_half_float. In order to use
THREE.LinearFilter for component-wise, bilinear interpolation of the
texels based on these types, the WebGL extensions OES_texture_float_linear
or OES_texture_half_float_linear must also be present.
Code Example
// create a buffer with color data
const width = 512;
const height = 512;
const size = width * height;
const data = new Uint8Array( 4 * size );
const color = new THREE.Color( 0xffffff );
const r = Math.floor( color.r * 255 );
const g = Math.floor( color.g * 255 );
const b = Math.floor( color.b * 255 );
for ( let i = 0; i < size; i ++ ) {
const stride = i * 4;
data[ stride ] = r;
data[ stride + 1 ] = g;
data[ stride + 2 ] = b;
data[ stride + 3 ] = 255;
}
// used the buffer to create a [name]
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
Properties
See the base [page:Texture Texture] class for common properties.
[property:Boolean flipY]
If set to `true`, the texture is flipped along the vertical axis when
uploaded to the GPU. Default is `false`.
[property:Boolean generateMipmaps]
Whether to generate mipmaps (if possible) for a texture. False by default.
[property:Object image]
Overridden with a object holding data, width, and height.
[property:Boolean isDataTexture]
Read-only flag to check if a given object is of type [name].
[property:number unpackAlignment]
`1` by default. Specifies the alignment requirements for the start of each
pixel row in memory. The allowable values are 1 (byte-alignment), 2 (rows
aligned to even-numbered bytes), 4 (word-alignment), and 8 (rows start on
double-word boundaries). See
[link:http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml glPixelStorei] for more information.
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
This holds a reference to a real property in the scene graph; used
internally.
Constructor
[name]( [param:Object3D rootNode], path, parsedPath )
-- [page:Object3D rootNode]: -- path -- parsedPath (optional)
Properties
[property:Number path]
[property:Number parsedPath]
[property:Number node]
[property:Number rootNode]
[property:Object BindingType]
[property:Object Versioning]
[property:Array GetterByBindingType]
[property:Array SetterByBindingTypeAndVersioning]
Methods
[method:undefined getValue]( [param:Array targetArray], [param:Number offset] )
[method:undefined setValue]( [param:Array sourceArray], [param:Number offset] )
[method:undefined bind]( )
Create getter / setter pair for a property in the scene graph. Used
internally by [page:PropertyBinding.getValue getValue] and
[page:PropertyBinding.setValue setValue].
[method:undefined unbind]( )
Unbind getter / setter pair for a property in the scene graph.
[method:Constructor Composite]( targetGroup, path, optionalParsedPath )
Create a new Composite PropertyBinding.
[method:Constructor create]( root, path, parsedPath )
Create a new Composite PropertyBinding (if root is an
[page:AnimationObjectGroup]) or PropertyBinding.
[method:Constructor parseTrackName]( trackName )
Matches strings in the following forms:
-- nodeName.property
-- nodeName.property[accessor]
-- nodeName.material.property[accessor]
-- uuid.property[accessor]
-- uuid.objectName[objectIndex].propertyName[propertyIndex]
-- parentName/nodeName.property
-- parentName/parentName/nodeName.property[index]
-- .bone[Armature.DEF_cog].position
-- scene:helium_balloon_model:helium_balloon_model.position
[method:Constructor findNode]( root, nodeName )
Find a node in a node tree or [page:Skeleton Skeleton].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
A class for generating cylinder geometries.
Code Example
const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder );
Constructor
[name]([param:Float radiusTop], [param:Float radiusBottom], [param:Float height], [param:Integer radialSegments], [param:Integer heightSegments],
[param:Boolean openEnded], [param:Float thetaStart], [param:Float thetaLength])
radiusTop — Radius of the cylinder at the top. Default is `1`.
radiusBottom — Radius of the cylinder at the bottom. Default is `1`.
height — Height of the cylinder. Default is `1`.
radialSegments — Number of segmented faces around the circumference of the
cylinder. Default is `32`
heightSegments — Number of rows of faces along the height of the cylinder.
Default is `1`.
openEnded — A Boolean indicating whether the ends of the cylinder are open
or capped. Default is false, meaning capped.
thetaStart — Start angle for first segment, default = 0 (three o'clock
position).
thetaLength — The central angle, often called theta, of the circular
sector. The default is `2`*Pi, which makes for a complete cylinder.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Represents an axis-aligned bounding box (AABB) in 3D space.
Code Example
const box = new THREE.Box3();
const mesh = new THREE.Mesh(
new THREE.SphereGeometry(),
new THREE.MeshBasicMaterial()
);
// ensure the bounding box is computed for its geometry
// this should be done only once (assuming static geometries)
mesh.geometry.computeBoundingBox();
// ...
// in the animation loop, compute the current bounding box with the world matrix
box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );
Constructor
[name]( [param:Vector3 min], [param:Vector3 max] )
[page:Vector3 min] - (optional) [page:Vector3] representing the lower (x,
y, z) boundary of the box. Default is ( + Infinity, + Infinity, + Infinity
).
[page:Vector3 max] - (optional) [page:Vector3] representing the upper (x,
y, z) boundary of the box. Default is ( - Infinity, - Infinity, - Infinity
).
Creates a [name] bounded by min and max.
Properties
[property:Boolean isBox3]
Read-only flag to check if a given object is of type [name].
[property:Vector3 min]
[page:Vector3] representing the lower (x, y, z) boundary of the box.
Default is ( + Infinity, + Infinity, + Infinity ).
[property:Vector3 max]
[page:Vector3] representing the upper (x, y, z) boundary of the box.
Default is ( - Infinity, - Infinity, - Infinity ).
Methods
[method:this applyMatrix4]( [param:Matrix4 matrix] )
[page:Matrix4 matrix] - The [page:Matrix4] to apply
Transforms this Box3 with the supplied matrix.
[method:Vector3 clampPoint]( [param:Vector3 point], [param:Vector3 target] )
[page:Vector3 point] - [page:Vector3] to clamp.
[page:Vector3 target] — the result will be copied into this Vector3.
[link:https://en.wikipedia.org/wiki/Clamping_(graphics) Clamps] the
[page:Vector3 point] within the bounds of this box.
[method:Box3 clone]()
Returns a new [page:Box3] with the same [page:.min min] and [page:.max max] as this one.
[method:Boolean containsBox]( [param:Box3 box] )
[page:Box3 box] - [page:Box3 Box3] to test for inclusion.
Returns true if this box includes the entirety of [page:Box3 box]. If this
and [page:Box3 box] are identical,
this function also returns true.
[method:Boolean containsPoint]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] to check for inclusion.
Returns true if the specified [page:Vector3 point] lies within or on the
boundaries of this box.
[method:this copy]( [param:Box3 box] )
[page:Box3 box] - [page:Box3] to copy.
Copies the [page:.min min] and [page:.max max] from [page:Box3 box] to
this box.
[method:Float distanceToPoint]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] to measure distance to.
Returns the distance from any edge of this box to the specified point. If
the [page:Vector3 point] lies inside of this box, the distance will be `0`.
[method:Boolean equals]( [param:Box3 box] )
[page:Box3 box] - Box to compare with this one.
Returns true if this box and [page:Box3 box] share the same lower and
upper bounds.
[method:this expandByObject]( [param:Object3D object], [param:Boolean precise] )
[page:Object3D object] - [page:Object3D] to expand the box by.
precise - (optional) expand the bounding box as little as necessary at the
expense of more computation. Default is false.
Expands the boundaries of this box to include [page:Object3D object] and
its children, accounting for the object's, and children's, world
transforms. The function may result in a larger box than strictly
necessary (unless the precise parameter is set to true).
[method:this expandByPoint]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] that should be included in the
box.
Expands the boundaries of this box to include [page:Vector3 point].
[method:this expandByScalar]( [param:Float scalar] )
[page:Float scalar] - Distance to expand the box by.
Expands each dimension of the box by [page:Float scalar]. If negative, the
dimensions of the box will be contracted.
[method:this expandByVector]( [param:Vector3 vector] )
[page:Vector3 vector] - [page:Vector3] to expand the box by.
Expands this box equilaterally by [page:Vector3 vector]. The width of this
box will be expanded by the x component of [page:Vector3 vector] in both
directions. The height of this box will be expanded by the y component of
[page:Vector3 vector] in both directions. The depth of this box will be
expanded by the z component of `vector` in both directions.
[method:Sphere getBoundingSphere]( [param:Sphere target] )
[page:Sphere target] — the result will be copied into this Sphere.
Gets a [page:Sphere] that bounds the box.
[method:Vector3 getCenter]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns the center point of the box as a [page:Vector3].
[method:Vector3 getParameter]( [param:Vector3 point], [param:Vector3 target] )
[page:Vector3 point] - [page:Vector3].
[page:Vector3 target] — the result will be copied into this Vector3.
Returns a point as a proportion of this box's width, height and depth.
[method:Vector3 getSize]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns the width, height and depth of this box.
[method:this intersect]( [param:Box3 box] )
[page:Box3 box] - Box to intersect with.
Computes the intersection of this and [page:Box3 box], setting the upper
bound of this box to the lesser of the two boxes' upper bounds and the
lower bound of this box to the greater of the two boxes' lower bounds. If
there's no overlap, makes this box empty.
[method:Boolean intersectsBox]( [param:Box3 box] )
[page:Box3 box] - Box to check for intersection against.
Determines whether or not this box intersects [page:Box3 box].
[method:Boolean intersectsPlane]( [param:Plane plane] )
[page:Plane plane] - [page:Plane] to check for intersection against.
Determines whether or not this box intersects [page:Plane plane].
[method:Boolean intersectsSphere]( [param:Sphere sphere] )
[page:Sphere sphere] - [page:Sphere] to check for intersection against.
Determines whether or not this box intersects [page:Sphere sphere].
[method:Boolean intersectsTriangle]( [param:Triangle triangle] )
[page:Triangle triangle] - [page:Triangle] to check for intersection
against.
Determines whether or not this box intersects [page:Triangle triangle].
[method:Boolean isEmpty]()
Returns true if this box includes zero points within its bounds.
Note that a box with equal lower and upper bounds still includes one
point, the one both bounds share.
[method:this makeEmpty]()
Makes this box empty.
[method:this set]( [param:Vector3 min], [param:Vector3 max] )
[page:Vector3 min] - [page:Vector3] representing the lower (x, y, z)
boundary of the box.
[page:Vector3 max] - [page:Vector3] representing the upper (x, y, z)
boundary of the box.
Sets the lower and upper (x, y, z) boundaries of this box.
Please note that this method only copies the values from the given
objects.
[method:this setFromArray]( [param:Array array] )
array -- An array of position data that the resulting box will envelop.
Sets the upper and lower bounds of this box to include all of the data in
`array`.
[method:this setFromBufferAttribute]( [param:BufferAttribute attribute] )
[page:BufferAttribute attribute] - A buffer attribute of position data
that the resulting box will envelop.
Sets the upper and lower bounds of this box to include all of the data in
[page:BufferAttribute attribute].
[method:this setFromCenterAndSize]( [param:Vector3 center], [param:Vector3 size] )
[page:Vector3 center], - Desired center position of the box.
[page:Vector3 size] - Desired x, y and z dimensions of the box.
Centers this box on [page:Vector3 center] and sets this box's width,
height and depth to the values specified
in [page:Vector3 size]
[method:this setFromObject]( [param:Object3D object], [param:Boolean precise] )
[page:Object3D object] - [page:Object3D] to compute the bounding box
of.
precise - (optional) compute the smallest world-axis-aligned bounding box
at the expense of more computation. Default is false.
Computes the world-axis-aligned bounding box of an [page:Object3D]
(including its children), accounting for the object's, and children's,
world transforms. The function may result in a larger box than strictly
necessary.
[method:this setFromPoints]( [param:Array points] )
[page:Array points] - Array of [page:Vector3 Vector3s] that the resulting
box will contain.
Sets the upper and lower bounds of this box to include all of the points
in [page:Array points].
[method:this translate]( [param:Vector3 offset] )
[page:Vector3 offset] - Direction and distance of offset.
Adds [page:Vector3 offset] to both the upper and lower bounds of this box,
effectively moving this box [page:Vector3 offset] units in 3D space.
[method:this union]( [param:Box3 box] )
[page:Box3 box] - Box that will be unioned with this box.
Computes the union of this box and [page:Box3 box], setting the upper
bound of this box to the greater of the two boxes' upper bounds and the
lower bound of this box to the lesser of the two boxes' lower bounds.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
[name] can be used to generate a convex hull for a given array of 3D points.
The average time complexity for this task is considered to be O(nlog(n)).
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
Code Example
const geometry = new ConvexGeometry( points );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
Examples
[example:webgl_geometry_convex geometry / convex ]
Constructor
[name]( [param:Array points] )
points — Array of [page:Vector3 Vector3s] that the resulting convex hull will contain.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/ConvexGeometry.js examples/jsm/geometries/ConvexGeometry.js]

[name]
An [name] is a reusable set of keyframe tracks which represent an
animation.
For an overview of the different elements of the three.js animation system
see the "Animation System" article in the "Next Steps" section of the
manual.
Constructor
[name]( [param:String name], [param:Number duration], [param:Array tracks] )
[page:String name] - a name for this clip.
[page:Number duration] - the duration of this clip (in seconds). If a
negative value is passed, the duration will be calculated from the passed
`tracks` array.
[page:Array tracks] - an array of [page:KeyframeTrack KeyframeTracks].
[page:Number blendMode] - defines how the animation is blended/combined
when two or more animations are simultaneously played.
Note: Instead of instantiating an AnimationClip directly with the
constructor, you can use one of its static methods to create
AnimationClips: from JSON ([page:.parse parse]), from morph target
sequences ([page:.CreateFromMorphTargetSequence CreateFromMorphTargetSequence],
[page:.CreateClipsFromMorphTargetSequences CreateClipsFromMorphTargetSequences]) or from animation hierarchies
([page:.parseAnimation parseAnimation]) - if your model doesn't already
hold AnimationClips in its geometry's animations array.
Properties
[property:Number blendMode]
Defines how the animation is blended/combined when two or more animations
are simultaneously played. Valid values are *NormalAnimationBlendMode*
(default) and *AdditiveAnimationBlendMode*.
[property:Number duration]
The duration of this clip (in seconds). This can be calculated from the
[page:.tracks tracks] array via [page:.resetDuration resetDuration].
[property:String name]
A name for this clip. A certain clip can be searched via [page:.findByName findByName].
[property:Array tracks]
An array containing a [page:KeyframeTrack] for each property that are
animated by this clip.
[property:String uuid]
The [link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID]
of this clip instance. It gets automatically assigned and shouldn't be
edited.
Methods
[method:AnimationClip clone]()
Returns a copy of this clip.
[method:this optimize]()
Optimizes each track by removing equivalent sequential keys (which are
common in morph target sequences).
[method:this resetDuration]()
Sets the [page:.duration duration] of the clip to the duration of its
longest [page:KeyframeTrack].
[method:Object toJSON]()
Returns a JSON object representing the serialized animation clip.
[method:this trim]()
Trims all tracks to the clip's duration.
[method:Boolean validate]()
Performs minimal validation on each track in the clip. Returns true if all
tracks are valid.
Static Methods
[method:Array CreateClipsFromMorphTargetSequences]( [param:String name], [param:Array morphTargetSequence], [param:Number fps], [param:Boolean noLoop] )
Returns an array of new AnimationClips created from the morph target
sequences of a geometry, trying to sort morph target names into
animation-group-based patterns like "Walk_001, Walk_002, Run_001, Run_002...".
[method:AnimationClip CreateFromMorphTargetSequence]( [param:String name], [param:Array morphTargetSequence], [param:Number fps], [param:Boolean noLoop] )
Returns a new AnimationClip from the passed morph targets array of a
geometry, taking a name and the number of frames per second.
Note: The fps parameter is required, but the animation speed can be
overridden in an `AnimationAction` via [page:AnimationAction.setDuration animationAction.setDuration].
[method:AnimationClip findByName]( [param:Object objectOrClipArray], [param:String name] )
Searches for an AnimationClip by name, taking as its first parameter
either an array of AnimationClips, or a mesh or geometry that contains an
array named "animations".
[method:AnimationClip parse]( [param:Object json] )
Parses a JSON representation of a clip and returns an AnimationClip.
[method:AnimationClip parseAnimation]( [param:Object animation], [param:Array bones] )
Parses the animation.hierarchy format and returns an AnimationClip.
[method:Object toJSON]( [param:AnimationClip clip] )
Takes an AnimationClip and returns a JSON object.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading a `.obj` resource.
The [link:https://en.wikipedia.org/wiki/Wavefront_.obj_file OBJ file format] is a simple data-format
that represents 3D geometry in a human readable format as the position of each vertex, the UV position of
each texture coordinate vertex, vertex normals, and the faces that make each polygon defined as a list of
vertices, and texture vertices.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
Code Example
// instantiate a loader
const loader = new OBJLoader();
// load a resource
loader.load(
// resource URL
'models/monster.obj',
// called when resource is loaded
function ( object ) {
scene.add( object );
},
// called when loading is in progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_obj]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.obj` file.
[page:Function onLoad] — (optional) A function to be called after the loading is successfully completed. The function receives the loaded [page:Object3D] as an argument.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The function receives a XMLHttpRequest instance, which contains [page:Integer total] and [page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
Begin loading from url and call onLoad with the parsed response content.
[method:Object3D parse]( [param:String text] )
[page:String text] — The textual `obj` structure to parse.
Returns an [page:Object3D]. It contains the parsed meshes as [page:Mesh] and lines as [page:LineSegments].
All geometry is created as [page:BufferGeometry]. Default materials are created as [page:MeshPhongMaterial].
If an `obj` object or group uses multiple materials while declaring faces, geometry groups and an array of materials are used.
[method:this setMaterials]( [param:MTLLoader.MaterialCreator materials] )
[page:MTLLoaderMaterialCreator MTLLoader.MaterialCreator materials] - A MaterialCreator instance.
Sets materials loaded by MTLLoader or any other supplier of a [page:MTLLoaderMaterialCreator MTLLoader.MaterialCreator].
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/OBJLoader.js examples/jsm/loaders/OBJLoader.js]

[page:Object3D] →
[name]
An 3D arrow object for visualizing directions.
Code Example
const dir = new THREE.Vector3( 1, 2, 0 );
//normalize the direction vector (convert to vector of length 1)
dir.normalize();
const origin = new THREE.Vector3( 0, 0, 0 );
const length = 1;
const hex = 0xffff00;
const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
scene.add( arrowHelper );
Examples
[example:webgl_shadowmesh WebGL / shadowmesh]
Constructor
[name]([param:Vector3 dir], [param:Vector3 origin], [param:Number length],
[param:Number hex], [param:Number headLength], [param:Number headWidth] )
[page:Vector3 dir] -- direction from origin. Must be a unit vector.
[page:Vector3 origin] -- Point at which the arrow starts.
[page:Number length] -- length of the arrow. Default is `1`.
[page:Number hex] -- hexadecimal value to define color. Default is
0xffff00.
[page:Number headLength] -- The length of the head of the arrow. Default
is `0.2` * length.
[page:Number headWidth] -- The width of the head of the arrow. Default is
`0.2` * headLength.
Properties
See the base [page:Object3D] class for common properties.
[property:Line line]
Contains the line part of the arrowHelper.
[property:Mesh cone]
Contains the cone part of the arrowHelper.
Methods
See the base [page:Object3D] class for common methods.
[method:undefined setColor]([param:Color color])
color -- The desired color.
Sets the color of the arrowHelper.
[method:undefined setLength]([param:Number length], [param:Number headLength], [param:Number headWidth])
length -- The desired length.
headLength -- The length of the head of the arrow.
headWidth -- The width of the head of the arrow.
Sets the length of the arrowhelper.
[method:undefined setDirection]([param:Vector3 dir])
dir -- The desired direction. Must be a unit vector.
Sets the direction of the arrowhelper.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for loading a `.tga` resource.
[link:https://en.wikipedia.org/wiki/Truevision_TGA TGA] is a raster graphics, image file format.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { TGALoader } from 'three/addons/loaders/TGALoader.js';
Code Example
// instantiate a loader
const loader = new TGALoader();
// load a resource
const texture = loader.load(
// resource URL
'textures/crate_grey8.tga'
// called when loading is completed
function ( texture ) {
console.log( 'Texture is loaded' );
},
// called when the loading is in progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when the loading fails
function ( error ) {
console.log( 'An error happened' );
}
);
const material = new THREE.MeshPhongMaterial( {
color: 0xffffff,
map: texture
} );
Examples
[example:webgl_loader_texture_tga]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:DataTexture load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.tga` file.
[page:Function onLoad] — (optional) A function to be called after loading is successfully completed. The function receives loaded [page:DataTexture] as an argument.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains .[page:Integer total] and .[page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.
Begin loading from url and pass the loaded [page:DataTexture texture] to onLoad. The [page:DataTexture texture] is also directly returned for immediate use (but may not be fully loaded).
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/TGALoader.js examples/jsm/loaders/TGALoader.js]

[page:Interpolant] →
[name]
Code Example
const interpolant = new THREE.[name](
new Float32Array( 2 ),
new Float32Array( 2 ),
1,
new Float32Array( 1 )
);
interpolant.evaluate( 0.5 );
Constructor
[name]( parameterPositions, sampleValues, sampleSize, resultBuffer )
parameterPositions -- array of positions
sampleValues -- array of samples
sampleSize -- number of samples
resultBuffer -- buffer to store the interpolation results.
Properties
[property:null parameterPositions]
[property:null resultBuffer]
[property:null sampleValues]
[property:Object settings]
[property:null valueSize]
Methods
[method:Array evaluate]( [param:Number t] )
Evaluate the interpolant at position *t*.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
Creates a tube that extrudes along a 3d curve.
Code Example
class CustomSinCurve extends THREE.Curve {
constructor( scale = 1 ) {
super();
this.scale = scale;
}
getPoint( t, optionalTarget = new THREE.Vector3() ) {
const tx = t * 3 - 1.5;
const ty = Math.sin( 2 * Math.PI * t );
const tz = 0;
return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
}
}
const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
Constructor
[name]([param:Curve path], [param:Integer tubularSegments], [param:Float radius], [param:Integer radialSegments], [param:Boolean closed])
path — [page:Curve] - A 3D path that inherits from the [page:Curve] base
class. Default is a quadratic bezier curve.
tubularSegments — [page:Integer] - The number of segments that make up the
tube. Default is `64`.
radius — [page:Float] - The radius of the tube. Default is `1`.
radialSegments — [page:Integer] - The number of segments that make up the
cross-section. Default is `8`.
closed — [page:Boolean] Is the tube open or closed. Default is `false`.
Properties
See the base [page:BufferGeometry] class for common properties.
[property:Object parameters]
An object with a property for each of the constructor parameters. Any
modification after instantiation does not change the geometry.
[property:Array tangents]
An array of [page:Vector3] tangents
[property:Array normals]
An array of [page:Vector3] normals
[property:Array binormals]
An array of [page:Vector3] binormals
Methods
See the base [page:BufferGeometry] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:LightShadow] →
[name]
This is used internally by [page:DirectionalLight DirectionalLights] for
calculating shadows.
Unlike the other shadow classes, this uses an [page:OrthographicCamera] to
calculate the shadows, rather than a [page:PerspectiveCamera]. This is
because light rays from a [page:DirectionalLight] are parallel.
Code Example
//Create a WebGLRenderer and turn on shadows in the renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );
//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );
//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add( plane );
//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
Constructor
[name]( )
Creates a new [name]. This is not intended to be called directly - it is
called internally by [page:DirectionalLight].
Properties
See the base [page:LightShadow LightShadow] class for common properties.
[property:Camera camera]
The light's view of the world. This is used to generate a depth map of the
scene; objects behind other objects from the light's perspective will be
in shadow.
The default is an [page:OrthographicCamera] with
[page:OrthographicCamera.left left] and [page:OrthographicCamera.bottom bottom]
set to `-5`, [page:OrthographicCamera.right right] and
[page:OrthographicCamera.top top] set to `5`, the
[page:OrthographicCamera.near near] clipping plane at `0.5` and the
[page:OrthographicCamera.far far] clipping plane at `500`.
[property:Boolean isDirectionalLightShadow]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:LightShadow LightShadow] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/lights/[name].js src/lights/[name].js]

[page:Object3D] → [page:Light] →
[name]
A light that gets emitted in a specific direction. This light will behave
as though it is infinitely far away and the rays produced from it are all
parallel. The common use case for this is to simulate daylight; the sun is
far enough away that its position can be considered to be infinite, and
all light rays coming from it are parallel.
This light can cast shadows - see the [page:DirectionalLightShadow] page
for details.
A Note about Position, Target and rotation
A common point of confusion for directional lights is that setting the
rotation has no effect. This is because three.js's DirectionalLight is the
equivalent to what is often called a 'Target Direct Light' in other
applications.
This means that its direction is calculated as pointing from the light's
[page:Object3D.position position] to the [page:.target target]'s position
(as opposed to a 'Free Direct Light' that just has a rotation
component).
The reason for this is to allow the light to cast shadows - the
[page:.shadow shadow] camera needs a position to calculate shadows
from.
See the [page:.target target] property below for details on updating the
target.
Code Example
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
Examples
[example:misc_controls_fly controls / fly ]
[example:webgl_effects_parallaxbarrier effects / parallaxbarrier ]
[example:webgl_effects_stereo effects / stereo ]
[example:webgl_geometry_extrude_splines geometry / extrude / splines ]
[example:webgl_materials_bumpmap materials / bumpmap ]
Constructor
[name]( [param:Integer color], [param:Float intensity] )
[page:Integer color] - (optional) hexadecimal color of the light. Default
is 0xffffff (white).
[page:Float intensity] - (optional) numeric value of the light's
strength/intensity. Default is `1`.
Creates a new [name].
Properties
See the base [page:Light Light] class for common properties.
[property:Boolean castShadow]
If set to `true` light will cast dynamic shadows. *Warning*: This is
expensive and requires tweaking to get shadows looking right. See the
[page:DirectionalLightShadow] for details. The default is `false`.
[property:Boolean isDirectionalLight]
Read-only flag to check if a given object is of type [name].
[property:Vector3 position]
This is set equal to [page:Object3D.DEFAULT_UP] (0, 1, 0), so that the
light shines from the top down.
[property:DirectionalLightShadow shadow]
A [page:DirectionalLightShadow] used to calculate shadows for this light.
[property:Object3D target]
The DirectionalLight points from its [page:.position position] to
target.position. The default position of the target is `(0, 0, 0)`.
*Note*: For the target's position to be changed to anything other than the
default, it must be added to the [page:Scene scene] using
scene.add( light.target );
This is so that the target's [page:Object3D.matrixWorld matrixWorld] gets
automatically updated each frame.
It is also possible to set the target to be another object in the scene
(anything with a [page:Object3D.position position] property), like so:
const targetObject = new THREE.Object3D();
scene.add(targetObject);
light.target = targetObject;
The directionalLight will now track the target object.
Methods
See the base [page:Light Light] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:this copy]( [param:DirectionalLight source] )
Copies value of all the properties from the [page:DirectionalLight source]
to this DirectionalLight.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
Class for loading an
[link:https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer AudioBuffer].
This uses the [page:FileLoader] internally for loading
files.
Code Example
// instantiate a listener
const audioListener = new THREE.AudioListener();
// add the listener to the camera
camera.add( audioListener );
// instantiate audio object
const oceanAmbientSound = new THREE.Audio( audioListener );
// add the audio object to the scene
scene.add( oceanAmbientSound );
// instantiate a loader
const loader = new THREE.AudioLoader();
// load a resource
loader.load(
// resource URL
'audio/ambient_ocean.ogg',
// onLoad callback
function ( audioBuffer ) {
// set the audio object buffer to the loaded object
oceanAmbientSound.setBuffer( audioBuffer );
// play the audio
oceanAmbientSound.play();
},
// onProgress callback
function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
// onError callback
function ( err ) {
console.log( 'An error happened' );
}
);
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] — Will be called when load completes. The argument
will be the loaded text response.
[page:Function onProgress] (optional) — Will be called while load
progresses. The argument will be the ProgressEvent instance, which
contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and pass the loaded [page:String AudioBuffer] to
onLoad.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Interpolant] →
[name]
Code Example
const interpolant = new THREE.[name](
new Float32Array( 2 ),
new Float32Array( 2 ),
1,
new Float32Array( 1 )
);
interpolant.evaluate( 0.5 );
Constructor
[name]( parameterPositions, sampleValues, sampleSize, resultBuffer )
parameterPositions -- array of positions
sampleValues -- array of samples
sampleSize -- number of samples
resultBuffer -- buffer to store the interpolation results.
Properties
[property:null parameterPositions]
[property:null resultBuffer]
[property:null sampleValues]
[property:Object settings]
[property:null valueSize]
Methods
[method:Array evaluate]( [param:Number t] )
Evaluate the interpolant at position *t*.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
An exporter for `glTF` 2.0.
[link:https://www.khronos.org/gltf glTF] (GL Transmission Format) is an
[link:https://github.com/KhronosGroup/glTF/tree/master/specification/2.0 open format specification]
for efficient delivery and loading of 3D content. Assets may be provided either in JSON (.gltf)
or binary (.glb) format. External files store textures (.jpg, .png) and additional binary
data (.bin). A glTF asset may deliver one or more scenes, including meshes, materials,
textures, skins, skeletons, morph targets, animations, lights, and/or cameras.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
Extensions
GLTFExporter supports the following
[link:https://github.com/KhronosGroup/glTF/tree/master/extensions/ glTF 2.0 extensions]:
KHR_lights_punctual
KHR_materials_clearcoat
KHR_materials_emissive_strength
KHR_materials_ior
KHR_materials_iridescence
KHR_materials_specular
KHR_materials_sheen
KHR_materials_transmission
KHR_materials_unlit
KHR_materials_volume
KHR_mesh_quantization
KHR_texture_transform
The following glTF 2.0 extension is supported by an external user plugin
[link:https://github.com/takahirox/three-gltf-extensions KHR_materials_variants]
Code Example
// Instantiate a exporter
const exporter = new GLTFExporter();
// Parse the input and generate the glTF output
exporter.parse(
scene,
// called when the gltf has been generated
function ( gltf ) {
console.log( gltf );
downloadJSON( gltf );
},
// called when there is an error in the generation
function ( error ) {
console.log( 'An error happened' );
},
options
);
Examples
[example:misc_exporter_gltf]
Constructor
[name]()
Creates a new [name].
Methods
[method:undefined parse]( [param:Object3D input], [param:Function onCompleted], [param:Function onError], [param:Object options] )
[page:Object input] — Scenes or objects to export. Valid options:
Export scenes
exporter.parse( scene1, ... )
exporter.parse( [ scene1, scene2 ], ... )
Export objects (It will create a new Scene to hold all the objects)
exporter.parse( object1, ... )
exporter.parse( [ object1, object2 ], ... )
Mix scenes and objects (It will export the scenes as usual but it will create a new scene to hold all the single objects).
exporter.parse( [ scene1, object1, object2, scene2 ], ... )
[page:Function onCompleted] — Will be called when the export completes. The argument will be the generated glTF JSON or binary ArrayBuffer.
[page:Function onError] — Will be called if there are any errors during the gltf generation.
[page:Options options] — Export options
trs - bool. Export position, rotation and scale instead of matrix per node. Default is false
onlyVisible - bool. Export only visible objects. Default is true.
binary - bool. Export in binary (.glb) format, returning an ArrayBuffer. Default is false.
maxTextureSize - int. Restricts the image maximum size (both width and height) to the given value. Default is Infinity.
animations - Array<[page:AnimationClip AnimationClip]>. List of animations to be included in the export.
includeCustomExtensions - bool. Export custom glTF extensions defined on an object's `userData.gltfExtensions` property. Default is false.
Generates a .gltf (JSON) or .glb (binary) output from the input (Scenes or Objects)
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/exporters/GLTFExporter.js examples/jsm/exporters/GLTFExporter.js]

[page:BufferAttribute] →
[name]
An instanced version of [page:BufferAttribute].
Constructor
[name]( [param:TypedArray array], [param:Integer itemSize], [param:Boolean normalized], [param:Number meshPerAttribute] )
Properties
See [page:BufferAttribute] for inherited properties.
[property:Number meshPerAttribute]
Defines how often a value of this buffer attribute should be repeated. A
value of one means that each value of the instanced attribute is used for
a single instance. A value of two means that each value is used for two
consecutive instances (and so on). Default is `1`.
Methods
See [page:BufferAttribute] for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
This class is an alternative to [page:Clock] with a different API design and behavior.
The goal is to avoid the conceptual flaws that became apparent in [page:Clock] over time.
[name] has an [page:.update]() method that updates its internal state. That makes it possible to call [page:.getDelta]() and [page:.getElapsed]() multiple times per simulation step without getting different values.
The class uses the Page Visibility API to avoid large time delta values when the app is inactive (e.g. tab switched or browser hidden).
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { Timer } from 'three/addons/misc/Timer.js';
Code Example
const timer = new Timer();
function animate( timestamp ) {
requestAnimationFrame( animate );
// timestamp is optional
timer.update( timestamp );
const delta = timer.getDelta();
// do something with delta
renderer.render( scene, camera );
}
Examples
[example:webgl_morphtargets_sphere WebGL / morphtargets / sphere]
Constructor
Timer()
Methods
[method:Number getDelta]()
Returns the time delta in seconds.
[method:Number getElapsed]()
Returns the elapsed time in seconds.
[method:this setTimescale]( [param:Number timescale] )
Sets a time scale that scales the time delta in [page:.update]().
[method:this reset]()
Resets the time computation for the current simulation step.
[method:this dispose]()
Can be used to free all internal resources. Usually called when the timer instance isn't required anymore.
[method:this update]( [param:Number timestamp] )
timestamp -- (optional) The current time in milliseconds. Can be obtained from the
[link:https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame requestAnimationFrame]
callback argument. If not provided, the current time will be determined with
[link:https://developer.mozilla.org/en-US/docs/Web/API/Performance/now performance.now].
Updates the internal state of the timer. This method should be called once per simulation step
and before you perform queries against the timer (e.g. via [page:.getDelta]()).
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/misc/Timer.js examples/jsm/misc/Timer.js]

[name]
Create a texture to apply to a surface or as a reflection or refraction
map.
Note: After the initial use of a texture, its dimensions, format, and type
cannot be changed. Instead, call [page:.dispose]() on the texture and
instantiate a new one.
Code Example
// load a texture, set wrap mode to repeat
const texture = new THREE.TextureLoader().load( "textures/water.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
Constructor
[name]( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type,
anisotropy, colorSpace )
Properties
[property:Integer id]
Readonly - unique number for this texture instance.
[property:Boolean isTexture]
Read-only flag to check if a given object is of type [name].
[property:String uuid]
[link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID] of
this object instance. This gets automatically assigned, so this shouldn't
be edited.
[property:String name]
Optional name of the object (doesn't need to be unique). Default is an
empty string.
[property:Image image]
An image object, typically created using the [page:TextureLoader.load]
method. This can be any image (e.g., PNG, JPG, GIF, DDS) or video (e.g.,
MP4, OGG/OGV) type supported by three.js.
To use video as a texture you need to have a playing HTML5 video element
as a source for your texture image and continuously update this texture as
long as video is playing - the [page:VideoTexture VideoTexture] class
handles this automatically.
[property:Array mipmaps]
Array of user-specified mipmaps (optional).
[property:number mapping]
How the image is applied to the object. An object type of [page:Textures THREE.UVMapping]
is the default, where the U,V coordinates are used to
apply the map.
See the [page:Textures texture constants] page for other mapping types.
[property:Integer channel]
Lets you select the uv attribute to map the texture to. `0` for `uv`,
`1` for `uv1`, `2` for `uv2` and `3` for `uv3`.
[property:number wrapS]
This defines how the texture is wrapped horizontally and corresponds to
*U* in UV mapping.
The default is [page:Textures THREE.ClampToEdgeWrapping], where the edge
is clamped to the outer edge texels. The other two choices are
[page:Textures THREE.RepeatWrapping] and [page:Textures THREE.MirroredRepeatWrapping].
See the [page:Textures texture constants]
page for details.
[property:number wrapT]
This defines how the texture is wrapped vertically and corresponds to *V*
in UV mapping.
The same choices are available as for [property:number wrapS].
NOTE: tiling of images in textures only functions if image dimensions are
powers of two (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in
terms of pixels. Individual dimensions need not be equal, but each must be
a power of two. This is a limitation of WebGL, not three.js.
[property:number magFilter]
How the texture is sampled when a texel covers more than one pixel. The
default is [page:Textures THREE.LinearFilter], which takes the four
closest texels and bilinearly interpolates among them. The other option is
[page:Textures THREE.NearestFilter], which uses the value of the closest
texel.
See the [page:Textures texture constants] page for details.
[property:number minFilter]
How the texture is sampled when a texel covers less than one pixel. The
default is [page:Textures THREE.LinearMipmapLinearFilter], which uses
mipmapping and a trilinear filter.
See the [page:Textures texture constants] page for all possible choices.
[property:number anisotropy]
The number of samples taken along the axis through the pixel that has the
highest density of texels. By default, this value is `1`. A higher value
gives a less blurry result than a basic mipmap, at the cost of more
texture samples being used. Use [page:WebGLRenderer.capabilities renderer.capabilities.getMaxAnisotropy]()
to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
[property:number format]
The default is [page:Textures THREE.RGBAFormat].
See the [page:Textures texture constants] page for details of other
formats.
[property:String internalFormat]
The default value is obtained using a combination of [page:Texture.format .format] and [page:Texture.type .type].
The GPU format allows the developer to specify how the data is going to be
stored on the GPU.
See the [page:Textures texture constants] page for details regarding all
supported internal formats.
[property:number type]
This must correspond to the [page:Texture.format .format]. The default is
[page:Textures THREE.UnsignedByteType], which will be used for most
texture formats.
See the [page:Textures texture constants] page for details of other
formats.
[property:Vector2 offset]
How much a single repetition of the texture is offset from the beginning,
in each direction U and V. Typical range is `0.0` to `1.0`.
[property:Vector2 repeat]
How many times the texture is repeated across the surface, in each
direction U and V. If repeat is set greater than 1 in either direction,
the corresponding Wrap parameter should also be set to [page:Textures THREE.RepeatWrapping]
or [page:Textures THREE.MirroredRepeatWrapping] to
achieve the desired tiling effect.
[property:number rotation]
How much the texture is rotated around the center point, in radians.
Positive values are counter-clockwise. Default is `0`.
[property:Vector2 center]
The point around which rotation occurs. A value of (0.5, 0.5) corresponds
to the center of the texture. Default is (0, 0), the lower left.
[property:Boolean matrixAutoUpdate]
Whether to update the texture's uv-transform [page:Texture.matrix .matrix]
from the texture properties [page:Texture.offset .offset],
[page:Texture.repeat .repeat], [page:Texture.rotation .rotation], and
[page:Texture.center .center]. True by default. Set this to false if you
are specifying the uv-transform matrix directly.
[property:Matrix3 matrix]
The uv-transform matrix for the texture. Updated by the renderer from the
texture properties [page:Texture.offset .offset], [page:Texture.repeat .repeat],
[page:Texture.rotation .rotation], and [page:Texture.center .center]
when the texture's [page:Texture.matrixAutoUpdate .matrixAutoUpdate]
property is true. When [page:Texture.matrixAutoUpdate .matrixAutoUpdate]
property is false, this matrix may be set manually.
Default is the identity matrix.
[property:Boolean generateMipmaps]
Whether to generate mipmaps (if possible) for a texture. True by default.
Set this to false if you are creating mipmaps manually.
[property:Boolean premultiplyAlpha]
If set to `true`, the alpha channel, if present, is multiplied into the
color channels when the texture is uploaded to the GPU. Default is
`false`.
Note that this property has no effect for
[link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap ImageBitmap].
You need to configure on bitmap creation instead. See
[page:ImageBitmapLoader].
[property:Boolean flipY]
If set to `true`, the texture is flipped along the vertical axis when
uploaded to the GPU. Default is `true`.
Note that this property has no effect for
[link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap ImageBitmap].
You need to configure on bitmap creation instead. See
[page:ImageBitmapLoader].
[property:number unpackAlignment]
4 by default. Specifies the alignment requirements for the start of each
pixel row in memory. The allowable values are 1 (byte-alignment), 2 (rows
aligned to even-numbered bytes), 4 (word-alignment), and 8 (rows start on
double-word boundaries). See
[link:http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml glPixelStorei] for more information.
[property:string colorSpace]
[page:Textures THREE.NoColorSpace] is the default. Textures containing color data should be
annotated with [page:Textures THREE.SRGBColorSpace] or
[page:Textures THREE.LinearSRGBColorSpace].
[property:Integer version]
This starts at `0` and counts how many times [page:Texture.needsUpdate .needsUpdate] is set to `true`.
[property:Function onUpdate]
A callback function, called when the texture is updated (e.g., when
needsUpdate has been set to true and then the texture is used).
[property:Boolean needsUpdate]
Set this to `true` to trigger an update next time the texture is used.
Particularly important for setting the wrap mode.
[property:Object userData]
An object that can be used to store custom data about the texture. It
should not hold references to functions as these will not be cloned.
Default is an empty object `{}`.
[property:Source source]
The data definition of a texture. A reference to the data source can be
shared across textures. This is often useful in context of spritesheets
where multiple textures render the same data but with different texture
transformations.
Methods
[page:EventDispatcher EventDispatcher] methods are available on this
class.
[method:undefined updateMatrix]()
Update the texture's uv-transform [page:Texture.matrix .matrix] from the
texture properties [page:Texture.offset .offset], [page:Texture.repeat .repeat],
[page:Texture.rotation .rotation], and [page:Texture.center .center].
[method:Texture clone]()
Make copy of the texture. Note this is not a "deep copy", the image is
shared. Besides, cloning a texture does not automatically mark it for a
texture upload. You have to set [page:Texture.needsUpdate .needsUpdate] to
true as soon as its image property (the data source) is fully loaded or
ready.
[method:Object toJSON]( [param:Object meta] )
meta -- optional object containing metadata.
Convert the texture to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:Vector2 transformUv]( [param:Vector2 uv] )
Transform the uv based on the value of this texture's [page:Texture.offset .offset],
[page:Texture.repeat .repeat], [page:Texture.wrapS .wrapS],
[page:Texture.wrapT .wrapT] and [page:Texture.flipY .flipY] properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Mesh] →
[name]
Renders a sphere to visualize a light probe in the scene.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { LightProbeHelper } from 'three/addons/helpers/LightProbeHelper.js';
Code Example
const helper = new LightProbeHelper( lightProbe, 1 );
scene.add( helper );
Examples
[example:webgl_lightprobe_cubecamera WebGL / lightprobe / cubecamera]
Constructor
[name]( [param:LightProbe lightProbe], [param:Number size] )
[page:LightProbe lightProbe] -- the light probe.
[page:Number size] -- size of the helper sphere
Properties
See the base [page:Mesh] class for common properties.
[property:LightProbe lightProbe]
The light probe.
[property:Number size]
The size of the helper sphere.
Methods
See the base [page:Mesh] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/LightProbeHelper.js examples/jsm/helpers/LightProbeHelper.js]

[name]
[name] enables a navigation similar to fly modes in DCC tools like Blender. You can arbitrarily transform the camera in
3D space without any limitations (e.g. focus on a specific target).
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { FlyControls } from 'three/addons/controls/FlyControls.js';
Examples
[example:misc_controls_fly misc / controls / fly ]
Constructor
[name]( [param:Camera object], [param:HTMLDOMElement domElement] )
[page:Camera object]: The camera to be controlled.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Creates a new instance of [name].
Events
change
Fires when the camera has been transformed by the controls.
Properties
[property:Boolean autoForward]
If set to `true`, the camera automatically moves forward (and does not stop) when initially translated. Default is `false`.
[property:HTMLDOMElement domElement]
The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will
not set up new event listeners.
[property:Boolean dragToLook]
If set to `true`, you can only look around by performing a drag interaction. Default is `false`.
[property:Boolean enabled]
When set to `false`, the controls will not respond to user input. Default is `true`.
[property:Number movementSpeed]
The movement speed. Default is *1*.
[property:Camera object]
The camera to be controlled.
[property:Number rollSpeed]
The rotation speed. Default is `0.005`.
Methods
[method:undefined dispose] ()
Should be called if the controls is no longer required.
[method:undefined update] ( [param:Number delta] )
[page:Number delta]: Time delta value.
Updates the controls. Usually called in the animation loop.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/FlyControls.js examples/jsm/controls/FlyControls.js]

[page:Object3D] →
[name]
Scenes allow you to set up what and where is to be rendered by three.js.
This is where you place objects, lights and cameras.
Constructor
[name]()
Create a new scene object.
Properties
[property:Object background]
Defines the background of the scene. Default is `null`. Valid inputs are:
A [page:Color] for defining a uniform colored background.
A [page:Texture] for defining a (flat) textured background.
Texture cubes ([page:CubeTexture]) or equirectangular textures for
defining a skybox.
Note: Any camera related configurations like `zoom` or `view` are ignored.
[property:Float backgroundBlurriness]
Sets the blurriness of the background. Only influences environment maps
assigned to [page:Scene.background]. Valid input is a float between `0`
and `1`. Default is `0`.
[property:Float backgroundIntensity]
Attenuates the color of the background. Only applies to background
textures. Default is `1`.
[property:Euler backgroundRotation]
The rotation of the background in radians. Only influences environment maps
assigned to [page:Scene.background]. Default is `(0,0,0)`.
[property:Texture environment]
Sets the environment map for all physical materials in the scene. However,
it's not possible to overwrite an existing texture assigned to
[page:MeshStandardMaterial.envMap]. Default is `null`.
[property:Float environmentIntensity]
Attenuates the color of the environment. Only influences environment maps
assigned to [page:Scene.environment]. Default is `1`.
[property:Euler environmentRotation]
The rotation of the environment map in radians. Only influences physical materials
in the scene when [page:.environment] is used. Default is `(0,0,0)`.
[property:Fog fog]
A [page:Fog fog] instance defining the type of fog that affects everything
rendered in the scene. Default is `null`.
[property:Boolean isScene]
Read-only flag to check if a given object is of type [name].
[property:Material overrideMaterial]
Forces everything in the scene to be rendered with the defined material.
Default is `null`.
Methods
[method:Object toJSON]( [param:Object meta] )
meta -- object containing metadata such as textures or images for the
scene.
Convert the scene to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
An exporter for `PLY`.
[link:https://en.wikipedia.org/wiki/PLY_(file_format) PLY] (Polygon or Stanford Triangle Format) is a
file format for efficient delivery and loading of simple, static 3D content in a dense format.
Both binary and ascii formats are supported. PLY can store vertex positions, colors, normals and
uv coordinates. No textures or texture references are saved.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { PLYExporter } from 'three/addons/exporters/PLYExporter.js';
Code Example
// Instantiate an exporter
const exporter = new PLYExporter();
// Parse the input and generate the ply output
const data = exporter.parse( scene, options );
downloadFile( data );
Constructor
[name]()
Creates a new [name].
Methods
[method:Object parse]( [param:Object3D input], [param:Function onDone], [param:Object options] )
[page:Object input] — Object3D
[page:Function onCompleted] — Will be called when the export completes. The argument will be the generated ply ascii or binary ArrayBuffer.
[page:Options options] — Export options
excludeAttributes - array. Which properties to explicitly exclude from the exported PLY file. Valid values are 'color', 'normal', 'uv', and 'index'. If triangle indices are excluded, then a point cloud is exported. Default is an empty array.
binary - bool. Export in binary format, returning an ArrayBuffer. Default is false.
Generates ply file data as string or ArrayBuffer (ascii or binary) output from the input object. The data that is returned is the same
that is passed into the "onCompleted" function.
If the object is composed of multiple children and geometry, they are merged into a single mesh in the file.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/exporters/PLYExporter.js examples/jsm/exporters/PLYExporter.js]

[page:Object3D] →
[name]
Class representing triangular
[link:https://en.wikipedia.org/wiki/Polygon_mesh polygon mesh] based
objects. Also serves as a base for other classes such as
[page:SkinnedMesh].
Code Example
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
Constructor
[name]( [param:BufferGeometry geometry], [param:Material material] )
[page:BufferGeometry geometry] — (optional) an instance of
[page:BufferGeometry]. Default is a new [page:BufferGeometry].
[page:Material material] — (optional) a single or an array of
[page:Material]. Default is a new [page:MeshBasicMaterial]
Properties
See the base [page:Object3D] class for common properties.
[property:BufferGeometry geometry]
An instance of [page:BufferGeometry] (or derived classes), defining the
object's structure.
[property:Boolean isMesh]
Read-only flag to check if a given object is of type [name].
[property:Material material]
An instance of material derived from the [page:Material] base class or an
array of materials, defining the object's appearance. Default is a
[page:MeshBasicMaterial].
[property:Array morphTargetInfluences]
An array of weights typically from 0-1 that specify how much of the morph
is applied. Undefined by default, but reset to a blank array by
[page:Mesh.updateMorphTargets updateMorphTargets].
[property:Object morphTargetDictionary]
A dictionary of morphTargets based on the morphTarget.name property.
Undefined by default, but rebuilt [page:Mesh.updateMorphTargets updateMorphTargets].
Methods
See the base [page:Object3D] class for common methods.
[method:Mesh clone]()
Returns a clone of this [name] object and its descendants.
[method:Vector3 getVertexPosition]( [param:Integer index], [param:Vector3 target] )
Get the local-space position of the vertex at the given index, taking into
account the current animation state of both morph targets and skinning.
[method:undefined raycast]( [param:Raycaster raycaster], [param:Array intersects] )
Get intersections between a casted ray and this mesh.
[page:Raycaster.intersectObject] will call this method, but the results
are not ordered.
[method:undefined updateMorphTargets]()
Updates the morphTargets to have no influence on the object. Resets the
[page:Mesh.morphTargetInfluences morphTargetInfluences] and
[page:Mesh.morphTargetDictionary morphTargetDictionary] properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
The following is a collection of links that you might find useful when learning three.js.
If you find something that you'd like to add here, or think that one of the links below is no longer
relevant or working, feel free to click the 'edit' button in the bottom right and make some changes!
Note also that as three.js is under rapid development, a lot of these links will contain information that is
out of date - if something isn't working as you'd expect or as one of these links says it should,
check the browser console for warnings or errors. Also check the relevant docs pages.
Help forums
Three.js officially uses the [link:https://discourse.threejs.org/ forum] and [link:http://stackoverflow.com/tags/three.js/info Stack Overflow] for help requests.
If you need assistance with something, that's the place to go. Do NOT open an issue on Github for help requests.
Tutorials and courses
Getting started with three.js
[link:https://threejs.org/manual/#en/fundamentals Three.js Fundamentals starting lesson]
[link:https://codepen.io/rachsmith/post/beginning-with-3d-webgl-pt-1-the-scene Beginning with 3D WebGL] by [link:https://codepen.io/rachsmith/ Rachel Smith].
[link:https://www.august.com.au/blog/animating-scenes-with-webgl-three-js/ Animating scenes with WebGL and three.js]
More extensive / advanced articles and courses
[link:https://threejs-journey.com/ Three Journey] Course by [link:https://bruno-simon.com/ Bruno Simon] - Teaches beginners how to use Three.js step by step
[link:https://discoverthreejs.com/ Discover three.js]
[link:http://blog.cjgammon.com/ Collection of tutorials] by [link:http://www.cjgammon.com/ CJ Gammon].
[link:https://medium.com/soffritti.pierfrancesco/glossy-spheres-in-three-js-bfd2785d4857 Glossy spheres in three.js].
[link:https://www.udacity.com/course/cs291 Interactive 3D Graphics] - a free course on Udacity that teaches the fundamentals of 3D Graphics,
and uses three.js as its coding tool.
[Link:https://aerotwist.com/tutorials/ Aerotwist] tutorials by [link:https://github.com/paullewis/ Paul Lewis].
[link:https://discourse.threejs.org/t/three-js-bookshelf/2468 Three.js Bookshelf] - Looking for more resources about three.js or computer graphics in general?
Check out the selection of literature recommended by the community.
News and Updates
[link:https://twitter.com/hashtag/threejs Three.js on Twitter]
[link:http://www.reddit.com/r/threejs/ Three.js on reddit]
[link:http://www.reddit.com/r/webgl/ WebGL on reddit]
Examples
[link:https://github.com/edwinwebb/three-seed/ three-seed] - three.js starter project with ES6 and Webpack
[link:http://stemkoski.github.io/Three.js/index.html Professor Stemkoskis Examples] - a collection of beginner friendly
examples built using three.js r60.
[link:https://threejs.org/examples/ Official three.js examples] - these examples are
maintained as part of the three.js repository, and always use the latest version of three.js.
[link:https://raw.githack.com/mrdoob/three.js/dev/examples/ Official three.js dev branch examples]
-
Same as the above, except these use the dev branch of three.js,	and are used to check that
everything is working as three.js being is developed.
Tools
[link:https://github.com/tbensky/physgl physgl.org] - JavaScript front-end with wrappers to three.js, to bring WebGL
graphics to students learning physics and math.
[link:https://whsjs.readme.io/ Whitestorm.js] – Modular three.js framework with AmmoNext physics plugin.
[link:http://zz85.github.io/zz85-bookmarklets/threelabs.html Three.js Inspector]
[link:http://idflood.github.io/ThreeNodes.js/ ThreeNodes.js].
[link:https://marketplace.visualstudio.com/items?itemName=slevesque.shader vscode shader] - Syntax highlighter for shader language.
[link:https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates vscode comment-tagged-templates] - Syntax highlighting for tagged template strings using comments to shader language, like: glsl.js.
[link:https://github.com/MozillaReality/WebXR-emulator-extension WebXR-emulator-extension]
WebGL References
[link:https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf webgl-reference-card.pdf] - Reference of all WebGL and GLSL keywords, terminology, syntax and definitions.
Old Links
These links are kept for historical purposes - you may still find them useful, but be warned that
they may have information relating to very old versions of three.js.
[link:https://www.youtube.com/watch?v=Dir4KO9RdhM AlterQualia at WebGL Camp 3]
[link:http://yomotsu.github.io/threejs-examples/ Yomotsus Examples] - a collection of examples using three.js r45.
[link:http://fhtr.org/BasicsOfThreeJS/#1 Introduction to Three.js] by [link:http://github.com/kig/ Ilmari Heikkinen] (slideshow).
[link:http://www.slideshare.net/yomotsu/webgl-and-threejs WebGL and Three.js] by [link:http://github.com/yomotsu Akihiro Oyamada] (slideshow).
[link:https://www.youtube.com/watch?v=VdQnOaolrPA Trigger Rally]
by [link:https://github.com/jareiko jareiko] (video).
[link:http://blackjk3.github.io/threefab/ ThreeFab] - scene editor, maintained up until around three.js r50.
[link:http://bkcore.com/blog/3d/webgl-three-js-workflow-tips.html Max to Three.js workflow tips and tricks] by [link:https://github.com/BKcore BKcore]
[link:http://12devsofxmas.co.uk/2012/01/webgl-and-three-js/ A whirlwind look at Three.js]
by [link:http://github.com/nrocy Paul King]
[link:http://bkcore.com/blog/3d/webgl-three-js-animated-selective-glow.html Animated selective glow in Three.js]
by [link:https://github.com/BKcore BKcore]
[link:http://www.natural-science.or.jp/article/20120220155529.php Building A Physics Simulation Environment] - three.js tutorial in Japanese

[page:EventDispatcher] →
[name]
The implementation of this class is based on the [link:https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API Pointer Lock API].
[name] is a perfect choice for first person 3D games.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
Code Example
const controls = new PointerLockControls( camera, document.body );
// add event listener to show/hide a UI (e.g. the game's menu)
controls.addEventListener( 'lock', function () {
menu.style.display = 'none';
} );
controls.addEventListener( 'unlock', function () {
menu.style.display = 'block';
} );
Examples
[example:misc_controls_pointerlock misc / controls / pointerlock ]
Constructor
[name]( [param:Camera camera], [param:HTMLDOMElement domElement] )
[page:Camera camera]: The camera of the rendered scene.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Creates a new instance of [name].
Events
change
Fires when the user moves the mouse.
lock
Fires when the pointer lock status is "locked" (in other words: the mouse is captured).
unlock
Fires when the pointer lock status is "unlocked" (in other words: the mouse is not captured anymore).
Properties
[property:HTMLDOMElement domElement]
The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will
not set up new event listeners.
[property:Boolean isLocked]
Whether or not the controls are locked.
[property:Float maxPolarAngle]
Camera pitch, upper limit. Range is 0 to Math.PI radians. Default is Math.PI.
[property:Float minPolarAngle]
Camera pitch, lower limit. Range is 0 to Math.PI radians. Default is 0.
[property:Float pointerSpeed]
Multiplier for how much the pointer movement influences the camera rotation. Default is 1.
Methods
See the base [page:EventDispatcher] class for common methods.
[method:undefined connect] ()
Adds the event listeners of the controls.
[method:undefined disconnect] ()
Removes the event listeners of the controls.
[method:Vector3 getDirection] ( [param:Vector3 target] )
[page:Vector3 target]: The target vector.
Returns the look direction of the camera.
[method:undefined lock] ()
Activates the pointer lock.
[method:undefined moveForward] ( [param:Number distance] )
[page:Number distance]: The signed distance.
Moves the camera forward parallel to the xz-plane. Assumes camera.up is y-up.
[method:undefined moveRight] ( [param:Number distance] )
[page:Number distance]: The signed distance.
Moves the camera sidewards parallel to the xz-plane.
[method:undefined unlock] ()
Exits the pointer lock.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/PointerLockControls.js examples/jsm/controls/PointerLockControls.js]

[name]
Even though this is becoming less and less of a problem, some devices or browsers may still not support WebGL.
The following method allows you to check if it is supported and display a message to the user if it is not.
Import the WebGL support detection module, and run the following before attempting to render anything.
import WebGL from 'three/addons/capabilities/WebGL.js';
if ( WebGL.isWebGLAvailable() ) {
// Initiate function or other initializations here
animate();
} else {
const warning = WebGL.getWebGLErrorMessage();
document.getElementById( 'container' ).appendChild( warning );
}

[name]
Shader chunks for WebGL Shader library
Properties
Methods
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A geometric triangle as defined by three [page:Vector3 Vector3s]
representing its three corners.
Constructor
[name]( [param:Vector3 a], [param:Vector3 b], [param:Vector3 c] )
[page:Vector3 a] - the first corner of the triangle. Default is a
[page:Vector3] at `(0, 0, 0)`.
[page:Vector3 b] - the second corner of the triangle. Default is a
[page:Vector3] at `(0, 0, 0)`.
[page:Vector3 c] - the final corner of the triangle. Default is a
[page:Vector3] at `(0, 0, 0)`.
Creates a new [name].
Properties
[property:Vector3 a]
The first corner of the triangle. Default is a [page:Vector3] at `(0, 0,
0)`.
[property:Vector3 b]
The second corner of the triangle. Default is a [page:Vector3] at `(0, 0,
0)`.
[property:Vector3 c]
The final corner of the triangle. Default is a [page:Vector3] at `(0, 0,
0)`.
Methods
[method:Triangle clone]()
Returns a new triangle with the same [page:.a a], [page:.b b] and [page:.c c]
properties as this one.
[method:Vector3 closestPointToPoint]( [param:Vector3 point], [param:Vector3 target] )
[page:Vector3 point] - [page:Vector3]
[page:Vector3 target] — the result will be copied into this Vector3.
Returns the closest point on the triangle to [page:Vector3 point].
[method:Boolean containsPoint]( [param:Vector3 point] )
[page:Vector3 point] - [page:Vector3] to check.
Returns true if the passed point, when projected onto the plane of the
triangle, lies within the triangle.
[method:this copy]( [param:Triangle triangle] )
Copies the values of the passed triangles's [page:.a a], [page:.b b] and
[page:.c c] properties to this triangle.
[method:Boolean equals]( [param:Triangle triangle] )
Returns true if the two triangles have identical [page:.a a], [page:.b b]
and [page:.c c] properties.
[method:Float getArea]()
Return the area of the triangle.
[method:Vector3 getBarycoord]( [param:Vector3 point], [param:Vector3 target] )
[page:Vector3 point] - [page:Vector3]
[page:Vector3 target] — the result will be copied into this Vector3.
Return a [link:https://en.wikipedia.org/wiki/Barycentric_coordinate_system barycentric coordinate]
from the given vector. Returns `null` if the triangle is degenerate.
[link:http://commons.wikimedia.org/wiki/File:Barycentric_coordinates_1.png Picture of barycentric coordinates]
[method:Vector3 getMidpoint]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Calculate the midpoint of the triangle.
[method:Vector3 getNormal]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Calculate the [link:https://en.wikipedia.org/wiki/Normal_(geometry) normal vector] of the triangle.
[method:Plane getPlane]( [param:Plane target] )
[page:Plane target] — the result will be copied into this Plane.
Calculate a [page:Plane plane] based on the triangle. .
[method:Vector getInterpolation]( [param:Vector3 point], [param:Vector3 p1], [param:Vector3 p2], [param:Vector3 p3], [param:Vector v1], [param:Vector v2], [param:Vector v3], [param:Vector target] )
[page:Vector3 point] - Position of interpolated point.
[page:Vector3 p1] - Position of first vertex.
[page:Vector3 p2] - Position of second vertex.
[page:Vector3 p3] - Position of third vertex.
[page:Vector v1] - Value of first vertex.
[page:Vector v2] - Value of second vertex.
[page:Vector v3] - Value of third vertex.
[page:Vector target] — Result will be copied into this Vector.
Returns the value barycentrically interpolated for the given point on the
triangle. Returns `null` if the triangle is degenerate.
[method:Boolean intersectsBox]( [param:Box3 box] )
[page:Box3 box] - Box to check for intersection against.
Determines whether or not this triangle intersects [page:Box3 box].
[method:Boolean isFrontFacing]( [param:Vector3 direction] )
[page:Vector3 direction] - The direction to test.
Whether the triangle is oriented towards the given direction or not.
[method:this set]( [param:Vector3 a], [param:Vector3 b], [param:Vector3 c] )
Sets the triangle's [page:.a a], [page:.b b] and [page:.c c] properties to
the passed [page:Vector3 vector3s].
Please note that this method only copies the values from the given
objects.
[method:this setFromAttributeAndIndices]( [param:BufferAttribute attribute],
[param:Integer i0], [param:Integer i1], [param:Integer i2] )
attribute - [page:BufferAttribute] of vertex data
i0 - [page:Integer] index
i1 - [page:Integer] index
i2 - [page:Integer] index
Sets the triangle's vertices from the buffer attribute vertex data.
[method:this setFromPointsAndIndices]( [param:Array points], [param:Integer i0], [param:Integer i1], [param:Integer i2] )
points - [page:Array] of [page:Vector3]s
i0 - [page:Integer] index
i1 - [page:Integer] index
i2 - [page:Integer] index
Sets the triangle's vectors to the vectors in the array.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A simple caching system, used internally by [page:FileLoader].
Code Example
To enable caching across all loaders that use [page:FileLoader], set
THREE.Cache.enabled = true.
Examples
[example:webgl_geometry_text WebGL / geometry / text ]
[example:webgl_interactive_instances_gpu WebGL / interactive / instances / gpu]
[example:webgl_loader_ttf WebGL / loader / ttf]
Properties
[property:Boolean enabled]
Whether caching is enabled. Default is `false`.
[property:Object files]
An [page:Object object] that holds cached files.
Methods
[method:undefined add]( [param:String key], [param:Object file] )
[page:String key] — the [page:String key] to reference the cached file
by.
[page:Object file] — The file to be cached.
Adds a cache entry with a key to reference the file. If this key already
holds a file, it is overwritten.
[method:Any get]( [param:String key] )
[page:String key] — A string key
Get the value of [page:String key]. If the key does not exist `undefined`
is returned.
[method:undefined remove]( [param:String key] )
[page:String key] — A string key that references a cached file.
Remove the cached file associated with the key.
[method:undefined clear]()
Remove all values from the cache.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Abstract base class of interpolants over parametric samples.
The parameter domain is one dimensional, typically the time or a path
along a curve defined by the data.
The sample values can have any dimensionality and derived classes may
apply special interpretations to the data.
This class provides the interval seek in a Template Method, deferring the
actual interpolation to derived classes.
Time complexity is `O(1)` for linear access crossing at most two points
and `O(log N)` for random access, where *N* is the number of positions.
References: [link:http://www.oodesign.com/template-method-pattern.html http://www.oodesign.com/template-method-pattern.html]
Constructor
[name]( parameterPositions, sampleValues, sampleSize, resultBuffer )
parameterPositions -- array of positions
sampleValues -- array of samples
sampleSize -- number of samples
resultBuffer -- buffer to store the interpolation results.
Note: This is not designed to be called directly.
Properties
[property:null parameterPositions]
[property:null resultBuffer]
[property:null sampleValues]
[property:Object settings]
Optional, subclass-specific settings structure.
[property:null valueSize]
Methods
[method:Array evaluate]( [param:Number t] )
Evaluate the interpolant at position *t*.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Let's say you want to draw a line or a circle, not a wireframe [page:Mesh].
First we need to set up the [page:WebGLRenderer renderer], [page:Scene scene] and camera (see the Creating a scene page).
Here is the code that we will use:
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );
const scene = new THREE.Scene();
Next thing we will do is define a material. For lines we have to use [page:LineBasicMaterial] or [page:LineDashedMaterial].
//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
After material we will need a geometry with some vertices:
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
Note that lines are drawn between each consecutive pair of vertices, but not between the first and last (the line is not closed.)
Now that we have points for two lines and a material, we can put them together to form a line.
const line = new THREE.Line( geometry, material );
All that's left is to add it to the scene and call [page:WebGLRenderer.render render].
scene.add( line );
renderer.render( scene, camera );
You should now be seeing an arrow pointing upwards, made from two blue lines.

[name]
Handles and keeps track of loaded and pending data. A default global
instance of this class is created and used by loaders if not supplied
manually - see [page:DefaultLoadingManager].
In general that should be sufficient, however there are times when it can
be useful to have separate loaders - for example if you want to show
separate loading bars for objects and textures.
Code Example
This example shows how to use LoadingManager to track the progress of
[page:OBJLoader].
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onLoad = function ( ) {
console.log( 'Loading complete!');
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onError = function ( url ) {
console.log( 'There was an error loading ' + url );
};
const loader = new THREE.OBJLoader( manager );
loader.load( 'file.obj', function ( object ) {
//
} );
In addition to observing progress, a LoadingManager can be used to
override resource URLs during loading. This may be helpful for assets
coming from drag-and-drop events, WebSockets, WebRTC, or other APIs. An
example showing how to load an in-memory model using Blob URLs is below.
// Blob or File objects created when dragging files into the webpage.
const blobs = {'fish.gltf': blob1, 'diffuse.png': blob2, 'normal.png': blob3};
const manager = new THREE.LoadingManager();
// Initialize loading manager with URL callback.
const objectURLs = [];
manager.setURLModifier( ( url ) => {
url = URL.createObjectURL( blobs[ url ] );
objectURLs.push( url );
return url;
} );
// Load as usual, then revoke the blob URLs.
const loader = new THREE.GLTFLoader( manager );
loader.load( 'fish.gltf', (gltf) => {
scene.add( gltf.scene );
objectURLs.forEach( ( url ) => URL.revokeObjectURL( url ) );
});
Examples
[example:webgl_loader_obj WebGL / loader / obj]
[example:webgl_postprocessing_outline WebGL / postprocessing / outline]
Constructor
[name]( [param:Function onLoad], [param:Function onProgress],
[param:Function onError] )
[page:Function onLoad] — (optional) this function will be called when all
loaders are done.
[page:Function onProgress] — (optional) this function will be called when
an item is complete.
[page:Function onError] — (optional) this function will be called a loader
encounters errors.
Creates a new [name].
Properties
[property:Function onStart]
This function will be called when loading starts. The arguments are:
[page:String url] — The url of the item just loaded.
[page:Integer itemsLoaded] — the number of items already loaded so far.
[page:Integer itemsTotal] — the total amount of items to be loaded.
By default this is undefined.
[property:Function onLoad]
This function will be called when all loading is completed. By default
this is undefined, unless passed in the constructor.
[property:Function onProgress]
This function will be called when an item is complete. The arguments
are:
[page:String url] — The url of the item just loaded.
[page:Integer itemsLoaded] — the number of items already loaded so far.
[page:Integer itemsTotal] — the total amount of items to be loaded.
By default this is undefined, unless passed in the constructor.
[property:Function onError]
This function will be called when any item errors, with the argument:
[page:String url] — The url of the item that errored.
By default this is undefined, unless passed in the constructor.
Methods
[method:this addHandler]( [param:Object regex], [param:Loader loader] )
[page:Object regex] — A regular expression.
[page:Loader loader] — The loader.
Registers a loader with the given regular expression. Can be used to
define what loader should be used in order to load specific files. A
typical use case is to overwrite the default loader for textures.
// add handler for TGA textures
manager.addHandler( /\.tga$/i, new TGALoader() );
[method:Loader getHandler]( [param:String file] )
[page:String file] — The file path.
Can be used to retrieve the registered loader for the given file path.
[method:this removeHandler]( [param:Object regex] )
[page:Object regex] — A regular expression.
Removes the loader for the given regular expression.
[method:String resolveURL]( [param:String url] )
[page:String url] — the url to load
Given a URL, uses the URL modifier callback (if any) and returns a
resolved URL. If no URL modifier is set, returns the original URL.
[method:this setURLModifier]( [param:Function callback] )
[page:Function callback] — URL modifier callback. Called with [page:String url] argument,
and must return [page:String resolvedURL].
If provided, the callback will be passed each resource URL before a
request is sent. The callback may return the original URL, or a new URL to
override loading behavior. This behavior can be used to load assets from
.ZIP files, drag-and-drop APIs, and Data URIs.
Note: The following methods are designed to be called internally by
loaders. You shouldn't call them directly.
[method:undefined itemStart]( [param:String url] )
[page:String url] — the url to load
This should be called by any loader using the manager when the loader
starts loading an url.
[method:undefined itemEnd]( [param:String url] )
[page:String url] — the loaded url
This should be called by any loader using the manager when the loader
ended loading an url.
[method:undefined itemError]( [param:String url] )
[page:String url] — the loaded url
This should be called by any loader using the manager when the loader
errors loading an url.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/loaders/LoadingManager.js src/loaders/LoadingManager.js]

[name]
All objects by default automatically update their matrices if they have been added to the scene with
const object = new THREE.Object3D();
scene.add( object );
or if they are the child of another object that has been added to the scene:
const object1 = new THREE.Object3D();
const object2 = new THREE.Object3D();
object1.add( object2 );
scene.add( object1 ); //object1 and object2 will automatically update their matrices
However, if you know the object will be static, you can disable this and update the transform matrix manually just when needed.
object.matrixAutoUpdate = false;
object.updateMatrix();
BufferGeometry
BufferGeometries store information (such as vertex positions, face indices, normals, colors,
UVs, and any custom attributes) in [page:BufferAttribute buffers] - that is,
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays typed arrays].
This makes them generally faster than standard Geometries, at the cost of being somewhat harder to
work with.
With regards to updating BufferGeometries, the most important thing to understand is that
you cannot resize buffers (this is very costly,	basically the equivalent to creating a new geometry).
You can however update the content of buffers.
This means that if you know an attribute of your BufferGeometry will grow, say the number of vertices,
you must pre-allocate a buffer large enough to hold any new vertices that may be created. Of
course, this also means that there will be a maximum size for your BufferGeometry - there is
no way to create a BufferGeometry that can efficiently be extended indefinitely.
We'll use the example of a line that gets extended at render time. We'll allocate space
in the buffer for 500 vertices but draw only two at first, using [page:BufferGeometry.drawRange].
const MAX_POINTS = 500;
// geometry
const geometry = new THREE.BufferGeometry();
// attributes
const positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
// draw range
const drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange( 0, drawCount );
// material
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// line
const line = new THREE.Line( geometry, material );
scene.add( line );
Next we'll randomly add points to the line using a pattern like:
const positionAttribute = line.geometry.getAttribute( 'position' );
let x = 0, y = 0, z = 0;
for ( let i = 0; i < positionAttribute.count; i ++ ) {
positionAttribute.setXYZ( i, x, y, z );
x += ( Math.random() - 0.5 ) * 30;
y += ( Math.random() - 0.5 ) * 30;
z += ( Math.random() - 0.5 ) * 30;
}
If you want to change the
number of points
rendered after the first render, do this:
line.geometry.setDrawRange( 0, newValue );
If you want to change the position data values after the first render, you need to
set the needsUpdate flag like so:
positionAttribute.needsUpdate = true; // required after the first render
If you change the position data values after the initial render, you may need to recompute
bounding volumes so other features of the engine like view frustum culling or helpers properly work.
line.geometry.computeBoundingBox();
line.geometry.computeBoundingSphere();
[link:https://jsfiddle.net/t4m85pLr/1/ Here is a fiddle] showing an animated line which you can adapt to your use case.
Examples
[example:webgl_custom_attributes WebGL / custom / attributes]
[example:webgl_buffergeometry_custom_attributes_particles WebGL / buffergeometry / custom / attributes / particles]
Materials
All uniforms values can be changed freely (e.g. colors, textures, opacity, etc), values are sent to the shader every frame.
Also GLstate related parameters can change any time (depthTest, blending, polygonOffset, etc).
The following properties can't be easily changed at runtime (once the material is rendered at least once):
numbers and types of uniforms
presence or not of
texture
fog
vertex colors
morphing
shadow map
alpha test
transparent
Changes in these require building of new shader program. You'll need to set
material.needsUpdate = true
Bear in mind this might be quite slow and induce jerkiness in framerate (especially on Windows, as shader compilation is slower in DirectX than OpenGL).
For smoother experience you can emulate changes in these features to some degree by having "dummy" values like zero intensity lights, white textures, or zero density fog.
You can freely change the material used for geometry chunks, however you cannot change how an object is divided into chunks (according to face materials).
If you need to have different configurations of materials during runtime:
If the number of materials / chunks is small, you could pre-divide the object beforehand (e.g. hair / face / body / upper clothes / trousers for a human, front / sides / top / glass / tire / interior for a car).
If the number is large (e.g. each face could be potentially different), consider a different solution, such as using attributes / textures to drive different per-face look.
Examples
[example:webgl_materials_car WebGL / materials / car]
[example:webgl_postprocessing_dof WebGL / webgl_postprocessing / dof]
Textures
Image, canvas, video and data textures need to have the following flag set if they are changed:
texture.needsUpdate = true;
Render targets update automatically.
Examples
[example:webgl_materials_video WebGL / materials / video]
[example:webgl_rtt WebGL / rtt]
Cameras
A camera's position and target is updated automatically. If you need to change
fov
aspect
near
far
then you'll need to recompute the projection matrix:
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
InstancedMesh
`InstancedMesh` is a class for conveniently access instanced rendering in `three.js`. Certain library features like view frustum culling or
ray casting rely on up-to-date bounding volumes (bounding sphere and bounding box). Because of the way how `InstancedMesh` works, the class
has its own [page:InstancedMesh.boundingBox boundingBox] and [page:InstancedMesh.boundingSphere boundingSphere] properties that supersede
the bounding volumes on geometry level.
Similar to geometries you have to recompute the bounding box and sphere whenever you change the underlying data. In context of `InstancedMesh`, that
happens when you transform instances via [page:InstancedMesh.setMatrixAt setMatrixAt](). You can use the same pattern like with geometries.
instancedMesh.computeBoundingBox();
instancedMesh.computeBoundingSphere();
SkinnedMesh
`SkinnedMesh` follows the same principles like `InstancedMesh` in context of bounding volumes. Meaning the class has its own version of
[page:SkinnedMesh.boundingBox boundingBox] and [page:SkinnedMesh.boundingSphere boundingSphere] to correctly enclose animated meshes.
When calling `computeBoundingBox()` and `computeBoundingSphere()`, the class computes the respective bounding volumes based on the current
bone tranformation (or in other words the current animation state).

[page:Group] →
[name]
XREstimatedLight uses WebXR's light estimation to create
a light probe, a directional light, and (optionally) an environment map
that model the user's real-world environment and lighting.
As WebXR updates the light and environment estimation, XREstimatedLight
automatically updates the light probe, directional light, and environment map.
It's important to specify `light-estimation` as an optional or required
feature when creating the WebXR session, otherwise the light estimation
can't work.
See
here
for browser compatibility information, as this is still an experimental feature in WebXR.
To use this, as with all files in the /examples directory, you will have to
include the file separately in your HTML.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { XREstimatedLight } from 'three/addons/webxr/XREstimatedLight.js';
Code Example
renderer.xr.enabled = true;
// Don't add the XREstimatedLight to the scene initially.
// It doesn't have any estimated lighting values until an AR session starts.
const xrLight = new XREstimatedLight( renderer );
xrLight.addEventListener( 'estimationstart' , () => {
scene.add( xrLight );
if ( xrLight.environment ) {
scene.environment = xrLight.environment;
}
} );
xrLight.addEventListener( 'estimationend', () => {
scene.remove( xrLight );
scene.environment = null;
} );
// In order for lighting estimation to work, 'light-estimation' must be included as either
// an optional or required feature.
document.body.appendChild( XRButton.createButton( renderer, {
optionalFeatures: [ 'light-estimation' ]
} ) );
Examples
[example:webxr_ar_lighting webxr / light estimation]
Constructor
[name]( [param:WebGLRenderer renderer], [param:Boolean environmentEstimation] )
[page:WebGLRenderer renderer]: (required) The renderer used to render the Scene. Mainly used to interact with WebXRManager.
environmentEstimation: If `true`, use WebXR to estimate an environment map.
Events
estimationstart
Fires when the estimated lighting values start being updated.
estimationend
Fires when the estimated lighting values stop being updated.
Properties
[property:Texture environment]
The environment map estimated by WebXR. This is only available if environmentEstimation is `true`.
It can be used as the [page:Scene.environment], for
[page:MeshStandardMaterial.envMap], or
as the [page:Scene.background].
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/XREstimatedLight.js examples/jsm/webxr/XREstimatedLight.js]

[name]
A class representing [link:http://en.wikipedia.org/wiki/Euler_angles Euler Angles].
Euler angles describe a rotational transformation by rotating an object on
its various axes in specified amounts per axis, and a specified axis
order.
Iterating through a [name] instance will yield its components (x, y, z,
order) in the corresponding order.
Code Example
const a = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
const b = new THREE.Vector3( 1, 0, 1 );
b.applyEuler(a);
Constructor
[name]( [param:Float x], [param:Float y], [param:Float z], [param:String order] )
[page:Float x] - (optional) the angle of the x axis in radians. Default is
`0`.
[page:Float y] - (optional) the angle of the y axis in radians. Default is
`0`.
[page:Float z] - (optional) the angle of the z axis in radians. Default is
`0`.
[page:String order] - (optional) a string representing the order that the
rotations are applied, defaults to 'XYZ' (must be upper case).
Properties
[property:Boolean isEuler]
Read-only flag to check if a given object is of type [name].
[property:String order]
The order in which to apply rotations. Default is 'XYZ', which means that
the object will first be rotated around its X axis, then its Y axis and
finally its Z axis. Other possibilities are: 'YZX', 'ZXY', 'XZY', 'YXZ'
and 'ZYX'. These must be in upper case.
Three.js uses `intrinsic` Tait-Bryan angles. This means that rotations are
performed with respect to the `local` coordinate system. That is, for
order 'XYZ', the rotation is first around the local-X axis (which is the
same as the world-X axis), then around local-Y (which may now be different
from the world Y-axis), then local-Z (which may be different from the
world Z-axis).
[property:Float x]
The current value of the x component.
[property:Float y]
The current value of the y component.
[property:Float z]
The current value of the z component.
Methods
[method:this copy]( [param:Euler euler] )
Copies value of [page:Euler euler] to this euler.
[method:Euler clone]()
Returns a new Euler with the same parameters as this one.
[method:Boolean equals]( [param:Euler euler] )
Checks for strict equality of this euler and [page:Euler euler].
[method:this fromArray]( [param:Array array] )
[page:Array array] of length 3 or 4. The optional 4th argument corresponds
to the [page:.order order].
Assigns this euler's [page:.x x] angle to `array[0]`.
Assigns this euler's [page:.y y] angle to `array[1]`.
Assigns this euler's [page:.z z] angle to `array[2]`.
Optionally assigns this euler's [page:.order order] to `array[3]`.
[method:this reorder]( [param:String newOrder] )
Resets the euler angle with a new order by creating a quaternion from this
euler angle and then setting this euler angle with the quaternion and the
new order.
*Warning*: this discards revolution information.
[method:this set]( [param:Float x], [param:Float y], [param:Float z], [param:String order] )
[page:.x x] - the angle of the x axis in radians.
[page:.y y] - the angle of the y axis in radians.
[page:.z z] - the angle of the z axis in radians.
[page:.order order] - (optional) a string representing the order that the
rotations are applied.
Sets the angles of this euler transform and optionally the [page:.order order].
[method:this setFromRotationMatrix]( [param:Matrix4 m], [param:String order] )
[page:Matrix4 m] - a [page:Matrix4] of which the upper 3x3 of matrix is a
pure [link:https://en.wikipedia.org/wiki/Rotation_matrix rotation matrix]
(i.e. unscaled).
[page:.order order] - (optional) a string representing the order that the
rotations are applied.
Sets the angles of this euler transform from a pure rotation matrix based
on the orientation specified by order.
[method:this setFromQuaternion]( [param:Quaternion q], [param:String order] )
[page:Quaternion q] - a normalized quaternion.
[page:.order order] - (optional) a string representing the order that the
rotations are applied.
Sets the angles of this euler transform from a normalized quaternion based
on the orientation specified by [page:.order order].
[method:this setFromVector3]( [param:Vector3 vector], [param:String order] )
[page:Vector3 vector] - [page:Vector3].
[page:.order order] - (optional) a string representing the order that the
rotations are applied.
Set the [page:.x x], [page:.y y] and [page:.z z], and optionally update
the [page:.order order].
[method:Array toArray]( [param:Array array], [param:Integer offset] )
[page:Array array] - (optional) array to store the euler in.
[page:Integer offset] (optional) offset in the array.
Returns an array of the form [[page:.x x], [page:.y y], [page:.z z],
[page:.order order ]].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Utility functions for [page:Skeleton], [page:SkinnedMesh], and [page:Bone] manipulation.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
Methods
[method:Object3D clone]( [param:Object3D object] )
Clones the given object and its descendants, ensuring that any [page:SkinnedMesh] instances
are correctly associated with their bones. Bones are also cloned, and must be descendants of
the object passed to this method. Other data, like geometries and materials, are reused by
reference.
[method:undefined retarget]( [param:SkeletonHelper target], [param:SkeletonHelper source], [param:Object options] )
[method:AnimationClip retargetClip]( [param:SkeletonHelper target], [param:SkeletonHelper source], [param:AnimationClip clip], [param:Object options] )
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/SkeletonUtils.js examples/jsm/utils/SkeletonUtils.js]

[name]
Base class for implementing loaders.
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
[property:String crossOrigin]
The crossOrigin string to implement CORS for loading the url from a
different domain that allows CORS. Default is `anonymous`.
[property:Boolean withCredentials]
Whether the XMLHttpRequest uses credentials. See
[page:.setWithCredentials]. Default is `false`.
[property:LoadingManager manager]
The [page:LoadingManager loadingManager] the loader is using. Default is
[page:DefaultLoadingManager].
[property:String path]
The base path from which the asset will be loaded. Default is the empty
string.
[property:String resourcePath]
The base path from which additional resources like textures will be
loaded. Default is the empty string.
[property:Object requestHeader]
The [link:https://developer.mozilla.org/en-US/docs/Glossary/Request_header request header]
used in HTTP request. See [page:.setRequestHeader].
Default is empty object.
Methods
[method:undefined load]()
This method needs to be implement by all concrete loaders. It holds the
logic for loading the asset from the backend.
[method:Promise loadAsync]( [param:String url], [param:Function onProgress] )
[page:String url] — A string containing the path/URL of the file to be
loaded.
[page:Function onProgress] (optional) — A function to be called while the
loading is in progress. The argument will be the ProgressEvent instance,
which contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
This method is equivalent to [page:.load], but returns a
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise Promise].
[page:Function onLoad] is handled by
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve Promise.resolve]
and [page:Function onError] is handled by
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject Promise.reject].
[method:undefined parse]()
This method needs to be implement by all concrete loaders. It holds the
logic for parsing the asset into three.js entities.
[method:this setCrossOrigin]( [param:String crossOrigin] )
[page:String crossOrigin] — The crossOrigin string to implement CORS for
loading the url from a different domain that allows CORS.
[method:this setWithCredentials]( [param:Boolean value] )
Whether the XMLHttpRequest uses credentials such as cookies, authorization
headers or TLS client certificates. See
[link:https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials XMLHttpRequest.withCredentials].
Note that this has no effect if you are loading files locally or from the
same domain.
[method:this setPath]( [param:String path] )
[page:String path] — Set the base path for the asset.
[method:this setResourcePath]( [param:String resourcePath] )
[page:String resourcePath] — Set the base path for dependent resources
like textures.
[method:this setRequestHeader]( [param:Object requestHeader] )
[page:Object requestHeader] - key: The name of the header whose value is
to be set. value: The value to set as the body of the header.
Set the
[link:https://developer.mozilla.org/en-US/docs/Glossary/Request_header request header] used in HTTP request.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Constructor
[name]( [param:InterleavedBuffer interleavedBuffer], [param:Integer itemSize], [param:Integer offset], [param:Boolean normalized] )
Properties
[property:InterleavedBuffer data]
The [page:InterleavedBuffer InterleavedBuffer] instance passed in the
constructor.
[property:TypedArray array]
The value of [page:InterleavedBufferAttribute.data data].array.
[property:Integer count]
The value of [page:InterleavedBufferAttribute.data data].count. If the
buffer is storing a 3-component item (such as a position, normal, or
color), then this will count the number of such items stored.
[property:Boolean isInterleavedBufferAttribute]
Read-only flag to check if a given object is of type [name].
[property:Integer itemSize]
How many values make up each item.
[property:String name]
Optional name for this attribute instance. Default is an empty string.
[property:Boolean needsUpdate]
Default is `false`. Setting this to `true` will send the entire
interleaved buffer (not just the specific attribute data) to the GPU
again.
[property:Boolean normalized]
Default is `false`.
[property:Integer offset]
The offset in the underlying array buffer where an item starts.
Methods
[method:this applyMatrix4]( [param:Matrix4 m] )
Applies matrix [page:Matrix4 m] to every Vector3 element of this
InterleavedBufferAttribute.
[method:this applyNormalMatrix]( [param:Matrix3 m] )
Applies normal matrix [page:Matrix3 m] to every Vector3 element of this
InterleavedBufferAttribute.
[method:this transformDirection]( [param:Matrix4 m] )
Applies matrix [page:Matrix4 m] to every Vector3 element of this
InterleavedBufferAttribute, interpreting the elements as a direction
vectors.
[method:Number getComponent]( [param:Integer index], [param:Integer component] )
Returns the given component of the vector at the given index.
[method:Number getX]( [param:Integer index] )
Returns the x component of the item at the given index.
[method:Number getY]( [param:Integer index] )
Returns the y component of the item at the given index.
[method:Number getZ]( [param:Integer index] )
Returns the z component of the item at the given index.
[method:Number getW]( [param:Integer index] )
Returns the w component of the item at the given index.
[method:Number setComponent]( [param:Integer index], [param:Integer component], [param:Float value] )
Sets the given component of the vector at the given index.
[method:this setX]( [param:Integer index], [param:Float x] )
Sets the x component of the item at the given index.
[method:this setY]( [param:Integer index], [param:Float y] )
Sets the y component of the item at the given index.
[method:this setZ]( [param:Integer index], [param:Float z] )
Sets the z component of the item at the given index.
[method:this setW]( [param:Integer index], [param:Float w] )
Sets the w component of the item at the given index.
[method:this setXY]( [param:Integer index], [param:Float x], [param:Float y] )
Sets the x and y components of the item at the given index.
[method:this setXYZ]( [param:Integer index], [param:Float x], [param:Float y], [param:Float z] )
Sets the x, y and z components of the item at the given index.
[method:this setXYZW]( [param:Integer index], [param:Float x], [param:Float y], [param:Float z], [param:Float w] )
Sets the x, y, z and w components of the item at the given index.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
A standard physically based material, using Metallic-Roughness
workflow.
Physically based rendering (PBR) has recently become the standard in many
3D applications, such as
[link:https://blogs.unity3d.com/2014/10/29/physically-based-shading-in-unity-5-a-primer/ Unity],
[link:https://docs.unrealengine.com/latest/INT/Engine/Rendering/Materials/PhysicallyBased/ Unreal] and
[link:http://area.autodesk.com/blogs/the-3ds-max-blog/what039s-new-for-rendering-in-3ds-max-2017 3D Studio Max].
This approach differs from older approaches in that instead of using
approximations for the way in which light interacts with a surface, a
physically correct model is used. The idea is that, instead of tweaking
materials to look good under specific lighting, a material can be created
that will react 'correctly' under all lighting scenarios.
In practice this gives a more accurate and realistic looking result than
the [page:MeshLambertMaterial] or [page:MeshPhongMaterial], at the cost of
being somewhat more computationally expensive. [name] uses per-fragment
shading.
Note that for best results you should always specify an [page:.envMap environment map]
when using this material.
For a non-technical introduction to the concept of PBR and how to set up a
PBR material, check out these articles by the people at
[link:https://www.marmoset.co marmoset]:
[link:https://www.marmoset.co/posts/basic-theory-of-physically-based-rendering/ Basic Theory of Physically Based Rendering]
[link:https://www.marmoset.co/posts/physically-based-rendering-and-you-can-too/ Physically Based Rendering and You Can Too]
Technical details of the approach used in three.js (and most other PBR
systems) can be found is this
[link:https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf paper from Disney]
(pdf), by Brent Burley.
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Texture aoMap]
The red channel of this texture is used as the ambient occlusion map.
Default is null. The aoMap requires a second set of UVs.
[property:Float aoMapIntensity]
Intensity of the ambient occlusion effect. Default is `1`. Zero is no
occlusion effect.
[property:Texture bumpMap]
The texture to create a bump map. The black and white values map to the
perceived depth in relation to the lights. Bump doesn't actually affect
the geometry of the object, only the lighting. If a normal map is defined
this will be ignored.
[property:Float bumpScale]
How much the bump map affects the material. Typical ranges are 0-1.
Default is `1`.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Object defines]
An object of the form:
{ 'STANDARD': '' };
This is used by the [page:WebGLRenderer] for selecting shaders.
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Color emissive]
Emissive (light) color of the material, essentially a solid color
unaffected by other lighting. Default is black.
[property:Texture emissiveMap]
Set emissive (glow) map. Default is null. The emissive map color is
modulated by the emissive color and the emissive intensity. If you have an
emissive map, be sure to set the emissive color to something other than
black.
[property:Float emissiveIntensity]
Intensity of the emissive light. Modulates the emissive color. Default is
1.
[property:Texture envMap]
The environment map. To ensure a physically correct rendering, you should
only add environment maps which were preprocessed by
[page:PMREMGenerator]. Default is null.
[property:Euler envMapRotation]
The rotation of the environment map in radians. Default is `(0,0,0)`.
[property:Float envMapIntensity]
Scales the effect of the environment map by multiplying its color.
[property:Boolean flatShading]
Define whether the material is rendered with flat shading. Default is
false.
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Boolean isMeshStandardMaterial]
Read-only flag to check if a given object is of type [name].
[property:Texture lightMap]
The light map. Default is null. The lightMap requires a second set of UVs.
[property:Float lightMapIntensity]
Intensity of the baked light. Default is `1`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null. The texture map color is modulated by the diffuse [page:.color].
[property:Float metalness]
How much the material is like a metal. Non-metallic materials such as wood
or stone use `0.0`, metallic use `1.0`, with nothing (usually) in between.
Default is `0.0`. A value between `0.0` and `1.0` could be used for a rusty
metal look. If metalnessMap is also provided, both values are multiplied.
[property:Texture metalnessMap]
The blue channel of this texture is used to alter the metalness of the
material.
[property:Texture normalMap]
The texture to create a normal map. The RGB values affect the surface
normal for each pixel fragment and change the way the color is lit. Normal
maps do not change the actual shape of the surface, only the lighting. In
case the material has a normal map authored using the left handed
convention, the y component of normalScale should be negated to compensate
for the different handedness.
[property:Integer normalMapType]
The type of normal map.
Options are [page:constant THREE.TangentSpaceNormalMap] (default), and
[page:constant THREE.ObjectSpaceNormalMap].
[property:Vector2 normalScale]
How much the normal map affects the material. Typical ranges are 0-1.
Default is a [page:Vector2] set to (1,1).
[property:Float roughness]
How rough the material appears. `0.0` means a smooth mirror reflection, `1.0`
means fully diffuse. Default is `1.0`. If roughnessMap is also provided,
both values are multiplied.
[property:Texture roughnessMap]
The green channel of this texture is used to alter the roughness of the
material.
[property:Boolean wireframe]
Render geometry as wireframe. Default is `false` (i.e. render as flat
polygons).
[property:String wireframeLinecap]
Define appearance of line ends. Possible values are "butt", "round" and
"square". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:String wireframeLinejoin]
Define appearance of line joints. Possible values are "round", "bevel" and
"miter". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
An abstract base class for creating a [name] object that contains methods
for interpolation. For an array of [name]s see [page:CurvePath].
Constructor
[name]()
This constructor creates a new [name].
Properties
[property:Integer arcLengthDivisions]
This value determines the amount of divisions when calculating the
cumulative segment lengths of a curve via [page:.getLengths]. To ensure
precision when using methods like [page:.getSpacedPoints], it is
recommended to increase [page:.arcLengthDivisions] if the curve is very
large. Default is `200`.
Methods
[method:Vector getPoint]( [param:Float t], [param:Vector optionalTarget] )
[page:Float t] - A position on the curve. Must be in the range [ 0, 1 ].
[page:Vector optionalTarget] — (optional) If specified, the result will be
copied into this Vector, otherwise a new Vector will be created.
Returns a vector for a given position on the curve.
[method:Vector getPointAt]( [param:Float u], [param:Vector optionalTarget] )
[page:Float u] - A position on the curve according to the arc length. Must
be in the range [ 0, 1 ].
[page:Vector optionalTarget] — (optional) If specified, the result will be
copied into this Vector, otherwise a new Vector will be created.
Returns a vector for a given position on the curve according to the arc
length.
[method:Array getPoints]( [param:Integer divisions] )
divisions -- number of pieces to divide the curve into. Default is `5`.
Returns a set of divisions + 1 points using getPoint( t ).
[method:Array getSpacedPoints]( [param:Integer divisions] )
divisions -- number of pieces to divide the curve into. Default is `5`.
Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).
[method:Float getLength]()
Get total curve arc length.
[method:Array getLengths]( [param:Integer divisions] )
Get list of cumulative segment lengths.
[method:undefined updateArcLengths]()
Update the cumulative segment distance cache. The method must be called
every time curve parameters are changed. If an updated curve is part of a
composed curve like [page:CurvePath], [page:.updateArcLengths]() must be
called on the composed curve, too.
[method:Float getUtoTmapping]( [param:Float u], [param:Float distance] )
Given u in the range ( 0 .. 1 ), returns [page:Float t] also in the range
( 0 .. 1 ). u and t can then be used to give you points which are
equidistant from the ends of the curve, using [page:.getPoint].
[method:Vector getTangent]( [param:Float t], [param:Vector optionalTarget] )
[page:Float t] - A position on the curve. Must be in the range [ 0, 1 ].
[page:Vector optionalTarget] — (optional) If specified, the result will be
copied into this Vector, otherwise a new Vector will be created.
Returns a unit vector tangent at t. If the derived curve does not
implement its tangent derivation, two points a small delta apart will be
used to find its gradient which seems to give a reasonable approximation.
[method:Vector getTangentAt]( [param:Float u], [param:Vector optionalTarget] )
[page:Float u] - A position on the curve according to the arc length. Must
be in the range [ 0, 1 ].
[page:Vector optionalTarget] — (optional) If specified, the result will be
copied into this Vector, otherwise a new Vector will be created.
Returns tangent at a point which is equidistant to the ends of the curve
from the point given in [page:.getTangent].
[method:Object computeFrenetFrames]( [param:Integer segments], [param:Boolean closed] )
Generates the Frenet Frames. Requires a curve definition in 3D space. Used
in geometries like [page:TubeGeometry] or [page:ExtrudeGeometry].
[method:Curve clone]()
Creates a clone of this instance.
[method:this copy]( [param:Curve source] )
Copies another [name] object to this instance.
[method:Object toJSON]()
Returns a JSON object representation of this instance.
[method:this fromJSON]( [param:Object json] )
Copies the data from the given JSON object to this instance.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] →
[name]
A continuous line that connects back to the start.
This is nearly the same as [page:Line]; the only difference is that it is
rendered using
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements gl.LINE_LOOP] instead of
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements gl.LINE_STRIP],
which draws a straight line to the next vertex, and
connects the last vertex back to the first.
Constructor
[name]( [param:BufferGeometry geometry], [param:Material material] )
[page:BufferGeometry geometry] — List of vertices representing points on
the line loop.
[page:Material material] — Material for the line. Default is
[page:LineBasicMaterial LineBasicMaterial].
Properties
See the base [page:Line] class for common properties.
[property:Boolean isLineLoop]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Line] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] → [page:ShaderMaterial] →
[name]
This class works just like [page:ShaderMaterial], except that definitions
of built-in uniforms and attributes are not automatically prepended to the
GLSL shader code.
Code Example
const material = new THREE.RawShaderMaterial( {
uniforms: {
time: { value: 1.0 }
},
vertexShader: document.getElementById( 'vertexShader' ).textContent,
fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
} );
Examples
[example:webgl_buffergeometry_rawshader WebGL / buffergeometry / rawshader]
[example:webgl_buffergeometry_instancing_billboards WebGL / buffergeometry / instancing / billboards]
[example:webgl_buffergeometry_instancing WebGL / buffergeometry / instancing]
[example:webgl_raymarching_reflect WebGL / raymarching / reflect]
[example:webgl2_volume_cloud WebGL 2 / volume / cloud]
[example:webgl2_volume_instancing WebGL 2 / volume / instancing]
[example:webgl2_volume_perlin WebGL 2 / volume / perlin]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material] and
[page:ShaderMaterial]) can be passed in here.
Properties
See the base [page:Material] and [page:ShaderMaterial] classes for common
properties.
Methods
See the base [page:Material] and [page:ShaderMaterial] classes for common
methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
Helper object to visualize a [page:Plane].
Code Example
const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
scene.add( helper );
Constructor
[name]( [param:Plane plane], [param:Float size], [param:Color hex] )
[page:Plane plane] -- the plane to visualize.
[page:Float size] -- (optional) side length of plane helper. Default is
1.
[page:Color color] -- (optional) the color of the helper. Default is
0xffff00.
Creates a new wireframe representation of the passed plane.
Properties
See the base [page:Line] class for common properties.
[property:Plane plane]
The [page:Plane plane] being visualized.
[property:Float size]
The side lengths of plane helper.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined updateMatrixWorld]( [param:Boolean force] )
This overrides the method in the base [page:Object3D] class so that it
also updates the helper object according to the [page:PlaneHelper.plane .plane] and [page:PlaneHelper.size .size] properties.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:CompressedTexture] →
[name]
Creates an texture 2D array based on data in compressed form, for example
from a [link:https://en.wikipedia.org/wiki/DirectDraw_Surface DDS]
file.
For use with the [page:CompressedTextureLoader CompressedTextureLoader].
Constructor
[name]( [param:Array mipmaps], [param:Number width], [param:Number height], [param:Constant format], [param:Constant type] )
[page:Array mipmaps] -- The mipmaps array should contain objects with
data, width and height. The mipmaps should be of the correct format and
type.
[page:Number width] -- The width of the biggest mipmap.
[page:Number height] -- The height of the biggest mipmap.
[page:Number depth] -- The number of layers of the 2D array texture.
[page:Constant format] -- The format used in the mipmaps. See
[page:Textures ST3C Compressed Texture Formats], [page:Textures PVRTC Compressed Texture Formats]
and [page:Textures ETC Compressed Texture Format] for other choices.
[page:Constant type] -- Default is [page:Textures THREE.UnsignedByteType].
See [page:Textures type constants] for other choices.
Properties
See the base [page:CompressedTexture CompressedTexture] class for common
properties.
[property:number wrapR]
This defines how the texture is wrapped in the depth direction.
The default is [page:Textures THREE.ClampToEdgeWrapping], where the edge
is clamped to the outer edge texels. The other two choices are
[page:Textures THREE.RepeatWrapping] and [page:Textures THREE.MirroredRepeatWrapping].
See the [page:Textures texture constants]
page for details.
[property:Object image]
Overridden with a object containing width, height, and depth.
[property:Boolean isCompressedArrayTexture]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:CompressedTexture CompressedTexture] class for common
methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
Which 3D model format is best supported?
The recommended format for importing and exporting assets is glTF (GL Transmission Format). Because glTF is focused on runtime asset delivery, it is compact to transmit and fast to load.
three.js provides loaders for many other popular formats like FBX, Collada or OBJ as well. Nevertheless, you should always try to establish a glTF based workflow in your projects first. For more information, see [link:#manual/introduction/Loading-3D-models loading 3D models].
Why are there meta viewport tags in examples?
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
These tags control viewport size and scale for mobile browsers (where page content may be rendered at different size than visible viewport).
[link:https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html Safari: Using the Viewport]
[link:https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag MDN: Using the viewport meta tag]
How can scene scale be preserved on resize?
We want all objects, regardless of their distance from the camera, to appear the same size, even as the window is resized.
The key equation to solving this is this formula for the visible height at a given distance:
visible_height = 2 * Math.tan( ( Math.PI / 180 ) * camera.fov / 2 ) * distance_from_camera;
If we increase the window height by a certain percentage, then what we want is the visible height at all distances
to increase by the same percentage.
This can not be done by changing the camera position. Instead you have to change the camera field-of-view.
[link:http://jsfiddle.net/Q4Jpu/ Example].
Why is part of my object invisible?
This could be because of face culling. Faces have an orientation that decides which side is which. And the culling removes the backside in normal circumstances. To see if this is your problem, change the material side to THREE.DoubleSide.
material.side = THREE.DoubleSide
Why does three.js sometimes return strange results for invalid inputs?
For performance reasons, three.js doesn't validate inputs in most cases. It's your app's responsibility to make sure that all inputs are valid.
Can I use three.js in Node.js?
Because three.js is built for the web, it depends on browser and DOM APIs that don't always exist in Node.js. Some of these issues can be avoided by using shims like [link:https://github.com/stackgl/headless-gl headless-gl] and [link:https://github.com/rstacruz/jsdom-global jsdom-global], or by replacing components like [page:TextureLoader] with custom alternatives. Other DOM APIs may be deeply intertwined with the code that uses them, and will be harder to work around. We welcome simple and maintainable pull requests to improve Node.js support, but recommend opening an issue to discuss your improvements first.

[name]
This is the base class for most objects in three.js and provides a set of
properties and methods for manipulating objects in 3D space.
Note that this can be used for grouping objects via the [page:.add]( object ) method which adds the object as a child, however it is better to
use [page:Group] for this.
Constructor
[name]()
The constructor takes no arguments.
Properties
[property:AnimationClip animations]
Array with object's animation clips.
[property:Boolean castShadow]
Whether the object gets rendered into shadow map. Default is `false`.
[property:Array children]
Array with object's children. See [page:Group] for info on manually
grouping objects.
[property:Material customDepthMaterial]
Custom depth material to be used when rendering to the depth map. Can only
be used in context of meshes. When shadow-casting with a
[page:DirectionalLight] or [page:SpotLight], if you are modifying vertex
positions in the vertex shader you must specify a customDepthMaterial for
proper shadows. Default is `undefined`.
[property:Material customDistanceMaterial]
Same as [page:.customDepthMaterial customDepthMaterial], but used with
[page:PointLight]. Default is `undefined`.
[property:Boolean frustumCulled]
When this is set, it checks every frame if the object is in the frustum of
the camera before rendering the object. If set to `false` the object gets
rendered every frame even if it is not in the frustum of the camera.
Default is `true`.
[property:Integer id]
readonly – Unique number for this object instance.
[property:Boolean isObject3D]
Read-only flag to check if a given object is of type [name].
[property:Layers layers]
The layer membership of the object. The object is only visible if it has
at least one layer in common with the [page:Camera] in use. This property
can also be used to filter out unwanted objects in ray-intersection tests
when using [page:Raycaster].
[property:Matrix4 matrix]
The local transform matrix.
[property:Boolean matrixAutoUpdate]
When this is set, it calculates the matrix of position, (rotation or
quaternion) and scale every frame and also recalculates the matrixWorld
property. Default is [page:Object3D.DEFAULT_MATRIX_AUTO_UPDATE] (true).
[property:Matrix4 matrixWorld]
The global transform of the object. If the Object3D has no parent, then
it's identical to the local transform [page:.matrix].
[property:Boolean matrixWorldAutoUpdate]
If set, then the renderer checks every frame if the object and its
children need matrix updates. When it isn't, then you have to maintain all
matrices in the object and its children yourself. Default is
[page:Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE] (true).
[property:Boolean matrixWorldNeedsUpdate]
When this is set, it calculates the matrixWorld in that frame and resets
this property to false. Default is `false`.
[property:Matrix4 modelViewMatrix]
This is passed to the shader and used to calculate the position of the
object.
[property:String name]
Optional name of the object (doesn't need to be unique). Default is an
empty string.
[property:Matrix3 normalMatrix]
This is passed to the shader and used to calculate lighting for the
object. It is the transpose of the inverse of the upper left 3x3
sub-matrix of this object's modelViewMatrix.
The reason for this special matrix is that simply using the
modelViewMatrix could result in a non-unit length of normals (on scaling)
or in a non-perpendicular direction (on non-uniform scaling).
On the other hand the translation part of the modelViewMatrix is not
relevant for the calculation of normals. Thus a Matrix3 is sufficient.
[property:Function onAfterRender]
An optional callback that is executed immediately after a 3D object is
rendered. This function is called with the following parameters: renderer,
scene, camera, geometry, material, group.
Please notice that this callback is only executed for `renderable` 3D
objects. Meaning 3D objects which define their visual appearance with
geometries and materials like instances of [page:Mesh], [page:Line],
[page:Points] or [page:Sprite]. Instances of [page:Object3D], [page:Group]
or [page:Bone] are not renderable and thus this callback is not executed
for such objects.
[property:Function onAfterShadow]
An optional callback that is executed immediately after a 3D object is
rendered to a shadow map. This function is called with the following parameters: renderer,
scene, camera, shadowCamera, geometry, depthMaterial, group.
Please notice that this callback is only executed for `renderable` 3D
objects. Meaning 3D objects which define their visual appearance with
geometries and materials like instances of [page:Mesh], [page:Line],
[page:Points] or [page:Sprite]. Instances of [page:Object3D], [page:Group]
or [page:Bone] are not renderable and thus this callback is not executed
for such objects.
[property:Function onBeforeRender]
An optional callback that is executed immediately before a 3D object is
rendered. This function is called with the following parameters: renderer,
scene, camera, geometry, material, group.
Please notice that this callback is only executed for `renderable` 3D
objects. Meaning 3D objects which define their visual appearance with
geometries and materials like instances of [page:Mesh], [page:Line],
[page:Points] or [page:Sprite]. Instances of [page:Object3D], [page:Group]
or [page:Bone] are not renderable and thus this callback is not executed
for such objects.
[property:Function onBeforeShadow]
An optional callback that is executed immediately before a 3D object is
rendered to a shadow map. This function is called with the following parameters: renderer,
scene, camera, shadowCamera, geometry, depthMaterial, group.
Please notice that this callback is only executed for `renderable` 3D
objects. Meaning 3D objects which define their visual appearance with
geometries and materials like instances of [page:Mesh], [page:Line],
[page:Points] or [page:Sprite]. Instances of [page:Object3D], [page:Group]
or [page:Bone] are not renderable and thus this callback is not executed
for such objects.
[property:Object3D parent]
Object's parent in the [link:https://en.wikipedia.org/wiki/Scene_graph scene graph]. An object can have at most one parent.
[property:Vector3 position]
A [page:Vector3] representing the object's local position. Default is `(0,
0, 0)`.
[property:Quaternion quaternion]
Object's local rotation as a [page:Quaternion Quaternion].
[property:Boolean receiveShadow]
Whether the material receives shadows. Default is `false`.
[property:Number renderOrder]
This value allows the default rendering order of
[link:https://en.wikipedia.org/wiki/Scene_graph scene graph] objects to be
overridden although opaque and transparent objects remain sorted
independently. When this property is set for an instance of [page:Group Group], all descendants objects will be sorted and rendered together.
Sorting is from lowest to highest renderOrder. Default value is `0`.
[property:Euler rotation]
Object's local rotation (see
[link:https://en.wikipedia.org/wiki/Euler_angles Euler angles]), in
radians.
[property:Vector3 scale]
The object's local scale. Default is [page:Vector3]( 1, 1, 1 ).
[property:Vector3 up]
This is used by the [page:.lookAt lookAt] method, for example, to
determine the orientation of the result.
Default is [page:Object3D.DEFAULT_UP] - that is, `( 0, 1, 0 )`.
[property:Object userData]
An object that can be used to store custom data about the Object3D. It
should not hold references to functions as these will not be cloned.
Default is an empty object `{}`.
[property:String uuid]
[link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID] of
this object instance. This gets automatically assigned, so this shouldn't
be edited.
[property:Boolean visible]
Object gets rendered if `true`. Default is `true`.
Static Properties
Static properties and methods are defined per class rather than per
instance of that class. This means that changing
[page:Object3D.DEFAULT_UP] or [page:Object3D.DEFAULT_MATRIX_AUTO_UPDATE]
will change the values of [page:.up up] and [page:.matrixAutoUpdate matrixAutoUpdate] for `every` instance of Object3D (or derived classes)
created after the change has been made (already created Object3Ds will not
be affected).
[property:Vector3 DEFAULT_UP]
The default [page:.up up] direction for objects, also used as the default
position for [page:DirectionalLight], [page:HemisphereLight] and
[page:Spotlight] (which creates lights shining from the top down).
Set to ( 0, 1, 0 ) by default.
[property:Boolean DEFAULT_MATRIX_AUTO_UPDATE]
The default setting for [page:.matrixAutoUpdate matrixAutoUpdate] for
newly created Object3Ds.
[property:Boolean DEFAULT_MATRIX_WORLD_AUTO_UPDATE]
The default setting for [page:.matrixWorldAutoUpdate
matrixWorldAutoUpdate] for newly created Object3Ds.
Methods
[page:EventDispatcher EventDispatcher] methods are available on this
class.
[method:this add]( [param:Object3D object], ... )
Adds `object` as child of this object. An arbitrary number of objects may
be added. Any current parent on an object passed in here will be removed,
since an object can have at most one parent.
See [page:Group] for info on manually grouping objects.
[method:undefined applyMatrix4]( [param:Matrix4 matrix] )
Applies the matrix transform to the object and updates the object's
position, rotation and scale.
[method:this applyQuaternion]( [param:Quaternion quaternion] )
Applies the rotation represented by the quaternion to the object.
[method:this attach]( [param:Object3D object] )
Adds `object` as a child of this, while maintaining the object's world
transform.
Note: This method does not support scene graphs having
non-uniformly-scaled nodes(s).
[method:this clear]()
Removes all child objects.
[method:Object3D clone]( [param:Boolean recursive] )
recursive -- if true, descendants of the object are also cloned. Default
is true.
Returns a clone of this object and optionally all descendants.
[method:this copy]( [param:Object3D object], [param:Boolean recursive] )
recursive -- if true, descendants of the object are also copied. Default
is true.
Copy the given object into this object. Note: event listeners and
user-defined callbacks ([page:.onAfterRender] and [page:.onBeforeRender])
are not copied.
[method:Object3D getObjectById]( [param:Integer id] )
id -- Unique number of the object instance
Searches through an object and its children, starting with the object
itself, and returns the first with a matching id.
Note that ids are assigned in chronological order: 1, 2, 3, ...,
incrementing by one for each new object.
[method:Object3D getObjectByName]( [param:String name] )
name -- String to match to the children's Object3D.name property.
Searches through an object and its children, starting with the object
itself, and returns the first with a matching name.
Note that for most objects the name is an empty string by default. You
will have to set it manually to make use of this method.
[method:Object3D getObjectByProperty]( [param:String name], [param:Any value] )
name -- the property name to search for.
value -- value of the given property.
Searches through an object and its children, starting with the object
itself, and returns the first with a property that matches the value
given.
[method:Object3D getObjectsByProperty]( [param:String name], [param:Any value], [param:Array optionalTarget] )
name -- the property name to search for.
value -- value of the given property.
optionalTarget -- (optional) target to set the result.
Otherwise a new Array is instantiated. If set, you must clear this
array prior to each call (i.e., array.length = 0;).
Searches through an object and its children, starting with the object
itself, and returns all the objects with a property that matches the value
given.
[method:Vector3 getWorldPosition]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns a vector representing the position of the object in world space.
[method:Quaternion getWorldQuaternion]( [param:Quaternion target] )
[page:Quaternion target] — the result will be copied into this Quaternion.
Returns a quaternion representing the rotation of the object in world
space.
[method:Vector3 getWorldScale]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns a vector of the scaling factors applied to the object for each
axis in world space.
[method:Vector3 getWorldDirection]( [param:Vector3 target] )
[page:Vector3 target] — the result will be copied into this Vector3.
Returns a vector representing the direction of object's positive z-axis in
world space.
[method:Vector3 localToWorld]( [param:Vector3 vector] )
vector - A vector representing a position in this object's local space.
Converts the vector from this object's local space to world space.
[method:undefined lookAt]( [param:Vector3 vector] )
[method:undefined lookAt]( [param:Float x], [param:Float y], [param:Float z] )
vector - A vector representing a position in world space.
Optionally, the [page:.x x], [page:.y y] and [page:.z z] components of the
world space position.
Rotates the object to face a point in world space.
This method does not support objects having non-uniformly-scaled
parent(s).
[method:undefined raycast]( [param:Raycaster raycaster], [param:Array intersects] )
Abstract (empty) method to get intersections between a casted ray and this
object. Subclasses such as [page:Mesh], [page:Line], and [page:Points]
implement this method in order to use raycasting.
[method:this remove]( [param:Object3D object], ... )
Removes `object` as child of this object. An arbitrary number of objects
may be removed.
[method:this removeFromParent]()
Removes this object from its current parent.
[method:this rotateOnAxis]( [param:Vector3 axis], [param:Float angle] )
axis -- A normalized vector in object space.
angle -- The angle in radians.
Rotate an object along an axis in object space. The axis is assumed to be
normalized.
[method:this rotateOnWorldAxis]( [param:Vector3 axis], [param:Float angle])
axis -- A normalized vector in world space.
angle -- The angle in radians.
Rotate an object along an axis in world space. The axis is assumed to be
normalized. Method Assumes no rotated parent.
[method:this rotateX]( [param:Float rad] )
rad - the angle to rotate in radians.
Rotates the object around x axis in local space.
[method:this rotateY]( [param:Float rad] )
rad - the angle to rotate in radians.
Rotates the object around y axis in local space.
[method:this rotateZ]( [param:Float rad] )
rad - the angle to rotate in radians.
Rotates the object around z axis in local space.
[method:undefined setRotationFromAxisAngle]( [param:Vector3 axis], [param:Float angle] )
axis -- A normalized vector in object space.
angle -- angle in radians
Calls [page:Quaternion.setFromAxisAngle setFromAxisAngle]( [page:Float axis], [page:Float angle] ) on the [page:.quaternion].
[method:undefined setRotationFromEuler]( [param:Euler euler] )
euler -- Euler angle specifying rotation amount.
Calls [page:Quaternion.setRotationFromEuler setRotationFromEuler](
[page:Euler euler]) on the [page:.quaternion].
[method:undefined setRotationFromMatrix]( [param:Matrix4 m] )
m -- rotate the quaternion by the rotation component of the matrix.
Calls [page:Quaternion.setFromRotationMatrix setFromRotationMatrix](
[page:Matrix4 m]) on the [page:.quaternion].
Note that this assumes that the upper 3x3 of m is a pure rotation matrix
(i.e, unscaled).
[method:undefined setRotationFromQuaternion]( [param:Quaternion q] )
q -- normalized Quaternion.
Copy the given quaternion into [page:.quaternion].
[method:Object toJSON]( [param:Object meta] )
meta -- object containing metadata such as materials, textures or images
for the object.
Convert the object to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
[method:this translateOnAxis]( [param:Vector3 axis], [param:Float distance] )
axis -- A normalized vector in object space.
distance -- The distance to translate.
Translate an object by distance along an axis in object space. The axis is
assumed to be normalized.
[method:this translateX]( [param:Float distance] )
Translates object along x axis in object space by `distance` units.
[method:this translateY]( [param:Float distance] )
Translates object along y axis in object space by `distance` units.
[method:this translateZ]( [param:Float distance] )
Translates object along z axis in object space by `distance` units.
[method:undefined traverse]( [param:Function callback] )
callback - A function with as first argument an object3D object.
Executes the callback on this object and all descendants.
Note: Modifying the scene graph inside the callback is discouraged.
[method:undefined traverseVisible]( [param:Function callback] )
callback - A function with as first argument an object3D object.
Like traverse, but the callback will only be executed for visible objects.
Descendants of invisible objects are not traversed.
Note: Modifying the scene graph inside the callback is discouraged.
[method:undefined traverseAncestors]( [param:Function callback] )
callback - A function with as first argument an object3D object.
Executes the callback on all ancestors.
Note: Modifying the scene graph inside the callback is discouraged.
[method:undefined updateMatrix]()
Updates the local transform.
[method:undefined updateMatrixWorld]( [param:Boolean force] )
force - A boolean that can be used to bypass
[page:.matrixWorldAutoUpdate], to recalculate the world matrix of the
object and descendants on the current frame. Useful if you cannot wait for
the renderer to update it on the next frame (assuming
[page:.matrixWorldAutoUpdate] set to `true`).
Updates the global transform of the object and its descendants if the
world matrix needs update ([page:.matrixWorldNeedsUpdate] set to true) or
if the `force` parameter is set to `true`.
[method:undefined updateWorldMatrix]( [param:Boolean updateParents], [param:Boolean updateChildren] )
updateParents - recursively updates global transform of ancestors.
updateChildren - recursively updates global transform of descendants.
Updates the global transform of the object.
[method:Vector3 worldToLocal]( [param:Vector3 vector] )
vector - A vector representing a position in world space.
Converts the vector from world space to this object's local space.
Events
added
Fires when the object has been added to its parent object.
removed
Fires when the object has been removed from its parent object.
childadded
Fires when a new child object has been added.
childremoved
Fires when a new child object has been removed.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Curve] → [page:CurvePath] → [page:Path] →
[name]
Defines an arbitrary 2d shape plane using paths with optional holes. It
can be used with [page:ExtrudeGeometry], [page:ShapeGeometry], to get
points, or to get triangulated faces.
Code Example
const heartShape = new THREE.Shape();
heartShape.moveTo( 25, 25 );
heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
const extrudeSettings = {
depth: 8,
bevelEnabled: true,
bevelSegments: 2,
steps: 2,
bevelSize: 1,
bevelThickness: 1
};
const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
const mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
Examples
[example:webgl_geometry_shapes geometry / shapes ]
[example:webgl_geometry_extrude_shapes geometry / extrude / shapes ]
Constructor
[name]( [param:Array points] )
points -- (optional) array of [page:Vector2 Vector2s].
Creates a Shape from the points. The first point defines the offset, then
successive points are added to the [page:CurvePath.curves curves] array as
[page:LineCurve LineCurves].
If no points are specified, an empty shape is created and the
[page:.currentPoint] is set to the origin.
Properties
See the base [page:Path] class for common properties.
[property:String uuid]
[link:http://en.wikipedia.org/wiki/Universally_unique_identifier UUID] of
this instance. This gets automatically assigned, so this shouldn't be
edited.
[property:Array holes]
An array of [page:Path paths] that define the holes in the shape.
Methods
See the base [page:Path] class for common methods.
[method:Array extractPoints]( [param:Integer divisions] )
divisions -- The fineness of the result.
Call [page:Curve.getPoints getPoints] on the shape and the [page:.holes]
array, and return an object of the form:
{ shape holes }
where shape and holes are arrays of [page:Vector2 Vector2s].
[method:Array getPointsHoles]( [param:Integer divisions] )
divisions -- The fineness of the result.
Get an array of [page:Vector2 Vector2s] that represent the holes in the
shape.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
[name] can be used to load cube maps. The loader returns an instance of [page:CubeTexture] and expects the cube map to
be defined as six separate images representing the sides of a cube. Other cube map definitions like vertical and horizontal cross,
column and row layouts are not supported.
The loaded [page:CubeTexture] is in sRGB color space. Meaning the [page:Texture.colorSpace colorSpace]
property is set to `THREE.SRGBColorSpace` by default.
Code Example
const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
.setPath( 'textures/cubeMaps/' )
.load( [
'px.png',
'nx.png',
'py.png',
'ny.png',
'pz.png',
'nz.png'
] );
Examples
[example:webgl_materials_cubemap materials / cubemap]
[example:webgl_materials_cubemap_dynamic materials / cubemap / dynamic]
[example:webgl_materials_cubemap_refraction materials / cubemap / refraction]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
Methods
See the base [page:Loader] class for common methods.
[method:CubeTexture load]( [param:String urls], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String urls] — array of 6 urls to images, one for each side of the
CubeTexture. The urls should be specified in the following order: pos-x,
neg-x, pos-y, neg-y, pos-z, neg-z. They can also be
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URIs].
Note that, by convention, cube maps are specified in a coordinate system
in which positive-x is to the right when looking up the positive-z axis --
in other words, using a left-handed coordinate system. Since three.js uses
a right-handed coordinate system, environment maps used in three.js will
have pos-x and neg-x swapped.
[page:Function onLoad] (optional) — Will be called when load completes.
The argument will be the loaded [page:CubeTexture texture].
[page:Function onProgress] (optional) — This callback function is
currently not supported.
[page:Function onError] (optional) — Will be called when load errors.
Begin loading from url and pass the loaded [page:CubeTexture texture] to
onLoad. The method also returns a new texture object which can directly be
used for material creation.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
A material for shiny surfaces with specular highlights.
The material uses a non-physically based
[link:https://en.wikipedia.org/wiki/Blinn-Phong_shading_model Blinn-Phong]
model for calculating reflectance. Unlike the Lambertian model used in the
[page:MeshLambertMaterial] this can simulate shiny surfaces with specular
highlights (such as varnished wood). [name] uses per-fragment shading.
Performance will generally be greater when using this material over the
[page:MeshStandardMaterial] or [page:MeshPhysicalMaterial], at the cost of
some graphical accuracy.
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
The exception is the property [page:Hexadecimal color], which can be
passed in as a hexadecimal string and is `0xffffff` (white) by default.
[page:Color.set]( color ) is called internally.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Texture aoMap]
The red channel of this texture is used as the ambient occlusion map.
Default is null. The aoMap requires a second set of UVs.
[property:Float aoMapIntensity]
Intensity of the ambient occlusion effect. Default is `1`. Zero is no
occlusion effect.
[property:Texture bumpMap]
The texture to create a bump map. The black and white values map to the
perceived depth in relation to the lights. Bump doesn't actually affect
the geometry of the object, only the lighting. If a normal map is defined
this will be ignored.
[property:Float bumpScale]
How much the bump map affects the material. Typical ranges are 0-1.
Default is `1`.
[property:Color color]
[page:Color] of the material, by default set to white (0xffffff).
[property:Integer combine]
How to combine the result of the surface's color with the environment map,
if any.
Options are [page:Materials THREE.MultiplyOperation] (default),
[page:Materials THREE.MixOperation], [page:Materials THREE.AddOperation].
If mix is chosen, the [page:.reflectivity] is used to blend between the
two colors.
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Color emissive]
Emissive (light) color of the material, essentially a solid color
unaffected by other lighting. Default is black.
[property:Texture emissiveMap]
Set emissive (glow) map. Default is null. The emissive map color is
modulated by the emissive color and the emissive intensity. If you have an
emissive map, be sure to set the emissive color to something other than
black.
[property:Float emissiveIntensity]
Intensity of the emissive light. Modulates the emissive color. Default is
1.
[property:Texture envMap]
The environment map. Default is null.
[property:Euler envMapRotation]
The rotation of the environment map in radians. Default is `(0,0,0)`.
[property:Boolean flatShading]
Define whether the material is rendered with flat shading. Default is
false.
[property:Boolean fog]
Whether the material is affected by fog. Default is `true`.
[property:Texture lightMap]
The light map. Default is null. The lightMap requires a second set of UVs.
[property:Float lightMapIntensity]
Intensity of the baked light. Default is `1`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null. The texture map color is modulated by the
diffuse [page:.color].
[property:Texture normalMap]
The texture to create a normal map. The RGB values affect the surface
normal for each pixel fragment and change the way the color is lit. Normal
maps do not change the actual shape of the surface, only the lighting. In
case the material has a normal map authored using the left handed
convention, the y component of normalScale should be negated to compensate
for the different handedness.
[property:Integer normalMapType]
The type of normal map.
Options are [page:constant THREE.TangentSpaceNormalMap] (default), and
[page:constant THREE.ObjectSpaceNormalMap].
[property:Vector2 normalScale]
How much the normal map affects the material. Typical ranges are 0-1.
Default is a [page:Vector2] set to (1,1).
[property:Float reflectivity]
How much the environment map affects the surface; also see
[page:.combine]. The default value is `1` and the valid range is between `0`
(no reflections) and `1` (full reflections).
[property:Float refractionRatio]
The index of refraction (IOR) of air (approximately 1) divided by the
index of refraction of the material. It is used with environment mapping
modes [page:Textures THREE.CubeRefractionMapping] and [page:Textures THREE.EquirectangularRefractionMapping].
The refraction ratio should not exceed `1`. Default is `0.98`.
[property:Float shininess]
How shiny the [page:.specular] highlight is; a higher value gives a
sharper highlight. Default is `30`.
[property:Color specular]
Specular color of the material. Default is a [page:Color] set to
`0x111111` (very dark grey).
This defines how shiny the material is and the color of its shine.
[property:Texture specularMap]
The specular map value affects both how much the specular surface
highlight contributes and how much of the environment map affects the
surface. Default is null.
[property:Boolean wireframe]
Render geometry as wireframe. Default is `false` (i.e. render as flat
polygons).
[property:String wireframeLinecap]
Define appearance of line ends. Possible values are "butt", "round" and
"square". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:String wireframeLinejoin]
Define appearance of line joints. Possible values are "round", "bevel" and
"miter". Default is 'round'.
This corresponds to the
[link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
[property:Float wireframeLinewidth]
Controls wireframe thickness. Default is `1`.
Due to limitations of the
[link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
with the [page:WebGLRenderer WebGL] renderer on most
platforms linewidth will always be `1` regardless of the set value.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferAttribute] →
BufferAttribute Types
There are nine types of [page:BufferAttribute] available in three.js.
These correspond to the JavaScript
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#Syntax Typed Arrays].
THREE.Float32BufferAttribute
THREE.Float16BufferAttribute
THREE.Uint32BufferAttribute
THREE.Int32BufferAttribute
THREE.Uint16BufferAttribute
THREE.Int16BufferAttribute
THREE.Uint8ClampedBufferAttribute
THREE.Uint8BufferAttribute
THREE.Int8BufferAttribute
Constructor
All of the above are called in the same way.
TypedBufferAttribute( [param:Array_or_Integer array], [param:Integer itemSize], [param:Boolean normalized] )
array -- this can be a typed or untyped (normal) array or an integer
length. An array value will be converted to the Type specified. If a
length is given a new TypedArray will created, initialized with all
elements set to zero.
itemSize -- the number of values of the array that should be associated
with a particular vertex.
normalized -- (optional) indicates how the underlying data in the buffer
maps to the values in the GLSL code.
Properties
See the [page:BufferAttribute] page for inherited properties.
Methods
See the [page:BufferAttribute] page for inherited methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js src/core/BufferAttribute.js]

[page:Texture] →
[name]
This class can be used to automatically save the depth information of a
rendering into a texture.
Examples
[example:webgl_depth_texture depth / texture]
Constructor
[name]( [param:Number width], [param:Number height], [param:Constant type],
[param:Constant mapping], [param:Constant wrapS], [param:Constant wrapT],
[param:Constant magFilter], [param:Constant minFilter],
[param:Number anisotropy], [param:Constant format] )
[page:Number width] -- width of the texture.
[page:Number height] -- height of the texture.
[page:Constant type] -- Default is [page:Textures THREE.UnsignedIntType]
when using [page:Textures DepthFormat] and [page:Textures THREE.UnsignedInt248Type]
when using [page:Textures DepthStencilFormat].
See [page:Textures type constants] for other choices.
[page:Constant mapping] -- See [page:Textures mapping mode constants] for
details.
[page:Constant wrapS] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant wrapT] -- The default is [page:Textures THREE.ClampToEdgeWrapping].
See [page:Textures wrap mode constants] for
other choices.
[page:Constant magFilter] -- How the texture is sampled when a texel
covers more than one pixel. The default is [page:Textures THREE.NearestFilter].
See [page:Textures magnification filter constants]
for other choices.
[page:Constant minFilter] -- How the texture is sampled when a texel
covers less than one pixel. The default is [page:Textures THREE.NearestFilter].
See [page:Textures minification filter constants]
for other choices.
[page:Number anisotropy] -- The number of samples taken along the axis
through the pixel that has the highest density of texels. By default, this
value is `1`. A higher value gives a less blurry result than a basic mipmap,
at the cost of more texture samples being used. Use
[page:WebGLrenderer.getMaxAnisotropy renderer.getMaxAnisotropy]() to find
the maximum valid anisotropy value for the GPU; this value is usually a
power of 2.
[page:Constant format] -- must be either [page:Textures DepthFormat]
(default) or [page:Textures DepthStencilFormat]. See [page:Textures format constants] for details.
Properties
See the base [page:Texture Texture] class for common properties - the
following are also part of the texture class, but have different defaults
here.
[page:Texture.format format]
Either [page:Textures DepthFormat] (default) or [page:Textures DepthStencilFormat].
See [page:Textures format constants] for details.
[page:Texture.type type]
Default is [page:Textures THREE.UnsignedIntType] when using [page:Textures DepthFormat]
and [page:Textures THREE.UnsignedInt248Type] when using
[page:Textures DepthStencilFormat]. See [page:Textures format constants]
for details.
[page:Texture.magFilter magFilter]
How the texture is sampled when a texel covers more than one pixel. The
default is [page:Textures THREE.NearestFilter]. See [page:Textures magnification filter constants] for other choices.
[page:Texture.minFilter minFilter]
How the texture is sampled when a texel covers less than one pixel. The
default is [page:Textures THREE.NearestFilter]. See [page:Textures magnification filter constants]
for other choices.
[page:Texture.flipY flipY]
Depth textures do not need to be flipped so this is `false` by default.
[page:Texture.generateMipmaps .generateMipmaps]
Depth textures do not use mipmaps.
[property:Boolean isDepthTexture]
Read-only flag to check if a given object is of type [name].
[property:number compareFunction]
This is used to define the comparison function used when comparing texels in the depth texture to the value in the depth buffer.
Default is `null` which means comparison is disabled.
See the [page:Textures texture constants] page for details of other functions.
Methods
See the base [page:Texture Texture] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:BufferGeometry] →
[name]
[name] can be used to create a decal mesh that serves different kinds of purposes e.g. adding unique details
to models, performing dynamic visual environmental changes or covering seams.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
Code Example
const geometry =
new DecalGeometry( mesh, position, orientation, size );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
Examples
[example:webgl_decals WebGL / decals]
Constructor
[name]( [param:Mesh mesh], [param:Vector3 position], [param:Euler orientation], [param:Vector3 size] )
mesh — Any mesh object.
position — Position of the decal projector.
orientation — Orientation of the decal projector.
size — Size of the decal projector.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/DecalGeometry.js examples/jsm/geometries/DecalGeometry.js]

[page:Object3D] →
[name]
Abstract base class for lights - all other light types inherit the
properties and methods described here.
Constructor
[name]( [param:Integer color], [param:Float intensity] )
[page:Integer color] - (optional) hexadecimal color of the light. Default
is 0xffffff (white).
[page:Float intensity] - (optional) numeric value of the light's
strength/intensity. Default is `1`.
Creates a new [name]. Note that this is not intended to be called directly
(use one of derived classes instead).
Properties
See the base [page:Object3D Object3D] class for common properties.
[property:Color color]
Color of the light. Defaults to a new [page:Color] set to white, if not
passed in the constructor.
[property:Float intensity]
The light's intensity, or strength.
The units of intensity depend on the type of light.
Default - `1.0`.
[property:Boolean isLight]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Object3D Object3D] class for common methods.
[method:undefined dispose]()
Abstract dispose method for classes that extend this class; implemented by
subclasses that have disposable GPU-related resources.
[method:this copy]( [param:Light source] )
Copies the value of [page:.color color] and [page:.intensity intensity]
from the [page:Light source] light into this one.
[method:Object toJSON]( [param:Object meta] )
meta -- object containing metadata such as materials, textures for
objects.
Convert the light to three.js
[link:https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4 JSON Object/Scene format].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:OrbitControls] →
[name]
[name] is intended for transforming a camera over a map from bird's eye perspective.
The class shares its implementation with [page:OrbitControls] but uses a specific preset for mouse/touch interaction and disables screen space panning by default.
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { MapControls } from 'three/addons/controls/MapControls.js';
Code Example
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set( 0, 20, 100 );
const controls = new MapControls( camera, renderer.domElement );
controls.enableDamping = true;
function animate() {
requestAnimationFrame( animate );
// required if controls.enableDamping or controls.autoRotate are set to true
controls.update();
renderer.render( scene, camera );
}
Examples
[example:misc_controls_map misc / controls / map ]
Constructor
[name]( [param:Camera object], [param:HTMLDOMElement domElement] )
[page:Camera object]: (required) The camera to be controlled. The camera must not be a child of another object, unless that object is the scene itself.
[page:HTMLDOMElement domElement]: The HTML element used for event listeners.
Events
See the base [page:OrbitControls] class for common events.
Properties
See the base [page:OrbitControls] class for common properties.
[property:Object mouseButtons]
This object contains references to the mouse actions used by the controls.
controls.mouseButtons = {
LEFT: THREE.MOUSE.PAN,
MIDDLE: THREE.MOUSE.DOLLY,
RIGHT: THREE.MOUSE.ROTATE
}
[property:Boolean screenSpacePanning]
Defines how the camera's position is translated when panning. If true, the camera pans in screen space.
Otherwise, the camera pans in the plane orthogonal to the camera's up direction.
Default is `false`.
[property:Object touches]
This object contains references to the touch actions used by the controls.
controls.touches = {
ONE: THREE.TOUCH.PAN,
TWO: THREE.TOUCH.DOLLY_ROTATE
}
Methods
See the base [page:OrbitControls] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/MapControls.js examples/jsm/controls/MapControls.js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
A helper object to assist with visualizing a [page:Skeleton Skeleton]. The
helper is rendered using a [page:LineBasicMaterial LineBasicMaterial].
Code Example
const helper = new THREE.SkeletonHelper( skinnedMesh );
scene.add( helper );
Examples
[example:webgl_animation_skinning_blending WebGL / animation / skinning / blending]
[example:webgl_animation_skinning_morph WebGL / animation / skinning / morph]
[example:webgl_loader_bvh WebGL / loader / bvh ]
Constructor
[name]( [param:Object3D object] )
object -- Usually an instance of [page:SkinnedMesh]. However, any instance
of [page:Object3D] can be used if it represents a hierarchy of [page:Bone Bone]s (via [page:Object3D.children]).
Properties
[property:Array bones]
The list of bones that the helper renders as [page:Line Lines].
[property:Boolean isSkeletonHelper]
Read-only flag to check if a given object is of type [name].
[property:Object3D root]
The object passed in the constructor.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Material] →
[name]
[name] is internally used for implementing shadow mapping with
[page:PointLight]s.
Can also be used to customize the shadow casting of an object by assigning
an instance of [name] to [page:Object3D.customDistanceMaterial]. The
following examples demonstrates this approach in order to ensure
transparent parts of objects do no cast shadows.
Examples
[example:webgl_shadowmap_pointlight WebGL / shadowmap / pointlight]
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) an object with one or more
properties defining the material's appearance. Any property of the
material (including any property inherited from [page:Material]) can be
passed in here.
Properties
See the base [page:Material] class for common properties.
[property:Texture alphaMap]
The alpha map is a grayscale texture that controls the opacity across the
surface (black: fully transparent; white: fully opaque). Default is
null.
Only the color of the texture is used, ignoring the alpha channel if one
exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer
will use the green channel when sampling this texture due to the extra bit
of precision provided for green in DXT-compressed and uncompressed RGB 565
formats. Luminance-only and luminance/alpha textures will also still work
as expected.
[property:Texture displacementMap]
The displacement map affects the position of the mesh's vertices. Unlike
other maps which only affect the light and shade of the material the
displaced vertices can cast shadows, block other objects, and otherwise
act as real geometry. The displacement texture is an image where the value
of each pixel (white being the highest) is mapped against, and
repositions, the vertices of the mesh.
[property:Float displacementScale]
How much the displacement map affects the mesh (where black is no
displacement, and white is maximum displacement). Without a displacement
map set, this value is not applied. Default is `1`.
[property:Float displacementBias]
The offset of the displacement map's values on the mesh's vertices.
Without a displacement map set, this value is not applied. Default is `0`.
[property:Boolean fog]
Whether the material is affected by fog. Default is `false`.
[property:Texture map]
The color map. May optionally include an alpha channel, typically combined
with [page:Material.transparent .transparent] or [page:Material.alphaTest .alphaTest].
Default is null.
Methods
See the base [page:Material] class for common methods.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Mesh] →
[name]
A special version of [page:Mesh] with multi draw batch rendering support. Use
[name] if you have to render a large number of objects with the same
material but with different world transformations and geometry. The usage
of [name] will help you to reduce the number of draw calls and thus
improve the overall rendering performance in your application.
If the [link:https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_multi_draw WEBGL_multi_draw extension] is
not supported then a less performant callback is used.
Code Example
const box = new THREE.BoxGeometry( 1, 1, 1 );
const sphere = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// initialize and add geometries into the batched mesh
const batchedMesh = new BatchedMesh( 10, 5000, 10000, material );
const boxId = batchedMesh.addGeometry( box );
const sphereId = batchedMesh.addGeometry( sphere );
// position the geometries
batchedMesh.setMatrixAt( boxId, boxMatrix );
batchedMesh.setMatrixAt( sphereId, sphereMatrix );
scene.add( batchedMesh );
Examples
[example:webgl_mesh_batch WebGL / mesh / batch]
Constructor
[name](
[param:Integer maxGeometryCount], [param:Integer maxVertexCount],
[param:Integer maxIndexCount], [param:Material material],
)
[page:Integer maxGeometryCount] - the max number of individual geometries planned to be added.
[page:Integer maxVertexCount] - the max number of vertices to be used by all geometries.
[page:Integer maxIndexCount] - the max number of indices to be used by all geometries.
[page:Material material] - an instance of [page:Material]. Default is a
new [page:MeshBasicMaterial].
Properties
See the base [page:Mesh] class for common properties.
[property:Box3 boundingBox]
This bounding box encloses all instances of the [name]. Can be calculated
with [page:.computeBoundingBox](). Default is `null`.
[property:Sphere boundingSphere]
This bounding sphere encloses all instances of the [name]. Can be
calculated with [page:.computeBoundingSphere](). Default is `null`.
[property:Boolean perObjectFrustumCulled]
If true then the individual objects within the [name] are frustum culled. Default is `true`.
[property:Boolean sortObjects]
If true then the individual objects within the [name] are sorted to improve overdraw-related artifacts.
If the material is marked as "transparent" objects are rendered back to front and if not then they are
rendered front to back. Default is `true`.
[property:Integer maxGeometryCount]
The maximum number of individual geometries that can be stored in the [name]. Read only.
[property:Boolean isBatchedMesh]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:Mesh] class for common methods.
[method:undefined computeBoundingBox]()
Computes the bounding box, updating [page:.boundingBox] attribute.
Bounding boxes aren't computed by default. They need to be explicitly
computed, otherwise they are `null`.
[method:undefined computeBoundingSphere]()
Computes the bounding sphere, updating [page:.boundingSphere]
attribute.
Bounding spheres aren't computed by default. They need to be explicitly
computed, otherwise they are `null`.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:this setCustomSort]( [param:Function sortFunction] )
Takes a sort a function that is run before render. The function takes a list of items to sort and a camera. The objects
in the list include a "z" field to perform a depth-ordered sort with.
[method:Matrix4 getMatrixAt]( [param:Integer index], [param:Matrix4 matrix] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Matrix4 matrix]: This 4x4 matrix will be set to the local
transformation matrix of the defined instance.
Get the local transformation matrix of the defined instance.
[method:Boolean getVisibleAt]( [param:Integer index] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
Get whether the given instance is marked as "visible" or not.
[method:this setMatrixAt]( [param:Integer index], [param:Matrix4 matrix] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Matrix4 matrix]: A 4x4 matrix representing the local transformation
of a single instance.
Sets the given local transformation matrix to the defined instance.
[method:this setVisibleAt]( [param:Integer index], [param:Boolean visible] )
[page:Integer index]: The index of an instance. Values have to be in the
range [0, count].
[page:Boolean visible]: A boolean value indicating the visibility state.
Sets the visibility of the object at the given index.
[method:Integer addGeometry]( [param:BufferGeometry geometry], [param:Integer reservedVertexRange], [param:Integer reservedIndexRange] )
[page:BufferGeometry geometry]: The geometry to add into the [name].
[page:Integer reservedVertexRange]: Optional parameter specifying the amount of vertex buffer space to reserve for the added geometry. This
is necessary if it is planned to set a new geometry at this index at a later time that is larger than the original geometry. Defaults to
the length of the given geometry vertex buffer.
[page:Integer reservedIndexRange]: Optional parameter specifying the amount of index buffer space to reserve for the added geometry. This
is necessary if it is planned to set a new geometry at this index at a later time that is larger than the original geometry. Defaults to
the length of the given geometry index buffer.
Adds the given geometry to the [name] and returns the associated index referring to it.
[method:Integer setGeometryAt]( [param:Integer index], [param:BufferGeometry geometry] )
[page:Integer index]: Which geometry index to replace with this geometry.
[page:BufferGeometry geometry]: The geometry to substitute at the given geometry index.
Replaces the geometry at `index` with the provided geometry. Throws an error if there is not enough space reserved for geometry at the index.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A loader for the PCD (Point Cloud Data) file format. [name] supports ASCII and (compressed) binary files as well as the following PCD fields:
x y z
rgb
normal_x normal_y normal_z
intensity
label
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
Code Example
// instantiate a loader
const loader = new PCDLoader();
// load a resource
loader.load(
// resource URL
'pointcloud.pcd',
// called when the resource is loaded
function ( points ) {
scene.add( points );
},
// called when loading is in progresses
function ( xhr ) {
console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
console.log( 'An error happened' );
}
);
Examples
[example:webgl_loader_pcd]
Constructor
[name]( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager] for the loader to use. Default is [page:LoadingManager THREE.DefaultLoadingManager].
Creates a new [name].
Properties
See the base [page:Loader] class for common properties.
[page:Boolean littleEndian]
Default value is true.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — A string containing the path/URL of the `.pcd` file.
[page:Function onLoad] — (optional) A function to be called after loading is successfully completed. The function receives loaded [page:Object3D] as an argument.
[page:Function onProgress] — (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, which contains [page:Integer total] and [page:Integer loaded] bytes. If the server does not set the Content-Length header; .[page:Integer total] will be 0.
[page:Function onError] — (optional) A function to be called if an error occurs during loading. The function receives the error as an argument.
Begin loading from url and call onLoad with the parsed response content.
[method:Object3D parse]( [param:Arraybuffer data],[param:String url] )
[page:Arraybuffer data] — The binary structure to parse.
[page:String url] — The file name or file url.
Parse an `pcd` binary structure and return an [page:Object3D].
The object is converted to [page:Points] with a [page:BufferGeometry] and a [page:PointsMaterial].
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/PCDLoader.js examples/jsm/loaders/PCDLoader.js]

[page:LightShadow] →
[name]
This is used internally by [page:PointLight PointLights] for calculating
shadows.
Code Example
//Create a WebGLRenderer and turn on shadows in the renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 10, 4 );
light.castShadow = true; // default false
scene.add( light );
//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );
//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add( plane );
//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
Constructor
[name]( )
Creates a new [name]. This is not intended to be called directly - it is
called internally by [page:PointLight].
Properties
See the base [page:LightShadow LightShadow] class for common properties.
[property:Boolean isPointLightShadow]
Read-only flag to check if a given object is of type [name].
Methods
See the base [page:LightShadow LightShadow] class for common methods.
[method:undefined updateMatrices]( [param:Light light], [param:number viewportIndex])
Update the matrices for the camera and shadow, used internally by the
renderer.
light -- the light for which the shadow is being rendered.
viewportIndex -- calculates the matrix for this viewport
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/lights/[name].js src/lights/[name].js]

[page:Object3D] → [page:Line] → [page:LineSegments] →
[name]
Visualizes an object's vertex normals.
Requires that normals have been specified in a [page:BufferAttribute custom attribute] or
have been calculated using [page:BufferGeometry.computeVertexNormals computeVertexNormals].
Import
[name] is an add-on, and must be imported explicitly.
See [link:#manual/introduction/Installation Installation / Addons].
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
Code Example
const geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh( geometry, material );
const helper = new VertexNormalsHelper( mesh, 1, 0xff0000 );
scene.add( mesh );
scene.add( helper );
Examples
[example:webgl_helpers WebGL / helpers]
Constructor
[name]( [param:Object3D object], [param:Number size], [param:Hex color] )
[page:Object3D object] -- object for which to render vertex normals.
[page:Number size] -- (optional) length of the arrows. Default is *1*.
[page:Hex color] -- (optional) hex color of the arrows. Default is *0xff0000*.
Properties
See the base [page:LineSegments] class for common properties.
[property:Object matrixAutoUpdate]
See [page:Object3D.matrixAutoUpdate]. Set to `false` here as the helper is using the
object's [page:Object3D.matrixWorld matrixWorld].
[property:Object3D object]
The object for which the vertex normals are being visualized.
[property:Number size]
Length of the arrows. Default is *1*.
Methods
See the base [page:LineSegments] class for common methods.
[method:undefined update]()
Updates the vertex tangents preview based on the object's world transform.
[method:undefined dispose]()
Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.
Source
[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/VertexNormalsHelper.js examples/jsm/helpers/VertexNormalsHelper.js]

[page:BufferGeometry] →
[name]
An instanced version of [page:BufferGeometry].
Constructor
[name]( )
Properties
See [page:BufferGeometry] for inherited properties.
[property:Number instanceCount]
Default is `Infinity`.
[property:Boolean isInstancedBufferGeometry]
Read-only flag to check if a given object is of type [name].
Methods
See [page:BufferGeometry] for inherited methods.
[method:this copy]( [param:InstancedBufferGeometry source] )
Copies the given [name] to this instance.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
A KeyframeTrack is a timed sequence of
[link:https://en.wikipedia.org/wiki/Key_frame keyframes], which are
composed of lists of times and related values, and which are used to
animate a specific property of an object.
For an overview of the different elements of the three.js animation system
see the "Animation System" article in the "Next Steps" section of the
manual.
In contrast to the animation hierarchy of the
[link:https://github.com/mrdoob/three.js/wiki/JSON-Model-format-3 JSON model format] a `KeyframeTrack` doesn't store its single keyframes as
objects in a "keys" array (holding the times and the values for each frame
together in one place).
Instead of this there are always two arrays in a `KeyframeTrack`: the
[page:.times times] array stores the time values for all keyframes of this
track in sequential order, and the [page:.values values] array contains
the corresponding changing values of the animated property.
A single value, belonging to a certain point of time, can not only be a
simple number, but (for example) a vector (if a position is animated) or a
quaternion (if a rotation is animated). For this reason the values array
(which is a flat array, too) might be three or four times as long as the
times array.
Corresponding to the different possible types of animated values there are
several subclasses of `KeyframeTrack`, inheriting the most properties and
methods:
[page:BooleanKeyframeTrack]
[page:ColorKeyframeTrack]
[page:NumberKeyframeTrack]
[page:QuaternionKeyframeTrack]
[page:StringKeyframeTrack]
[page:VectorKeyframeTrack]
Some examples of how to manually create [page:AnimationClip AnimationClips] with different sorts of KeyframeTracks can be found in the
[link:https://threejs.org/examples/jsm/animation/AnimationClipCreator.js AnimationClipCreator] file.
Since explicit values are only specified for the discrete points of time
stored in the times array, all values in between have to be interpolated.
The track's name is important for the connection of this track with a
specific property of the animated node (done by [page:PropertyBinding]).
Constructor
[name]( [param:String name], [param:Array times], [param:Array values], [param:Constant interpolation] )
[page:String name] - the identifier for the `KeyframeTrack`.
[page:Array times] - an array of keyframe times, converted internally to a
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array Float32Array].
[page:Array values] - an array with the values related to the times array,
converted internally to a
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array Float32Array].
[page:Constant interpolation] - the type of interpolation to use. See
[page:Animation Animation Constants] for possible values. Default is
[page:Animation InterpolateLinear].
Properties
[property:String name]
The track's name can refer to morph targets or [page:SkinnedMesh bones] or
possibly other values within an animated object. See
[page:PropertyBinding.parseTrackName] for the forms of strings that can be
parsed for property binding:
The name can specify the node either using its name or its uuid (although
it needs to be in the subtree of the scene graph node passed into the
mixer). Or, if the track name starts with a dot, the track applies to the
root node that was passed into the mixer.
Usually after the node a property will be specified directly. But you can
also specify a subproperty, such as .rotation[x], if you just want to
drive the X component of the rotation via a float track.
You can also specify bones or multimaterials by using an object name, for
example: .bones[R_hand].scale; the red channel of the diffuse color of the
fourth material in a materials array - as a further example - can be
accessed with .materials[3].diffuse[r].
PropertyBinding will also resolve morph target names, for example:
.morphTargetInfluences[run].
Note: The track's name does not necessarily have to be unique. Multiple
tracks can drive the same property. The result should be based on a
weighted blend between the multiple tracks according to the weights of
their respective actions.
[property:Float32Array times]
A
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array Float32Array], converted from the times array which is passed in the
constructor.
[property:Float32Array values]
A
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array Float32Array], converted from the values array which is passed in the
constructor.
[property:Constant DefaultInterpolation]
The default interpolation type: [page:Animation InterpolateLinear].
[property:Constant TimeBufferType ]
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array Float32Array], the type of the buffer internally used for the times.
[property:Constant ValueBufferType ]
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array Float32Array], the type of the buffer internally used for the values.
Methods
[method:KeyframeTrack clone]()
Returns a copy of this track.
[method:Interpolant createInterpolant]()
Creates a [page:LinearInterpolant LinearInterpolant],
[page:CubicInterpolant CubicInterpolant] or [page:DiscreteInterpolant DiscreteInterpolant], depending on the value of the interpolation
parameter passed in the constructor.
[method:Interpolant getInterpolation]()
Returns the interpolation type.
[method:Number getValueSize]()
Returns the size of each value (that is the length of the [page:.values values] array divided by the length of the [page:.times times] array).
[method:DiscreteInterpolant InterpolantFactoryMethodDiscrete]( [link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array result] )
Creates a new [page:DiscreteInterpolant DiscreteInterpolant] from the
[page:KeyframeTrack.times times] and [page:KeyframeTrack.times values]. A
Float32Array can be passed which will receive the results. Otherwise a new
array with the appropriate size will be created automatically.
[method:LinearInterpolant InterpolantFactoryMethodLinear]( [link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array result] )
Creates a new [page:LinearInterpolant LinearInterpolant] from the
[page:KeyframeTrack.times times] and [page:KeyframeTrack.times values]. A
Float32Array can be passed which will receive the results. Otherwise a new
array with the appropriate size will be created automatically.
[method:CubicInterpolant InterpolantFactoryMethodSmooth]( [link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array result] )
Create a new [page:CubicInterpolant CubicInterpolant] from the
[page:KeyframeTrack.times times] and [page:KeyframeTrack.times values]. A
Float32Array can be passed which will receive the results. Otherwise a new
array with the appropriate size will be created automatically.
[method:this optimize]()
Removes equivalent sequential keys, which are common in morph target
sequences.
[method:this scale]()
Scales all keyframe times by a factor.
Note: This is useful, for example, for conversions to a certain rate of
frames per seconds (as it is done internally by
[page:AnimationClip.CreateFromMorphTargetSequence animationClip.CreateFromMorphTargetSequence]).
[method:this setInterpolation]( [param:Constant interpolationType] )
Sets the interpolation type. See [page:Animation Animation Constants] for
choices.
[method:this shift]( [param:Number timeOffsetInSeconds] )
Moves all keyframes either forward or backward in time.
[method:this trim]( [param:Number startTimeInSeconds], [param:Number endTimeInSeconds] )
Removes keyframes before `startTime` and after `endTime`, without changing
any values within the range [`startTime`, `endTime`].
[method:Boolean validate]()
Performs minimal validation on the tracks. Returns true if valid.
This method logs errors to the console, if a track is empty, if the
[page:.valueSize value size] is not valid, if an item in the [page:.times times] or [page:.values values] array is not a valid number or if the
items in the `times` array are out of order.
Static Methods
[method:JSON toJSON]( [param:KeyframeTrack track] )
Converts the track to JSON.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Loader] →
[name]
A low level class for loading resources with Fetch, used internally by
most loaders. It can also be used directly to load any file type that does
not have a loader.
Code Example
const loader = new THREE.FileLoader();
//load a text file and output the result to the console
loader.load(
// resource URL
'example.txt',
// onLoad callback
function ( data ) {
// output the text to the console
console.log( data )
},
// onProgress callback
function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
// onError callback
function ( err ) {
console.error( 'An error happened' );
}
);
*Note:* The cache must be enabled using
THREE.Cache.enabled = true;
This is a global property and only needs to be set once to be used by all
loaders that use FileLoader internally. [page:Cache Cache] is a cache
module that holds the response from each request made through this loader,
so each file is requested once.
Constructor
[name] ( [param:LoadingManager manager] )
[page:LoadingManager manager] — The [page:LoadingManager loadingManager]
for the loader to use. Default is [page:DefaultLoadingManager].
Properties
See the base [page:Loader] class for common properties.
[property:String mimeType]
The expected
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types mimeType].
See [page:.setMimeType]. Default is `undefined`.
[property:String responseType]
The expected response type. See [page:.setResponseType]. Default is
`undefined`.
Methods
See the base [page:Loader] class for common methods.
[method:undefined load]( [param:String url], [param:Function onLoad], [param:Function onProgress], [param:Function onError] )
[page:String url] — the path or URL to the file. This can also be a
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URI].
[page:Function onLoad] (optional) — Will be called when loading completes.
The argument will be the loaded response.
[page:Function onProgress] (optional) — Will be called while load
progresses. The argument will be the ProgressEvent instance, which
contains .[page:Boolean lengthComputable], .[page:Integer total] and
.[page:Integer loaded]. If the server does not set the Content-Length
header; .[page:Integer total] will be 0.
[page:Function onError] (optional) — Will be called if an error occurs.
Load the URL and pass the response to the onLoad function.
[method:this setMimeType]( [param:String mimeType] )
Set the expected
[link:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types mimeType]
of the file being loaded. Note that in many cases this will be
determined automatically, so by default it is `undefined`.
[method:this setResponseType]( [param:String responseType] )
Change the response type. Valid values are:
[page:String text] or empty string (default) - returns the data as
[page:String String].
[page:String arraybuffer] - loads the data into a
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer] and returns that.
[page:String blob] - returns the data as a
[link:https://developer.mozilla.org/en/docs/Web/API/Blob Blob].
[page:String document] - parses the file using the
[link:https://developer.mozilla.org/en-US/docs/Web/API/DOMParser DOMParser].
[page:String json] - parses the file using
[link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse JSON.parse].
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[name]
The WebGL renderer displays your beautifully crafted scenes using
[link:https://en.wikipedia.org/wiki/WebGL WebGL].
Constructor
[name]( [param:Object parameters] )
[page:Object parameters] - (optional) object with properties defining the
renderer's behaviour. The constructor also accepts no parameters at all.
In all cases, it will assume sane defaults when parameters are missing.
The following are valid parameters:
[page:DOMElement canvas] - A
[link:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas canvas]
where the renderer draws its output. This corresponds to the
[page:WebGLRenderer.domElement domElement] property below. If not passed
in here, a new canvas element will be created.
[page:WebGLRenderingContext context] - This can be used to attach the
renderer to an existing
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext RenderingContext]. Default is null.
[page:String precision] - Shader precision. Can be `"highp"`, `"mediump"`
or `"lowp"`. Defaults to `"highp"` if supported by the device.
[page:Boolean alpha] - controls the default clear alpha value. When set to
`true`, the value is `0`. Otherwise it's `1`. Default is `false`.
[page:Boolean premultipliedAlpha] - whether the renderer will assume that
colors have
[link:https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#Premultiplied_alpha premultiplied alpha].
Default is `true`.
[page:Boolean antialias] - whether to perform antialiasing. Default is
`false`.
[page:Boolean stencil] - whether the drawing buffer has a
[link:https://en.wikipedia.org/wiki/Stencil_buffer stencil buffer] of at
least 8 bits. Default is `false`.
[page:Boolean preserveDrawingBuffer] - whether to preserve the buffers
until manually cleared or overwritten. Default is `false`.
[page:String powerPreference] - Provides a hint to the user agent
indicating what configuration of GPU is suitable for this WebGL context.
Can be `"high-performance"`, `"low-power"` or `"default"`. Default is
`"default"`. See
[link:https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2 WebGL spec] for details.
[page:Boolean failIfMajorPerformanceCaveat] - whether the renderer
creation will fail upon low performance is detected. Default is `false`.
See [link:https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2 WebGL spec] for details.
[page:Boolean depth] - whether the drawing buffer has a
[link:https://en.wikipedia.org/wiki/Z-buffering depth buffer] of at least
16 bits. Default is `true`.
[page:Boolean logarithmicDepthBuffer] - whether to use a logarithmic depth
buffer. It may be necessary to use this if dealing with huge differences
in scale in a single scene. Note that this setting uses gl_FragDepth if
available which disables the
[link:https://www.khronos.org/opengl/wiki/Early_Fragment_Test Early Fragment Test]
optimization and can cause a decrease in performance.
Default is `false`. See the [example:webgl_camera_logarithmicdepthbuffer camera / logarithmicdepthbuffer] example.
Properties
[property:Boolean autoClear]
Defines whether the renderer should automatically clear its output before
rendering a frame. Default is `true`.
[property:Boolean autoClearColor]
If [page:.autoClear autoClear] is true, defines whether the renderer
should clear the color buffer. Default is `true`.
[property:Boolean autoClearDepth]
If [page:.autoClear autoClear] is true, defines whether the renderer
should clear the depth buffer. Default is `true`.
[property:Boolean autoClearStencil]
If [page:.autoClear autoClear] is true, defines whether the renderer
should clear the stencil buffer. Default is `true`.
[property:Object capabilities]
An object containing details about the capabilities of the current
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext RenderingContext].
- [page:Boolean floatFragmentTextures]: whether the context supports the
[link:https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float OES_texture_float] extension.
- [page:Boolean floatVertexTextures]: `true` if [page:Boolean floatFragmentTextures]
and [page:Boolean vertexTextures] are both true.
- [page:Method getMaxAnisotropy](): Returns the maximum available
anisotropy.
- [page:Method getMaxPrecision](): Returns the maximum available precision
for vertex and fragment shaders.
- [page:Boolean isWebGL2]: `true` if the context in use is a
WebGL2RenderingContext object.
- [page:Boolean logarithmicDepthBuffer]: `true` if the [page:parameter logarithmicDepthBuffer]
was set to true in the constructor and the context
supports the
[link:https://developer.mozilla.org/en-US/docs/Web/API/EXT_frag_depth EXT_frag_depth] extension.
- [page:Integer maxAttributes]: The value of `gl.MAX_VERTEX_ATTRIBS`.
- [page:Integer maxCubemapSize]: The value of
`gl.MAX_CUBE_MAP_TEXTURE_SIZE`. Maximum height * width of cube map
textures that a shader can use.
- [page:Integer maxFragmentUniforms]: The value of
`gl.MAX_FRAGMENT_UNIFORM_VECTORS`. The number of uniforms that can be used
by a fragment shader.
- [page:Integer maxSamples]: The value of `gl.MAX_SAMPLES`. Maximum number
of samples in context of Multisample anti-aliasing (MSAA).
- [page:Integer maxTextureSize]: The value of `gl.MAX_TEXTURE_SIZE`.
Maximum height * width of a texture that a shader use.
- [page:Integer maxTextures]: The value of `gl.MAX_TEXTURE_IMAGE_UNITS`.
The maximum number of textures that can be used by a shader.
- [page:Integer maxVaryings]: The value of `gl.MAX_VARYING_VECTORS`. The
number of varying vectors that can used by shaders.
- [page:Integer maxVertexTextures]: The value of
`gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS`. The number of textures that can be
used in a vertex shader.
- [page:Integer maxVertexUniforms]: The value of
`gl.MAX_VERTEX_UNIFORM_VECTORS`. The maximum number of uniforms that can
be used in a vertex shader.
- [page:String precision]: The shader precision currently being used by
the renderer.
- [page:Boolean vertexTextures]: `true` if [property:Integer maxVertexTextures]
is greater than 0 (i.e. vertex textures can be used).
[property:Array clippingPlanes]
User-defined clipping planes specified as THREE.Plane objects in world
space. These planes apply globally. Points in space whose dot product with
the plane is negative are cut away. Default is [].
[property:Object debug]
- [page:Boolean checkShaderErrors]: If it is true, defines whether
material shader programs are checked for errors during compilation and
linkage process. It may be useful to disable this check in production for
performance gain. It is strongly recommended to keep these checks enabled
during development. If the shader does not compile and link - it will not
work and associated material will not render. Default is `true`.
- [page:Function onShaderError]( gl, program, glVertexShader,
glFragmentShader ): A callback function that can be used for custom error
reporting. The callback receives the WebGL context, an instance of
WebGLProgram as well two instances of WebGLShader representing the vertex
and fragment shader. Assigning a custom function disables the default
error reporting. Default is `null`.
[property:DOMElement domElement]
A [link:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas canvas]
where the renderer draws its output.
This is automatically created by the renderer in the constructor (if not
provided already); you just need to add it to your page like so:
document.body.appendChild( renderer.domElement );
[property:Object extensions]
- [page:Object get]( [param:String extensionName] ): Used to check whether
various extensions are supported and returns an object with details of the
extension if available. This method can check for the following
extensions:
`WEBGL_depth_texture`
`EXT_texture_filter_anisotropic`
`WEBGL_compressed_texture_s3tc`
`WEBGL_compressed_texture_pvrtc`
`WEBGL_compressed_texture_etc1`
[property:string outputColorSpace]
Defines the output color space of the renderer. Default is [page:Textures THREE.SRGBColorSpace].
If a render target has been set using [page:WebGLRenderer.setRenderTarget .setRenderTarget]
then renderTarget.texture.colorSpace will be used instead.
See the [page:Textures texture constants] page for details of other
formats.
[property:Object info]
An object with a series of statistical information about the graphics
board memory and the rendering process. Useful for debugging or just for
the sake of curiosity. The object contains the following fields:
memory:
geometries
textures
render:
calls
triangles
points
lines
frame
programs
By default these data are reset at each render call but when having
multiple render passes per frame (e.g. when using post processing) it can
be preferred to reset with a custom pattern. First, set `autoReset` to
`false`.
renderer.info.autoReset = false;
Call `reset()` whenever you have finished to render a single frame.
renderer.info.reset();
[property:Boolean localClippingEnabled]
Defines whether the renderer respects object-level clipping planes.
Default is `false`.
[property:Object properties]
Used internally by the renderer to keep track of various sub object
properties.
[property:WebGLRenderLists renderLists]
Used internally to handle ordering of scene object rendering.
[property:WebGLShadowMap shadowMap]
This contains the reference to the shadow map, if used.
- [page:Boolean enabled]: If set, use shadow maps in the scene. Default is
`false`.
- [page:Boolean autoUpdate]: Enables automatic updates to the shadows in
the scene. Default is `true`.
If you do not require dynamic lighting / shadows, you may set this to
`false` when the renderer is instantiated.
- [page:Boolean needsUpdate]: When set to `true`, shadow maps in the scene
will be updated in the next `render` call. Default is `false`.
If you have disabled automatic updates to shadow maps
(`shadowMap.autoUpdate = false`), you will need to set this to `true` and
then make a render call to update the shadows in your scene.
- [page:Integer type]: Defines shadow map type (unfiltered, percentage
close filtering, percentage close filtering with bilinear filtering in
shader). Options are:
THREE.BasicShadowMap
THREE.PCFShadowMap (default)
THREE.PCFSoftShadowMap
THREE.VSMShadowMap
See [page:Renderer Renderer constants] for details.
[property:Boolean sortObjects]
Defines whether the renderer should sort objects. Default is `true`.
Note: Sorting is used to attempt to properly render objects that have some
degree of transparency. By definition, sorting objects may not work in all
cases. Depending on the needs of application, it may be necessary to turn
off sorting and use other methods to deal with transparency rendering e.g.
manually determining each object's rendering order.
[property:Object state]
Contains functions for setting various properties of the
[page:WebGLRenderer.context] state.
[property:Constant toneMapping]
Default is [page:Renderer NoToneMapping]. See the [page:Renderer Renderer constants] for other choices.
[property:Number toneMappingExposure]
Exposure level of tone mapping. Default is `1`.
[property:WebXRManager xr]
Provides access to the WebXR related [page:WebXRManager interface] of the
renderer.
Methods
[method:undefined clear]( [param:Boolean color], [param:Boolean depth], [param:Boolean stencil] )
Tells the renderer to clear its color, depth or stencil drawing buffer(s).
This method initializes the color buffer to the current clear color
value.
Arguments default to `true`.
[method:undefined clearColor]( )
Clear the color buffer. Equivalent to calling [page:WebGLRenderer.clear .clear]( true, false, false ).
[method:undefined clearDepth]( )
Clear the depth buffer. Equivalent to calling [page:WebGLRenderer.clear .clear]( false, true, false ).
[method:undefined clearStencil]( )
Clear the stencil buffers. Equivalent to calling [page:WebGLRenderer.clear .clear]( false, false, true ).
[method:Set compile]( [param:Object3D scene], [param:Camera camera], [param:Scene targetScene] )
Compiles all materials in the scene with the camera. This is useful to precompile shaders before the first rendering.
If you want to add a 3D object to an existing scene, use the third optional parameter for applying the target scene.
Note that the (target) scene's lighting and environment should be configured before calling this method.
[method:Promise compileAsync]( [param:Object3D scene], [param:Camera camera], [param:Scene targetScene] )
Asynchronous version of [page:WebGLRenderer.compile .compile](). The method returns a Promise that resolves when the
given scene can be rendered without unnecessary stalling due to shader compilation.
This method makes use of the *KHR_parallel_shader_compile* WebGL extension.
[method:undefined copyFramebufferToTexture]( [param:Vector2 position], [param:FramebufferTexture texture], [param:Number level] )
Copies pixels from the current WebGLFramebuffer into a 2D texture. Enables
access to
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/copyTexImage2D WebGLRenderingContext.copyTexImage2D].
[method:undefined copyTextureToTexture]( [param:Vector2 position], [param:Texture srcTexture], [param:Texture dstTexture], [param:Number level] )
Copies all pixels of a texture to an existing texture starting from the
given position. Enables access to
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texSubImage2D WebGLRenderingContext.texSubImage2D].
[method:undefined copyTextureToTexture3D]( [param:Box3 sourceBox], [param:Vector3 position], [param:Texture srcTexture], [param:Texture dstTexture], [param:Number level] )
Copies the pixels of a texture in the bounds '[page:Box3 sourceBox]' in
the destination texture starting from the given position. Enables access
to
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/texSubImage3D WebGL2RenderingContext.texSubImage3D].
[method:undefined dispose]( )
Frees the GPU-related resources allocated by this instance. Call this
method whenever this instance is no longer used in your app.
[method:undefined forceContextLoss]()
Simulate loss of the WebGL context. This requires support for the
[link:https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context WEBGL_lose_context] extensions.
[method:undefined forceContextRestore]( )
Simulate restore of the WebGL context. This requires support for the
[link:https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context WEBGL_lose_context] extensions.
[method:Float getClearAlpha]()
Returns a [page:Float float] with the current clear alpha. Ranges from `0`
to `1`.
[method:Color getClearColor]( [param:Color target] )
Returns a [page:Color THREE.Color] instance with the current clear color.
[method:WebGL2RenderingContext getContext]()
Return the current WebGL context.
[method:WebGLContextAttributes getContextAttributes]()
Returns an object that describes the attributes set on the WebGL context
when it was created.
[method:Integer getActiveCubeFace]()
Returns the current active cube face.
[method:Integer getActiveMipmapLevel]()
Returns the current active mipmap level.
[method:RenderTarget getRenderTarget]()
Returns the current [page:RenderTarget RenderTarget] if there are; returns
`null` otherwise.
[method:Vector4 getCurrentViewport]( [param:Vector4 target] )
[page:Vector4 target] — the result will be copied into this Vector4.
Returns the current viewport.
[method:Vector2 getDrawingBufferSize]( [param:Vector2 target] )
[page:Vector2 target] — the result will be copied into this Vector2.
Returns the width and height of the renderer's drawing buffer, in pixels.
[method:number getPixelRatio]()
Returns current device pixel ratio used.
[method:Vector4 getScissor]( [param:Vector4 target] )
[page:Vector4 target] — the result will be copied into this Vector4.
Returns the scissor region.
[method:Boolean getScissorTest]()
Returns `true` if scissor test is enabled; returns `false` otherwise.
[method:Vector2 getSize]( [param:Vector2 target] )
[page:Vector2 target] — the result will be copied into this Vector2.
Returns the width and height of the renderer's output canvas, in pixels.
[method:Vector4 getViewport]( [param:Vector4 target] )
[page:Vector4 target] — the result will be copied into this Vector4.
Returns the viewport.
[method:undefined initTexture]( [param:Texture texture] )
Initializes the given texture. Useful for preloading a texture rather than
waiting until first render (which can cause noticeable lags due to decode
and GPU upload overhead).
[method:undefined resetGLState]( )
Reset the GL state to default. Called internally if the WebGL context is
lost.
[method:undefined readRenderTargetPixels]( [param:WebGLRenderTarget renderTarget], [param:Float x], [param:Float y], [param:Float width], [param:Float height], [param:TypedArray buffer], [param:Integer activeCubeFaceIndex] )
buffer - Uint8Array is the only destination type supported in all cases,
other types are renderTarget and platform dependent. See
[link:https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.12 WebGL spec] for details.
Reads the pixel data from the renderTarget into the buffer you pass in.
This is a wrapper around
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels WebGLRenderingContext.readPixels]().
See the [example:webgl_interactive_cubes_gpu interactive / cubes / gpu]
example.
For reading out a [page:WebGLCubeRenderTarget WebGLCubeRenderTarget] use
the optional parameter activeCubeFaceIndex to determine which face should
be read.
[method:undefined render]( [param:Object3D scene], [param:Camera camera] )
Render a [page:Scene scene] or another type of [page:Object3D object]
using a [page:Camera camera].
The render is done to a previously specified [page:WebGLRenderTarget renderTarget]
set by calling [page:WebGLRenderer.setRenderTarget .setRenderTarget] or to the canvas as usual.
By default render buffers are cleared before rendering but you can prevent
this by setting the property [page:WebGLRenderer.autoClear autoClear] to
false. If you want to prevent only certain buffers being cleared you can
set either the [page:WebGLRenderer.autoClearColor autoClearColor],
[page:WebGLRenderer.autoClearStencil autoClearStencil] or
[page:WebGLRenderer.autoClearDepth autoClearDepth] properties to false. To
forcibly clear one or more buffers call [page:WebGLRenderer.clear .clear].
[method:undefined resetState]()
Can be used to reset the internal WebGL state. This method is mostly
relevant for applications which share a single WebGL context across
multiple WebGL libraries.
[method:undefined setAnimationLoop]( [param:Function callback] )
[page:Function callback] — The function will be called every available
frame. If `null` is passed it will stop any already ongoing animation.
A built in function that can be used instead of
[link:https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame requestAnimationFrame].
For WebXR projects this function must be used.
[method:undefined setClearAlpha]( [param:Float alpha] )
Sets the clear alpha. Valid input is a float between `0.0` and `1.0`.
[method:undefined setClearColor]( [param:Color color], [param:Float alpha] )
Sets the clear color and opacity.
[method:undefined setPixelRatio]( [param:number value] )
Sets device pixel ratio. This is usually used for HiDPI device to prevent
blurring output canvas.
[method:undefined setRenderTarget]( [param:WebGLRenderTarget renderTarget],
[param:Integer activeCubeFace], [param:Integer activeMipmapLevel] )
renderTarget -- The [page:WebGLRenderTarget renderTarget] that needs to be
activated. When `null` is given, the canvas is set as the active render
target instead.
activeCubeFace -- Specifies the active cube side (PX 0, NX 1, PY 2, NY 3,
PZ 4, NZ 5) of [page:WebGLCubeRenderTarget]. When passing a
[page:WebGLArrayRenderTarget] or [page:WebGL3DRenderTarget] this indicates
the z layer to render in to (optional).
activeMipmapLevel -- Specifies the active mipmap level (optional).
This method sets the active rendertarget.
[method:undefined setScissor]( [param:Integer x], [param:Integer y], [param:Integer width], [param:Integer height] )
[method:undefined setScissor]( [param:Vector4 vector] )
The x, y, width, and height parameters of the scissor region.
Optionally, a 4-component vector specifying the parameters of the
region.
Sets the scissor region from (x, y) to (x + width, y + height).
(x, y) is the lower-left corner of the scissor region.
[method:undefined setScissorTest]( [param:Boolean boolean] )
Enable or disable the scissor test. When this is enabled, only the pixels
within the defined scissor area will be affected by further renderer
actions.
[method:undefined setOpaqueSort]( [param:Function method] )
Sets the custom opaque sort function for the WebGLRenderLists. Pass null
to use the default painterSortStable function.
[method:undefined setTransparentSort]( [param:Function method] )
Sets the custom transparent sort function for the WebGLRenderLists. Pass
null to use the default reversePainterSortStable function.
[method:undefined setSize]( [param:Integer width], [param:Integer height], [param:Boolean updateStyle] )
Resizes the output canvas to (width, height) with device pixel ratio taken
into account, and also sets the viewport to fit that size, starting in (0,
0). Setting [page:Boolean updateStyle] to false prevents any style changes
to the output canvas.
[method:undefined setViewport]( [param:Integer x], [param:Integer y], [param:Integer width], [param:Integer height] )
[method:undefined setViewport]( [param:Vector4 vector] )
The x, y, width, and height parameters of the viewport.
Optionally, a 4-component vector specifying the parameters of a
viewport.
Sets the viewport to render from (x, y) to (x + width, y + height).
(x, y) is the lower-left corner of the region.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

[page:Object3D] →
[name]
A class for displaying points. The points are rendered by the
[page:WebGLRenderer] using
[link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements gl.POINTS].
Constructor
[name]( [param:BufferGeometry geometry], [param:Material material] )
[page:BufferGeometry geometry] — (optional) an instance of
[page:BufferGeometry]. Default is a new [page:BufferGeometry].
[page:Material material] — (optional) a [page:Material]. Default is a new
[page:PointsMaterial].
Properties
See the base [page:Object3D] class for common properties.
[property:BufferGeometry geometry]
An instance of [page:BufferGeometry] (or derived classes), defining the
object's structure.
[property:Boolean isPoints]
Read-only flag to check if a given object is of type [name].
[property:Material material]
An instance of [page:Material], defining the object's appearance. Default
is a [page:PointsMaterial].
[property:Array morphTargetInfluences]
An array of weights typically from 0-1 that specify how much of the morph
is applied. Undefined by default, but reset to a blank array by
[page:Points.updateMorphTargets updateMorphTargets].
[property:Object morphTargetDictionary]
A dictionary of morphTargets based on the morphTarget.name property.
Undefined by default, but rebuilt [page:Points.updateMorphTargets updateMorphTargets].
Methods
See the base [page:Object3D] class for common methods.
[method:undefined raycast]( [param:Raycaster raycaster], [param:Array intersects] )
Get intersections between a casted ray and this Points.
[page:Raycaster.intersectObject] will call this method.
[method:Points clone]()
Returns a clone of this Points object and its descendants.
[method:undefined updateMorphTargets]()
Updates the morphTargets to have no influence on the object. Resets the
[page:Points.morphTargetInfluences morphTargetInfluences] and
[page:Points.morphTargetDictionary morphTargetDictionary] properties.
Source
[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]

