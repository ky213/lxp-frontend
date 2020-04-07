import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import uuid from 'uuid/v4';

import { MenuContext } from './MenuContext';
import styled from "styled-components";
import { isThisSecond } from 'date-fns';


const ThemedLink = styled(Link)`
  &:before {
    box-shadow: inset 3px 0 0 0 ${props => props.themeColor || 'var(--theme-menu-accent-color-hover)'};
  }
`;

const ThemedAnchor = styled.a`
  &:before {
    box-shadow: inset 3px 0 0 0 ${props => props.themeColor || 'var(--theme-menu-accent-color-hover)'};
  }
`;
/**
 * Renders a collapse trigger or a ReactRouter Link 
 */
const SidebarMenuItemLink = (props) => {
    return (
    (props.to || props.href) ? (
        props.to ? (
            <ThemedLink to={ props.to } themeColor={props.themeColor} className={`${props.classBase}__entry__link`}>
                { props.children }
            </ThemedLink>
        ) : (
            <ThemedAnchor
                href={ props.href }
                target="_blank"
                themeColor={props.themeColor}
                rel="noopener noreferrer"
                className={`${props.classBase}__entry__link`}
            >
                { props.children }
            </ThemedAnchor>
        )
        
    ) : (
        <ThemedAnchor
            href="javascript:;"
            themeColor={props.themeColor}
            className={`${props.classBase}__entry__link`}
            onClick={ () => props.onClick && props.onClick() || props.onToggle() }
        >
            { props.children }
        </ThemedAnchor>
    )
)}

SidebarMenuItemLink.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    active: PropTypes.bool,
    onToggle: PropTypes.func,
    children: PropTypes.node,
    classBase: PropTypes.string,
    themeColor: PropTypes.string,
}

/**
 * The main menu entry component
 */
export class SidebarMenuItem extends React.Component {
    static propTypes = {
        // MenuContext props
        addEntry: PropTypes.func,
        updateEntry: PropTypes.func,
        removeEntry: PropTypes.func,
        entries: PropTypes.object,
        // Provided props
        parentId: PropTypes.string,
        children: PropTypes.node,
        isSubNode: PropTypes.bool,
        currentUrl: PropTypes.string,
        slim: PropTypes.bool,
        // User props
        icon: PropTypes.node,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]),
        to: PropTypes.string,
        href: PropTypes.string,
        exact: PropTypes.bool,
        noCaret: PropTypes.bool,
        roles: PropTypes.array,
        onClick: PropTypes.func
    }

    static defaultProps = {
        exact: true
    }

    constructor(props) {
        super(props);

        this.id = uuid();
    }

    componentDidMount() {
        const entry = {
            id: this.id,
            parentId: this.props.parentId,
            exact: !!this.props.exact
        };
        
        if (this.props.to) {
            entry.url = this.props.to;
        }

        this.props.addEntry(entry);
    }

    componentWillUnmount() {
        this.props.removeEntry(this.id);
    }

    getEntry() {
        return this.props.entries[this.id];
    }

    toggleNode() {
        const entry = this.getEntry();

        this.props.updateEntry(this.id, { open: !entry.open });
    }

    render() {
        const entry = this.getEntry();
        const classBase = this.props.isSubNode ? "sidebar-submenu" : "sidebar-menu";
        const itemClass = classNames(`${classBase}__entry`, {
            [`${classBase}__entry--nested`]: !!this.props.children,
            'open': entry && entry.open,
            'active': entry && entry.active
        });


        let visibilityStyle = !this.props.roles || (this.props.roles && this.props.currentUser && 
            this.props.roles.includes(this.props.currentUser.role)) && 'block' || 'none';
        
        const isSignOut = this.props && this.props.icon && this.props.icon.props && this.props.icon.props.className.includes('sign-out');
        
        if(!this.props.selectedInstitute && (this.props.to != "/home" && this.props.to != "/" 
            && this.props.to != "/admin/superadmin") && !this.props.href && !isSignOut) {
            visibilityStyle = 'none';
        }

        if(this.props.selectedInstitute && this.props.to == "/admin/superadmin") {
            visibilityStyle = 'none';
        }

        // console.log("Calculated visibility style:", this.props.href, this.props.to, this.props.selectedInstitute, visibilityStyle )

        return (
            <li
                style={{display: visibilityStyle }}
                className={classNames(itemClass, {
                    'sidebar-menu__entry--no-caret': this.props.noCaret,
                })}
            >
                <SidebarMenuItemLink
                    to={ this.props.to || null }
                    href={ this.props.href || null }
                    onToggle={ this.toggleNode.bind(this) }
                    onClick={this.props.onClick || null}
                    themeColor={this.props.themeColor}
                    classBase={ classBase }
                    selectedInstitute={this.props.selectedInstitute}
                >
                    {
                        this.props.icon && React.cloneElement(this.props.icon, {
                            className: classNames(
                                this.props.icon.props.className,
                                `${classBase}__entry__icon`
                            )
                        })
                    }
                    {
                        typeof this.props.title === 'string' ?
                            <span>{ this.props.title }</span> :
                            this.props.title
                    }
                </SidebarMenuItemLink>
                {
                    this.props.children && (
                        <ul className="sidebar-submenu">
                        {
                            React.Children.map(this.props.children, (child) => (
                                <MenuContext.Consumer>
                                {
                                    (ctx) => React.cloneElement(child, {
                                        isSubNode: true,
                                        parentId: this.id,
                                        themeColor: this.props.themeColor,
                                        currentUrl: this.props.currentUrl,
                                        slim: this.props.slim,
                                        selectedInstitute: this.props.selectedInstitute,
                                        ...ctx
                                    })
                                }
                                </MenuContext.Consumer>
                            ))
                        }
                        </ul>
                    )
                }
            </li>
        );
    }
}
