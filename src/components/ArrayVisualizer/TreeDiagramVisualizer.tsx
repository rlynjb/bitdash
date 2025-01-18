import "./styles.css";

// ref: https://codepen.io/philippkuehn/pen/QbrOaN

export const TreeDiagramVisualizer = () => {
  return (
    <div className="tree">
      <ul>
        <li>
          <a href="#">Parent</a>
          <ul>
            <li>
              <a href="#">Child</a>
            </li>
            <li>
              <a href="#">Child</a>
              <ul>
                <li>
                  <a href="#">Grand Child</a>
                </li><li>
                  <a href="#">Grand Child</a>
                  <ul>
                    <li>
                      <a href="#">Grand Child</a>
                    </li><li>
                      <a href="#">Grand Child</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li><li>
              <a href="#">Child</a>
              <ul>
                <li>
                  <a href="#">Grand Child</a>
                  <ul>
                    <li>
                      <a href="#">Grand Grand Child</a>
                    </li>
                  </ul>
                </li><li>
                  <a href="#">Grand Child</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}