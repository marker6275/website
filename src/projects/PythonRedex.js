import React from "react";
import { T, C, D, NL, BL, ST, ST2, P, Line } from "../components/text";
// Images now served from public directory

export function PRM() {
  const githubURL = "https://github.com/marker6275/Python-Redex-Model";
  const paperURL =
    "https://cs.brown.edu/people/sk/Publications/Papers/Published/pmmwplck-python-full-monty/paper.pdf";
  const implementationURL =
    "https://cs.brown.edu/research/plt/dl/lambda-py/ae/";

  return (
    <div className="py-5">
      <D>NOV 2023</D>
      <T>Python Redex Model</T>
      <Line />

      <ST>Intro</ST>
      <P>
        The goal behind this project was to implement the mathematical model
        behind a programming language - our language being Python. We thought
        this would be very easy since Python was such a popular language and we
        were pretty familiar with it. But there are are just so many intricacies
        about the Python language.
      </P>
      <br />
      <P>
        If you don't want to look at our Walmart remake of something beautiful,
        allow me to redirect you directly to the original{" "}
        <a href={paperURL} className="text-blue-500 underline">
          paper
        </a>{" "}
        and{" "}
        <a
          href={implementationURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          model
        </a>{" "}
        which is much much much better and complete than what we created. Since
        this page is pretty long, this is your chance to leave.
      </P>
      <br />
      <P>
        Now that you've had your chance to leave, allow me to highlight some
        parts in our model.
        <br />
        All of the code is in this{" "}
        <a
          href={githubURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Github
        </a>
      </P>

      <ST>What we did</ST>
      <P>
        Our main takeaways from the paper were regarding scope in Python, which
        is used in a way that's unique to Python and doesn't quite work the same
        in pretty much every other programming langauge. We also targeted the
        pass-by-reference data representation of data - a concept related to
        Python's weird scoping rules. We also implemented a two-register system
        - which returns the current expression and a store.
      </P>

      <ST>Model</ST>
      <P>
        This model was made using Racket (a super popular language) and using
        Redex, a package that is commonly used to implement models of
        programming languages.
      </P>
      <br />
      <P>If we start at the top,</P>
      <br />
      <div>
        <div className="grid grid-cols-2">
          <img
            src="/assets/project_images/PythonRedexModel/define_language.png"
            alt="define language function"
            className="h-[700px]"
          />
          <img
            src="/assets/project_images/PythonRedexModel/lambdapiexpressions.png"
            alt="lambda pi expressions"
            className="h-[700px] "
          />
        </div>
        <C>Reference 1</C>
      </div>
      <br />
      <P>
        The <i>define-language</i> section is our creation of this model. Here
        we're defining every possible thing that can be created, such as
        variables, expressions, types, primitive functions. Using these, we want
        to define the behavior of Python using this language base when we see
        certain keywords (see{" "}
        <a href={githubURL} className="text-blue-500 underline">
          Github
        </a>{" "}
        for examples).
      </P>
      <br />
      <P>So this is what's going on:</P>
      <BL>
        <li>
          <b>Line 6</b> refers to a <i>store</i>, a concept in programming
          languages that means the storage place for everythings. We can see
          here that our store is a list, which elements that are created as a
          pair consisting of a <i>ref</i> (reference value) and a <i>v+undef</i>{" "}
          (regular value).
        </li>
        <li>
          <b>Line 12</b> defines a value, which we see here can be a variety of
          expressions, but the two most notable ones include the two{" "}
          <i>(triple ...)</i> values. These say the same thing, except the
          former is describing a pure, predefined value, while the latter uses
          undefined variables. This essentially describes that a value in Python
          is stored as a combination of the variable name, an assigned metavalue
          (more on this later), and a dictionary.
        </li>
        <li>
          Our metavalues (which are values that exist in our meta-language,
          which is Racket in this case) are defined on <b>line 24</b>. One of
          the fewtimes that we really needed these <i>mvals</i> are when we use
          them inside of the <i>(triple ...)</i> and we use them to define
          values.
        </li>
        <li>
          <b>Line 32-51</b> are all our expression values and is just a
          comprehensive list of all the possible types of data that may be
          implemented in Python. These types are most of the ones we'll be
          referencing throughout most of the model since expressions make up
          most of the Python language. We don't actually implement or use most
          of these expressions but they were included in our language for
          completeness.
        </li>
        <li>
          <b>Lines 57</b>, <b>58</b>, and <b>59</b> are just helper components
          we created to create and access various elements of our program since
          our stores are basically association list dictionaries, we needed a
          way to store different values, so these types are used so that our
          functions which call on these dictionaries only need to return one
          type of value.
        </li>
      </BL>
      <br />
      <P>
        There's some more various parts that aren't really too relevant because
        we either don't implement them or they're not very important, but this
        is our model language called λπ!
      </P>
      <ST>The boring stuff</ST>
      <P>
        There's a lot of stuff covered in the paper that we look over and didn't
        really cover in depth since they were pretty basic. They're all
        implemented in the{" "}
        <a href={githubURL} className="text-blue-500 underline">
          model
        </a>{" "}
        if you want to check it out but otherwise I'm only going to give a quick
        summary.
      </P>
      <br />
      <P>
        <i>Figures 2</i>, <i>3</i>, <i>5</i>, and <i>6</i> define creating and
        accessing identifiers and objects in Python. The paper defines the
        mathematics and logic behind these operations pretty clearly so we
        implemented them as is, for the most part. <i>Figure 4</i> defines the
        primitive operations on a list, but since our focus for this project
        wasn't on lists, we decided not to implement this.
      </P>
      <br />
      <P>Here's a quick summary of these figures:</P>
      <BL>
        <li>
          <b>Figure 2:</b> Creating identifiers with values bound to them and
          then getting the values bound to these identifiers. Basically, letting
          us define variables then using these variables.
        </li>
        <li>
          <b>Figure 3:</b> The rules for creating objects. The 3 types of
          objects described here are objects in general, tuples, and sets. The
          objects are added into the store as <i>triple</i> values that are
          initialized with the value, the metavalue assigned to the object, and
          an empty (for now) dictionary. This is because a Python <i>object</i>{" "}
          value can be represented at it's basics as a Python <i>type</i>. This
          is the example of this from the paper:
          <div className="flex-col">
            <div className="flex justify-center ">
              <img
                src="/assets/project_images/PythonRedexModel/object.png"
                alt="object example"
                className="w-96"
              />
            </div>
            <C>Reference 2</C>
          </div>
          <P>
            So the <i>type</i> implementation we see here defines the object
            using the same three categories as defined in our <i>triple</i>{" "}
            values from <b>Reference 1</b>. The first field of the type is the
            name of the class (in this case <i>X</i>), the second field is the
            metavalue (where <i>X</i> is an instance of an <i>object</i>), and
            finally in the third field is the list of methods that this object
            holds, so we initialize our object using an empty dictionary since
            we aren't given what methods the object has.
          </P>
        </li>
        <li>
          <b>Figure 5:</b> The rules for accessing objects. The three functions
          defined here are <i>fetch</i>, <i>set!</i>, and <i>alloc</i>. These
          are just basic functions for accessing previously created objects.
          <NL>
            <li>
              <b className="italic">fetch</b> passes in a reference value and
              gets the object located in the store at that reference.
            </li>
            <li>
              <b className="italic">set!</b> updates the value of the object at
              a passed in <i>ref</i> into a new value.
            </li>
            <li>
              <b className="italic">alloc</b> creates a new store with the new
              value added into it at the next value. Sort of like how{" "}
              <i>malloc</i> works in C and C++ but doesn't necessarily allocate
              the space but simply adds the value to it.
            </li>
          </NL>
        </li>
        <li>
          <b>Figure 6:</b> Allows access to fields within the objects. Since
          we'd want to populate the (probably) empty dictionaries in objects,{" "}
          <i>Figure 6</i> allows us to edit, add, and get the fields within an
          object.
        </li>
      </BL>
      <ST>Figure 7</ST>
      <P>
        Now this is what most of our focus was on. <i>Figure 7</i> was
        undoubtedly the most interesting and complicated part of this paper.
        Although it's just one function - and a pretty basic one at that - it
        took a lot of understanding to determine what it's doing.{" "}
        <i>Figure 7</i> defines the algorithm for field lookups on classes
      </P>
      <br />
      <div>
        <div className="grid grid-cols-2">
          <img
            src="/assets/project_images/PythonRedexModel/figure7.png"
            alt="figure 7 redex"
            className="h-[230px]"
          />
          <img
            src="/assets/project_images/PythonRedexModel/figure7paper.png"
            alt="lambda pi expressions"
            className="h-[230px] "
          />
        </div>
        <C>Reference 3</C>
      </div>
      <br />
      <P>
        As you see here, our code pretty much matches exactly the description of
        the <i>GetField-Class</i> method in the paper. There's a lot of helper
        functions that we created, but they also match the mathematics closely.
      </P>
      <br />
      <P>
        When the model looks for a method within an object, it will either find
        it or it doesn't. If the expression exists, it will simply get you that
        method. But otherwise, it will use the "<i>__mro__</i>" (method
        resolution order) field to determine where to find the field. This field
        isn't ever defined by the programmer and is done automatically. The "
        <i>__mro__</i>" field is set to be the inheretence graph of the current
        object - all the parent objects for this current object (e.g.{" "}
        <i>monkey</i> -&gt; <i>mammal</i> -&gt; <i>animal</i>, so the{" "}
        <i>monkey's</i> "<i>__mro__</i>" field will be set to include the class
        and methods of the <i>mammal</i> class and <i>animal</i> class).
      </P>
      <br />
      <P>
        As seen in <b>Reference 3</b>, the <i>GetField-Class</i> also has helper
        functions <i>class-lookup</i>, <i>class-lookup-mro</i>, and{" "}
        <i>fetch-pointer</i>.
      </P>
      <br />
      <P>
        In order of most to least self-explanitory, these are what the helper
        functions do:
      </P>
      <BL>
        <li>
          <b className="italic">fetch-pointer</b>: Just gets the value at a
          given <i>ref</i>.
        </li>
        <li>
          <b className="italic">class-lookup</b>: Uses <i>class-lookup-mro</i>{" "}
          to get each parent class for the object.
        </li>
        <li>
          <b className="italic">class-lookup-mro</b>: Gets the parent methods
          for the object using the dictionary of the object. If an object exists
          such that the <i>string</i> we're looking for is in the dictionary for
          the object at the passed in <i>ref</i>, then we'll return to pointer
          value that the <i>string</i> points to - otherwise, we'll recursively
          call <i>class-lookup-mro</i> on the rest of the dictionary.
        </li>
      </BL>
      <ST>Undefined values</ST>
      <P>
        As a quick side note, probably the most comedic thing about this paper
        was their description of <i>undefined</i> values. THe actual concept
        itself was pretty bland but the paper continuously referenced this
        nonexistent value as <i>skull</i> (no literally: ☠ was written
        everywhere - page 2 of the{" "}
        <a href={paperURL} className="text-blue-500 underline">
          pdf
        </a>
        ). It's really humorous to consider that <i>undefined</i> values are
        literally symbolized by death (thinking about how much my programs error
        due to uninitialized variables). That's about it. There's not really
        much to say about it - I just wanted to highlight this aspect of the
        paper (great writing).
      </P>
      <ST>Other considerations</ST>
      <NL>
        <li>
          In our implementation of <i>SetFieldUpdate</i> and <i>SetFieldAdd</i>,
          we implement one restriction for our store by forcing the programmer
          to input the parameters in a certain order. This was because these two
          methods have to account for the scenario where object <i>A</i> could
          exist before object <i>B</i> <b>OR</b> <i>B</i> could exist before{" "}
          <i>A</i>. To account for this, we decided to specify the order that
          our objects exist in the store so we would need to write two nearly
          identical functions to account for both possibilities.
        </li>
        <li>
          The paper doesn't specify regarding recursion in Python. We attempted
          to create tests and examples that implemented recursion but the model
          simply wouldn't allow it. Most attempts ended up in an error, but the
          few that didn't simply ran the program once through.
        </li>
        <li>
          Similarly, the paper didn't specify how to link multiple functions
          together (i.e. one function calls another). So like our attempt at
          recursion, pretty much all attempts ended in error since the model
          couldn't handle these complex operations and would only be able to run
          the first instance of the function.
        </li>
        <li>
          Our model also wasn't able to link together multiple <i>setting</i>{" "}
          and <i>getting</i> operations together. We came to realize this was
          partly due to #3, but also because we didn't implement a way to link
          things together. The paper describes the implementation in depth, but
          everything is done as a one-off don't really link together - which
          wasn't too big of an issue but it would have been cool to potentially
          model a whole program at once rather than single operations.
        </li>
      </NL>
      <ST>Examples</ST>
      <P>
        Here are some examples of the <i>traces</i> (basically <i>Redex</i>{" "}
        breaking down our program to show what's happening) of our model. There
        are some helpful arrows that show the order the program is running. The
        most important thing to pay attention to is the top of each box, or the
        first element of each expression, which shows what function is about to
        run.
      </P>
      <div>
        <Line />
        <ST2>Update field</ST2>
        <img
          src="/assets/project_images/PythonRedexModel/examples/example1.png"
          alt="first example"
        />
        <Line />
        <ST2>Create object then get object</ST2>
        <img
          src="/assets/project_images/PythonRedexModel/examples/example2.png"
          alt="second example"
        />
        <Line />
        <ST2>Create variable then get variable (while store is empty)</ST2>
        <img
          src="/assets/project_images/PythonRedexModel/examples/example3.png"
          alt="third example"
        />
        <Line />
        <ST2>
          Create variable then get variable (while store is{" "}
          <span className="italic">not</span> empty)
        </ST2>
        <img
          src="/assets/project_images/PythonRedexModel/examples/example4.png"
          alt="fourth example"
        />
        <Line />
        <ST2>Get object</ST2>
        <img
          src="/assets/project_images/PythonRedexModel/examples/example5.png"
          alt="fifth example"
        />
      </div>
    </div>
  );
}

export const PythonRedex = {
  name: "Python Redex Model",
  color: "border-yellow-400",
  text: "hover:text-amber-500",
  description: "Mathematical model of Python",
  image: "/assets/project_images/PythonRedexModel/python.png",
  body: <PRM />,
};
