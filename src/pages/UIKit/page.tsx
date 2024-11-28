export default function Page() {
  return (
    <>
      <section className="container" style={{marginTop: 32 }}>
        <h1>Application UI-Kit</h1>
        <hr />

        <p>
          https://fonts.google.com/icons
          Do id eu nostrud cillum veniam in laborum laboris ipsum irure elit eu. Ipsum excepteur pariatur in excepteur ea. 
          Duis nisi cillum pariatur quis incididunt dolor deserunt tempor aliquip id reprehenderit. Enim veniam sunt fugiat id.
          Do id eu nostrud cillum veniam in laborum laboris ipsum irure elit eu. Ipsum excepteur pariatur in excepteur ea. 
          Duis nisi cillum pariatur quis incididunt dolor deserunt tempor aliquip id reprehenderit. Enim veniam sunt fugiat id.
          Do id eu nostrud cillum veniam in laborum laboris ipsum irure elit eu. Ipsum excepteur pariatur in excepteur ea. 
          Duis nisi cillum pariatur quis incididunt dolor deserunt tempor aliquip id reprehenderit. Enim veniam sunt fugiat id.
          Do id eu nostrud cillum veniam in laborum laboris ipsum irure elit eu. Ipsum excepteur pariatur in excepteur ea. 
          Duis nisi cillum pariatur quis incididunt dolor deserunt tempor aliquip id reprehenderit. Enim veniam sunt fugiat id.
        </p>
      </section>

      <section className="container">
        <h2>Typography</h2>
        <hr />

        <p>
          For each Headline you can also have a style class, in case you want a heading without semantic weight,
          you can use the classes <mark>h[1,2,3,4,5,6]</mark>.
        </p>

        <h1>Headline level 1</h1>
        <h2>Headline level 2</h2>
        <h3>Headline level 3</h3>
        <h4>Headline level 4</h4>
        <h5>Headline level 5</h5>
        <h6>Headline level 6</h6>

        <hr/>

        <p className="text-large">✎ PARAGRAPH</p>    
        <p>
          This is a simple paragraph, applied by using the tag <mark>p</mark> or the class <mark>text-p</mark>
        </p>

        <p className="text-large">✎ SEMIBOLD</p>
        <p className="text-semibold">
          This is a semibold paragraph, that can be applied by using the class <mark>text-semibold</mark>
        </p>

        <p className="text-large">✎ SMALL TEXT</p>
        <p className="text-small">
          This is a small text example. You can define a small text with the classs <mark>text-small</mark>. And this is a <span className="text-semibold">semibold small text example</span>
        </p>

        <p className="text-large">✎ LARGE TEXT</p>
        <p className="text-large">
          This is a large text example. You can define a large text with the classs <mark>text-large</mark>. And this is a <span className="text-semibold">semibold large text example</span>
        </p>
        
        <p className="text-large">✎ LINKS</p>
        <p>
          <a href="/">This is a Link example</a>. You can also use the <mark>.text-link</mark> class to use only its style, <span className="text-link">for example.</span>
        </p>

        <p className="text-large">✎ CAPTION</p>
        <p className="text-caption">
          This is a caption text example. A caption is a small text with small line-height. It can be applied using the class <mark>text-caption</mark>
        </p>

        <p className="text-large">✎ CAPTION</p>
        <p className="text-quotation">
          This is a quotation. You can apply this style by using the class <mark>text-quotation</mark>. Note that this is differente from the <mark>blockquote</mark> element.
        </p>

        <p className="text-large">✎ BUTTON TEXT</p>
        <p className="text-button">
          Button Like Text. Applied by the class <mark>text-button</mark>
        </p>

        <p className="text-large">✎ INPUT LABEL</p>
        <label>
          Use tag <mark>label</mark> or the class <mark>text-label</mark>
        </label>

        <p className="text-large">✎ BLOCKQUOTE</p>

        <blockquote>
          This is a blockquote:<br/><br/>
          Anim id fugiat ullamco ullamco excepteur adipisicing nisi incididunt esse sunt ipsum sint ipsum in. 
          Mollit enim excepteur proident deserunt laborum sint aliquip occaecat commodo. Labore nulla reprehenderit.
          eu anim minim adipisicing dolor. Ad aliqua amet enim amet. Duis esse magna sit non cillum labore duis ea.
        </blockquote>
      </section>

      <section className="container">
        <h2>Buttons</h2>
        <hr/>

        <div className="field">
          <button>
            <span>Bare Metal</span>
          </button>
        </div>
    
        <div className="field">
          <button className="button-primary">
            <span>Button Primary</span>
          </button>
        </div>
        
        <div className="field">
          <button className="button-seamless">
            <span>Button Seamless</span>
          </button>
        </div>    

        <div className="field">
          <button className="button-brick">
            <span>B</span>
          </button>
        </div> 

        <div className="field">
          <button className="button-brick button-primary">
            <span>B</span>
          </button>
        </div>

        <div className="field">
          <button className="button-light">
            <span>Button Light</span>
          </button>
        </div>

        <div className="field">
          <button className="button-ghost">
            <span>Button Ghost</span>
          </button>
        </div>


        <div className="field">
          <button className="button-primary" disabled>
            <span>Disabled</span>
          </button>
        </div>
        
        <div className="field">
          <button className="button--small">
            <span>Small</span>
          </button>
        </div>
      </section>

      <section className="container">
        <h2>Form</h2>
        <hr/>

        <form action="/">
          <fieldset>
            <legend className="required">Fieldset</legend>
          </fieldset>
    
          <div className="field">
            <label className="required">Label .required</label>
            <input type="text" placeholder="Input placeholder" name="required" required />
          </div>
          
          <div className="field">
            <label>Text</label>
            <input type="text" placeholder="Input placeholder" name="input-text" />
          </div>
    
          <div className="field">
            <label>Number</label>
            <input type="number" placeholder="Input placeholder" name="input-number" />
          </div>
    
          <div className="field">
            <label>Color</label>
            <input type="color" placeholder="Input placeholder" name="input-color" />
          </div>
    
          <div className="field">
            <label>Date</label>
            <input type="date" placeholder="Input placeholder" name="input-date" />
          </div>
    
          <div className="field">
            <label>Datetime-local</label>
            <input type="datetime-local" placeholder="Input placeholder" name="input-datetime-local" />
          </div>
    
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="Input placeholder" name="input-email" />
          </div>
    
          <div className="field">
            <label>Month</label>
            <input type="month" placeholder="Input placeholder" name="input-month" />
          </div>
    
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Input placeholder" name="input-password" />
          </div>
    
          <div className="field">
            <label>Search</label>
            <input type="search" placeholder="Input placeholder" name="input-search" />
          </div>
          
          <div className="field">
            <label>Tel</label>
            <input type="tel" placeholder="Input placeholder" name="input-tel" />
          </div>
    
          <div className="field">
            <label>Time</label>
            <input type="time" placeholder="Input placeholder" name="input-time" />
          </div>  
    
          <div className="field">
            <label>Url</label>
            <input type="url" placeholder="Input placeholder" name="input-url" />
          </div>
    
          <div className="field">
            <label>Week</label>
            <input type="week" placeholder="Input placeholder" name="input-week" />
          </div>
          
          <div className="field">
            <label>Select</label>
            <select name="select-test" id="a-select">
              <option value="test-a">Test A</option>
              <option value="test-b">Test B</option>
              <option value="test-c">Test C</option>
              <option value="test-d">Test D</option>
              <option value="test-e">Test E</option>
            </select>
          </div>
          
          <div className="field">
            <label>Textarea</label>
            <textarea name="textarea" placeholder="Textarea placeholder"></textarea>
          </div>
        </form>
      </section>

      <section className="container">
        <h2>Input Helpers</h2>
        <hr/>

        <form action="">
          <div className="field" data-input-icon="left">
            <label className="required">Label .required</label>
            <input type="text" placeholder="Input placeholder" name="required" required />
            <label>Assistive text: just place a label after the input</label>
            <span className="input-icon">add</span>
          </div>

          <div className="field">
            <label className="required">Select</label>
            <select name="select-test" id="a-select">
              <option value="test-a">Test A</option>
              <option value="test-b">Test B</option>
              <option value="test-c">Test C</option>
              <option value="test-d">Test D</option>
              <option value="test-e">Test E</option>
            </select>
            <label>Assistive text: just place a label after the input</label>
          </div>

          <div className="field" data-input-icon="right">
            <label className="required">Label .required</label>
            <input type="text" placeholder="Input placeholder" name="required" required />
            <label>Assistive text: just place a label after the input</label>
            <span className="input-icon">add</span>
          </div>
        </form>
      </section>

      <section className="container">
        <h2>Switches</h2>
        <hr/>

        <form action="/">
          <div className="field switch">
            <label>
              <input type="radio" name="input-radio-test" />
              Input Radio A
            </label>
          </div>

          <div className="field switch">
            <label>
              <input type="radio" name="input-radio-test" />
              Input Radio B
            </label>
          </div>
    
          <div className="field switch">
            <label>
              <input type="checkbox" name="input-checkbox-test-a" />
              Input Checkbox A
            </label>
          </div>
          
          <div className="field switch">
            <label>
              <input type="checkbox" name="input-checkbox-test-b" />
              Input Checkbox B
            </label>            
          </div> 
    
          <div className="field switch">
            <label>
              <input type="checkbox" name="input-toggle" data-toggler />
              Input Toggle
            </label>
          </div>
        </form>    
      </section>

      <section className="container">
        <h2>Other Inputs</h2>
        <hr/>

        <form action="/">
          <div className="field" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>      
            <button className="button-secondary">
              Upload File
              <input type="file" name="input-file" />
            </button>

            <input type="button" className="button-primary" name="input-button" value="Input Button" />
            <input type="submit" className="button-primary" name="input-button" value="Submit" />
            <input type="reset" name="input-button" value="Reset" />
          </div>
        </form>    
      </section>

      <section className="container">
        <h2>Table</h2>
        <hr/>

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
          </thead>   
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Austria</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>UK</td>
            </tr>
          </tbody>     
        </table>       
      </section>

      <section className="container">
        <h2>Lists</h2>

        <hr/>
        <p>Unordered</p>
        
        <ul>
          <li>
            Irure elit sit reprehenderit do aliquip tempor ad nostrud enim enim culpa velit proident consequat. 
            Lorem amet do sit magna est amet. Magna magna Lorem cupidatat nulla occaecat. Aute sunt esse elit 
            fugiat velit voluptate. Anim amet duis dolor incididunt. Irure elit sit reprehenderit do aliquip 
            tempor ad nostrud enim enim culpa velit proident consequat. Lorem amet do sit magna est amet. Magna 
            magna Lorem cupidatat nulla occaecat. Aute sunt esse elit fugiat velit voluptate. Anim amet duis 
            dolor incididunt.
          </li>
          
          <li>List Example A</li>
          <li>List Example B</li>
          <li>List Example C</li>
          <li>List Example D</li>
          <li>List Example E</li>
        </ul>
        
        <hr/>
        <p>Ordered</p>

        <ol>
          <li>
            Irure elit sit reprehenderit do aliquip tempor ad nostrud enim enim culpa velit proident consequat. 
            Lorem amet do sit magna est amet. Magna magna Lorem cupidatat nulla occaecat. Aute sunt esse elit 
            fugiat velit voluptate. Anim amet duis dolor incididunt. Irure elit sit reprehenderit do aliquip 
            tempor ad nostrud enim enim culpa velit proident consequat. Lorem amet do sit magna est amet. Magna 
            magna Lorem cupidatat nulla occaecat. Aute sunt esse elit fugiat velit voluptate. Anim amet duis 
            dolor incididunt.
          </li>
          
          <li>List Example B</li>
          <li>List Example C</li>
          <li>List Example D</li>
          <li>List Example E</li>
        </ol> 
        
        <hr/>
        <p>Definition List</p>

        <dl>
          <dt>Male writers:</dt>
            <dd>Ernest Hemingway</dd>
            <dd>Carlos Drummond</dd>
          <dt>Female writers:</dt>
            <dd>Virgínia Woolf</dd>
            <dd>Hilda Hilst</dd>
        </dl>  
      </section>

      <section className="container">
        <h2>Pre/Code</h2>

        <hr />

        <code>inline code element</code>

        <pre>
          {`pre text with some
spaces and identation`}
        </pre>

        <pre>
          <code>
{`import { lazy } from "react";
import { LazyLoading } from "../../components/SplashScreen";

const Page = lazy(() => import('./page'));

export function Onboarding() {
  return (
    <LazyLoading>
      <Page />
    </LazyLoading>
  );
}`}
          </code>
        </pre>
      </section>

      <section className="container">
        <h2>Spinners</h2>

        <hr/>

        <span className="spinner sm"></span>
        <span className="spinner"></span>
        <span className="spinner lg"></span>
        <span className="spinner xl"></span>
      </section>    

      <br/><br/>
    </>   
  )
}